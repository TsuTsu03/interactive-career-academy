create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  session jsonb not null check (jsonb_typeof(session) = 'object'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, course_id)
);

create table if not exists public.practice_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_submissions (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id text not null,
  repository_url text not null check (repository_url ~ '^https://github\.com/[^/]+/[^/]+/?$'),
  live_url text not null check (live_url ~ '^https://'),
  verification_status text not null default 'recorded' check (verification_status in ('recorded', 'verified', 'rejected')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, project_id)
);

create table if not exists public.certificates (
  user_id uuid primary key references auth.users(id) on delete restrict,
  code uuid not null unique default gen_random_uuid(),
  display_name text not null,
  credential_name text not null default 'Front-End Development Certificate of Completion',
  portfolio_url text not null,
  repository_url text not null,
  evidence jsonb not null,
  issued_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists course_progress_set_updated_at on public.course_progress;
create trigger course_progress_set_updated_at before update on public.course_progress for each row execute function public.set_updated_at();
drop trigger if exists practice_progress_set_updated_at on public.practice_progress;
create trigger practice_progress_set_updated_at before update on public.practice_progress for each row execute function public.set_updated_at();
drop trigger if exists project_submissions_set_updated_at on public.project_submissions;
create trigger project_submissions_set_updated_at before update on public.project_submissions for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.course_progress enable row level security;
alter table public.practice_progress enable row level security;
alter table public.project_submissions enable row level security;
alter table public.certificates enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "course_progress_select_own" on public.course_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "course_progress_insert_own" on public.course_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "course_progress_update_own" on public.course_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "practice_progress_select_own" on public.practice_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "practice_progress_insert_own" on public.practice_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "practice_progress_update_own" on public.practice_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "submissions_select_own" on public.project_submissions for select to authenticated using ((select auth.uid()) = user_id);
create policy "submissions_insert_own" on public.project_submissions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "submissions_update_own" on public.project_submissions for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "certificates_select_own" on public.certificates for select to authenticated using ((select auth.uid()) = user_id);

revoke all on public.profiles, public.course_progress, public.practice_progress, public.project_submissions, public.certificates from anon, authenticated;
grant usage on schema public to authenticated;
grant select, insert, update on public.profiles, public.course_progress, public.practice_progress, public.project_submissions to authenticated;
grant select on public.certificates to authenticated;

create or replace function public.sync_learning_state(p_courses jsonb, p_practice jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  entry record;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if jsonb_typeof(p_courses) <> 'object' or jsonb_typeof(p_practice) <> 'object' then
    raise exception 'invalid learning state';
  end if;
  for entry in select * from jsonb_each(p_courses)
  loop
    insert into public.course_progress (user_id, course_id, session)
    values (auth.uid(), entry.key, entry.value)
    on conflict (user_id, course_id) do update set session = excluded.session;
  end loop;
  insert into public.practice_progress (user_id, state)
  values (auth.uid(), p_practice)
  on conflict (user_id) do update set state = excluded.state;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.sync_learning_state(jsonb, jsonb) from public, anon;
grant execute on function public.sync_learning_state(jsonb, jsonb) to authenticated;
