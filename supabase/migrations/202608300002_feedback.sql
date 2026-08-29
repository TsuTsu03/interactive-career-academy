-- Learner feedback.
--
-- Anonymous by default: most people who have something to say are not signed
-- in, and requiring an account would filter the feedback down to the learners
-- who already stayed. No address is stored unless the person types one in
-- because they want a reply.
--
-- Writes go through a function rather than a table grant, so the client can
-- add a row and can never read one, and every rule lives in one place.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  mood text not null check (mood in ('working', 'unsure', 'stuck', 'idea')),
  message text check (message is null or char_length(message) between 4 and 2000),
  page text check (page is null or char_length(page) <= 200),
  contact text check (contact is null or contact ~ '^\S+@\S+\.\S+$'),
  user_id uuid references auth.users(id) on delete set null
);

alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;

create index if not exists feedback_created_idx on public.feedback (created_at desc);

/**
 * Records one piece of feedback, or refuses when the client has sent too many.
 *
 * `security definer` because the sender is usually anonymous and the table
 * must stay unreadable from the browser. Reuses the auth_throttle bucket so
 * one open form cannot become a way to fill the database.
 */
create or replace function public.submit_feedback(
  p_mood text,
  p_message text,
  p_page text,
  p_contact text,
  p_client_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_hits integer;
begin
  if p_client_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid throttle key';
  end if;

  insert into public.auth_throttle (bucket, hits)
  values ('feedback:' || p_client_hash, 1)
  on conflict (bucket) do update
    set hits = case
          when public.auth_throttle.window_started_at < timezone('utc', now()) - interval '1 hour'
          then 1 else public.auth_throttle.hits + 1 end,
        window_started_at = case
          when public.auth_throttle.window_started_at < timezone('utc', now()) - interval '1 hour'
          then timezone('utc', now()) else public.auth_throttle.window_started_at end
  returning hits into current_hits;

  if current_hits > 10 then
    return false;
  end if;

  insert into public.feedback (mood, message, page, contact, user_id)
  values (
    p_mood,
    nullif(btrim(coalesce(p_message, '')), ''),
    nullif(btrim(coalesce(p_page, '')), ''),
    nullif(btrim(lower(coalesce(p_contact, ''))), ''),
    auth.uid()
  );

  return true;
end;
$$;

revoke execute on function public.submit_feedback(text, text, text, text, text) from public;
grant execute on function public.submit_feedback(text, text, text, text, text) to anon, authenticated;
