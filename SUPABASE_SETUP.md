# Supabase Setup Guide

This project uses [Supabase](https://supabase.com) for:

- **Authentication** — email/password login, registration, password reset
- **Contact Us** — every enquiry is stored in a `contact_messages` table
- **Careers** — every job application (with resume) is stored in a `job_applications` table, with resumes in Supabase Storage

This guide walks through everything from creating a project to going live. No real keys or passwords are included anywhere in this repo — only placeholders.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (GitHub login is easiest).
2. Click **New Project**.
3. Choose an organization, give the project a name (e.g. `rgtvertex`), set a database password (save it somewhere safe — you won't need it for this app, but you'll need it if you ever connect directly to Postgres), and pick a region close to your users.
4. Wait ~2 minutes for the project to finish provisioning.

---

## 2. Get your API credentials

1. In your project, go to **Project Settings → API**.
2. You'll need two values:
   - **Project URL** → this is `VITE_SUPABASE_URL`
   - **anon / public** key (under "Project API keys") → this is `VITE_SUPABASE_ANON_KEY`
3. **Never** use the `service_role` key in this frontend app — it bypasses Row Level Security and must stay server-side only.

---

## 3. Configure environment variables

1. In the project root, copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in the two values from step 2:

   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

3. `.env` is already listed in `.gitignore` — it will never be committed.
4. The Supabase client is initialized once in `src/lib/supabase.js`, which reads these two variables via `import.meta.env`. You should not need to edit that file — just set the env vars. If your deployment platform (Vercel, Netlify, etc.) needs environment variables configured separately, add the same two keys there.

---

## 4. Create the database tables

Go to **SQL Editor** in the Supabase dashboard, paste the SQL below, and run it.

### `contact_messages`

> **Note:** The Contact form now requires the visitor to be logged in before
> they can submit (built into the UI). The policy below matches that — only
> `authenticated` users can insert. If you created this table before that
> change with an `anon, authenticated` policy, drop and recreate the insert
> policy using the SQL below.

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Drop the old policy first if you already ran an earlier version of this file
drop policy if exists "Anyone can insert contact messages" on public.contact_messages;

-- Only logged-in visitors can submit a contact message
create policy "Authenticated users can insert contact messages"
  on public.contact_messages for insert
  to authenticated
  with check (true);

-- Only authenticated staff should be able to read messages.
-- Adjust this policy once you have an admin/staff role set up.
create policy "Authenticated users can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);
```

### `job_applications`

> **Note:** Applying for a job also now requires being logged in (built into
> the UI). Same as above — insert is restricted to `authenticated`.

```sql
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_role text not null,
  name text not null,
  email text not null,
  phone text not null,
  linkedin text,
  portfolio text,
  resume_url text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

drop policy if exists "Anyone can insert job applications" on public.job_applications;

-- Only logged-in visitors can submit a job application
create policy "Authenticated users can insert job applications"
  on public.job_applications for insert
  to authenticated
  with check (true);

-- Only authenticated staff should be able to read applications.
create policy "Authenticated users can read job applications"
  on public.job_applications for select
  to authenticated
  using (true);
```

### `users` (profile table, linked to Supabase Auth)

Supabase Auth already stores accounts in the built-in `auth.users` table. This app's Register flow saves `full_name` as auth **user metadata** automatically, so a separate `public.users` table is optional. If you want a queryable profile table (e.g. for an admin panel), create one and keep it in sync with a trigger:

```sql
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can read their own profile"
  on public.users for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  to authenticated
  using (auth.uid() = id);

-- Automatically create a row in public.users whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

> Registration no longer collects a company name, so this table no longer has a `company` column. If you already created this table with a `company` column in Supabase, run `supabase-migration-remove-company.sql` (in the project root, outside this zip) once in the Supabase SQL Editor to bring it in line.

---

## 5. Create the storage bucket for resumes

1. Go to **Storage** in the Supabase dashboard.
2. Click **New bucket**.
3. Name it exactly: `resumes` (this matches `RESUME_BUCKET` in `src/lib/supabase.js` — if you use a different name, update that constant).
4. Toggle **Public bucket** ON. This lets the app generate a public URL for each uploaded resume to store in `job_applications.resume_url`. If you'd rather keep resumes private, leave it off and switch the app to use `createSignedUrl` instead of `getPublicUrl` (requires a small code change in `src/components/careers/ApplyModal.jsx`).
5. Add a storage policy so logged-in visitors can upload (but not list/delete) files:

   ```sql
   drop policy if exists "Anyone can upload a resume" on storage.objects;

   create policy "Authenticated users can upload a resume"
     on storage.objects for insert
     to authenticated
     with check (bucket_id = 'resumes');
   ```

   If the bucket is public, read access is already handled by Supabase for public buckets. If you made it private, add a read policy scoped to authenticated staff only.

---

## 6. Configure Authentication

1. Go to **Authentication → Providers** and make sure **Email** is enabled (it is by default).
2. Go to **Authentication → URL Configuration**:
   - Set **Site URL** to your production URL (e.g. `https://rgtvertex.com`), or `http://localhost:5173` while developing.
   - Add any additional **Redirect URLs** you need (e.g. your Vercel preview URL, `http://localhost:5173/login`).
3. Go to **Authentication → Email Templates** to customize the "Confirm signup" and "Reset password" emails if you'd like (optional).
4. **Email confirmation**: By default, Supabase requires users to confirm their email before they can log in. You can turn this off under **Authentication → Providers → Email → Confirm email** if you want instant sign-in during testing. For production, we recommend keeping it on.

This app already implements:

- **Register** (`src/pages/Register.jsx`) → `supabase.auth.signUp()`
- **Login** (`src/pages/Login.jsx`) → `supabase.auth.signInWithPassword()`
- **Forgot Password** (same page, "Forgot password?" link) → `supabase.auth.resetPasswordForEmail()`
- **Logout** (`src/pages/Dashboard.jsx`) → `supabase.auth.signOut()`
- **Protected Dashboard** (`src/components/auth/ProtectedRoute.jsx`) → redirects to `/login` if there's no active session

All of this lives behind `src/context/AuthContext.jsx`, which wraps the whole app in `src/main.jsx`.

**Contact and Careers now require login.** If a visitor isn't signed in, the Contact page shows a "log in to send a message" card instead of the form, and the "Apply now" button on Careers sends them to `/login` first. Once they log back in they land back where they started.

---

## 7. Email forwarding (Contact form → your Outlook inbox)

The Contact form always saves every enquiry to `contact_messages` first — that part works as soon as your `.env` and table/policies are set up, no extra service needed.

To also get an email at `rgtvertex.ai@outlook.com` the moment someone submits, deploy the included Edge Function, which uses [Resend](https://resend.com) (a transactional email API) to send the message. Outlook itself has no public API for "just send from this address without a password," so Resend (or a similar provider like Postmark/SendGrid) sending **to** your Outlook inbox is the standard way to do this from a static frontend.

1. **Create a free Resend account** at [resend.com](https://resend.com) and grab an API key from the dashboard (**API Keys → Create API Key**).
2. **Install the Supabase CLI** if you don't have it: `npm install -g supabase`.
3. **Log in and link your project**:
   ```bash
   supabase login
   supabase link --project-ref your-project-id
   ```
   (Your project ref is the subdomain in your Project URL, e.g. `abcdefghijk` from `https://abcdefghijk.supabase.co`.)
4. **Set the secret** the function needs:
   ```bash
   supabase secrets set RESEND_API_KEY=your-resend-api-key
   ```
5. **Deploy the function** (already written for you at `supabase/functions/send-contact-email/index.ts`):
   ```bash
   supabase functions deploy send-contact-email
   ```
6. That's it — `src/pages/Contact.jsx` already calls `supabase.functions.invoke("send-contact-email", ...)` right after saving to the database. If the function isn't deployed yet, that call just fails silently and the form still works (the message is still saved to `contact_messages`).

**About the "from" address:** Resend's shared sandbox sender (`onboarding@resend.dev`) works immediately with no setup, but looks less official and has sending limits. For a proper "from RGTvertex" sender, add and verify a domain you own under **Resend → Domains**, then set:
```bash
supabase secrets set CONTACT_FROM_EMAIL=notifications@yourdomain.com
```
The reply-to on every forwarded email is set to the visitor's own email address, so you can just hit "Reply" in Outlook.

---

## 8. Folder structure reference

```
rgtvertex/
├── .env                        # your real keys (never committed)
├── .env.example                # placeholder template
├── SUPABASE_SETUP.md           # this file
├── supabase/
│   └── functions/
│       └── send-contact-email/
│           └── index.ts        # forwards contact_messages to your inbox via Resend
├── src/
│   ├── lib/
│   │   └── supabase.js         # Supabase client singleton (reads .env)
│   ├── context/
│   │   └── AuthContext.jsx     # auth state + signIn/signUp/signOut/resetPassword
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   └── careers/
│   │       └── ApplyModal.jsx  # resume upload + job_applications insert
│   ├── data/
│   │   └── careers.js          # open roles shown on the Careers page
│   └── pages/
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── Dashboard.jsx       # protected route
│       ├── Contact.jsx         # inserts into contact_messages
│       └── Careers.jsx         # lists roles, opens ApplyModal
```

---

## 9. Install dependencies & run locally

```bash
npm install
npm run dev
```

The Supabase client (`@supabase/supabase-js`) is already listed in `package.json` — `npm install` will pull it in.

If `.env` is missing or incomplete, the app still runs — the Login, Register, Contact, and Careers forms will show a friendly inline error instead of crashing, and a warning is logged to the browser console.

---

## 10. Deployment

1. Push this repo to GitHub (or your Git host of choice).
2. On your hosting platform (Vercel, Netlify, Cloudflare Pages, etc.):
   - Set the **build command** to `npm run build` and the **output directory** to `dist`.
   - Add the two environment variables from step 3 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the platform's environment variable settings — not in a committed file.
3. In Supabase, update **Authentication → URL Configuration → Site URL** and **Redirect URLs** to include your production domain, so password reset links and email confirmations work correctly.
4. Re-deploy after adding env vars so the build picks them up (Vite bakes `VITE_*` vars in at build time).

---

## Quick checklist

- [ ] Supabase project created
- [ ] `.env` created locally with real `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- [ ] `contact_messages` table + **authenticated-only** insert policy created
- [ ] `job_applications` table + **authenticated-only** insert policy created
- [ ] `resumes` storage bucket created (public) + authenticated-only upload policy created
- [ ] Email auth provider enabled, Site URL / Redirect URLs set
- [ ] Resend account created, `RESEND_API_KEY` secret set, `send-contact-email` function deployed
- [ ] Environment variables added to your hosting platform
- [ ] Deployed and tested: sign up, log in, forgot password, contact form (while logged in), job application with resume upload (while logged in), confirm the forwarded email arrives
