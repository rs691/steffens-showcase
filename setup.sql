-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  email text,
  updated_at timestamp with time zone,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Interact with the "auth.users" table via a Trigger to automatically create a profile
-- whenever a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- INSTRUCTIONS FOR MIGRATING EXISTING USERS
-- 1. Go to Authentication > Users in your Supabase Dashboard.
-- 2. Manually "Invite" or "Create new user" for each of your existing users:
--    - Email: rstewart691@yahoo.com (Username: bobby)
--    - Email: robert691stewart@gmail.com (Username: Mike)
-- 3. You can set their password to "Hankbob2017!" if you create them manually, 
--    or send them a magic link.
-- 4. When you create them, ensure you add the 'username' key to the "User Metadata"
--    JSON blob if you want it to automatically populate the profiles table via the trigger above.
--    Example Metadata: { "username": "bobby" }

