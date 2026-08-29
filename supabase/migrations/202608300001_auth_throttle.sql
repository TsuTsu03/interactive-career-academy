-- Rate limit for the email sign-in link.
--
-- Without this, one script can drain the project's whole email quota, get the
-- sending domain flagged, and lock every real learner out of the only sign-in
-- method that needs no third-party account.
--
-- No identifying value is stored. The caller passes a SHA-256 digest of the
-- address and of the client address, so a leaked table says who was not
-- throttled and nothing about who they are.

create table if not exists public.auth_throttle (
  bucket text primary key,
  hits integer not null default 0,
  window_started_at timestamptz not null default timezone('utc', now())
);

alter table public.auth_throttle enable row level security;
revoke all on public.auth_throttle from anon, authenticated;

/**
 * Records one attempt and reports whether it is allowed.
 *
 * `security definer` because the caller is anonymous by definition - nobody is
 * signed in yet - and the table must stay unreadable from the client. It
 * returns a boolean and nothing else.
 */
create or replace function public.claim_email_link(
  p_email_hash text,
  p_client_hash text,
  p_email_limit integer default 5,
  p_client_limit integer default 20,
  p_window_seconds integer default 3600
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean := true;
  current_hits integer;
  v_bucket text;
  v_cap integer;
begin
  if p_email_hash !~ '^[0-9a-f]{64}$' or p_client_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid throttle key';
  end if;

  foreach v_bucket in array array['email:' || p_email_hash, 'client:' || p_client_hash]
  loop
    v_cap := case when v_bucket like 'email:%' then p_email_limit else p_client_limit end;

    insert into public.auth_throttle (bucket, hits)
    values (v_bucket, 1)
    on conflict (bucket) do update
      set hits = case
            when public.auth_throttle.window_started_at
                 < timezone('utc', now()) - make_interval(secs => p_window_seconds)
            then 1
            else public.auth_throttle.hits + 1
          end,
          window_started_at = case
            when public.auth_throttle.window_started_at
                 < timezone('utc', now()) - make_interval(secs => p_window_seconds)
            then timezone('utc', now())
            else public.auth_throttle.window_started_at
          end
    returning hits into current_hits;

    if current_hits > v_cap then
      allowed := false;
    end if;
  end loop;

  return allowed;
end;
$$;

revoke execute on function public.claim_email_link(text, text, integer, integer, integer) from public;
grant execute on function public.claim_email_link(text, text, integer, integer, integer) to anon, authenticated;

-- Old rows are worthless once their window has passed.
create index if not exists auth_throttle_window_idx
  on public.auth_throttle (window_started_at);
