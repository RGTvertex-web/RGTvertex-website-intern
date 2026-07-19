# RGTvertex — Enterprise AI Company Website

A complete, production-ready marketing website for RGTvertex, an enterprise AI company
with seven specialized AI agents. Built with React, Vite, Tailwind CSS v4, React Router,
Framer Motion, Lucide icons, and Supabase (auth, contact form, and job applications).

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase URL + anon key — see SUPABASE_SETUP.md
npm run dev             # start local dev server
npm run build            # production build -> dist/
npm run preview           # preview the production build
```

**Before Contact, Careers, Login, or Register will actually work, follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** to create your Supabase project, database tables, storage bucket, and env vars. The site runs fine without it — those forms will just show a friendly "not connected yet" message instead of submitting.

## Project structure

```
src/
  components/
    layout/        Navbar, Footer, Layout (route shell)
    sections/       Home page sections (Hero, HowItWorks, WhyChooseUs, ...)
    ui/              Reusable primitives (Button, Card, Accordion, PageHero, ...)
    auth/            ProtectedRoute (guards /dashboard)
    careers/         ApplyModal (resume upload + application form)
  context/
    AuthContext.jsx  Supabase auth state + signIn/signUp/signOut/resetPassword
  lib/
    supabase.js      Supabase client singleton (reads .env)
  data/             Content: agents.js, site.js (nav, FAQs), careers.js (open roles)
  pages/            One file per route
  App.jsx           Route definitions
  main.jsx          Entry point (wraps app in AuthProvider)
  index.css         Tailwind v4 theme tokens (colors, fonts, animations)
```

## Pages

Home, AI Agents, Resources, About, Contact, Careers, Login, Register, Dashboard
(protected), Privacy Policy, Terms & Conditions, 404

## Design system

- Palette: white background, light grey secondary surfaces, near-black ink for text
  and primary actions, a single muted accent color used sparingly.
- Typography: Source Serif 4 throughout, tight tracking on headings, generous line
  height on body copy.
- Signature element: the "vertex" hub-and-node graphic connecting a central node to
  the seven agent icons — one platform, seven agents, made visible.
- Motion: Framer Motion fade/slide-in on scroll, hover lift on cards.

## Backend

Contact messages and job applications are stored in Supabase (Postgres) and resumes
in Supabase Storage. Auth (login/register/forgot password/logout) runs on Supabase
Auth. Full setup instructions, SQL schema, and RLS policies are in
[SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

## Notes

- No AI implementation details, model names, or backend architecture are exposed
  anywhere in the UI copy, per the brief.
- All content is placeholder/example copy (job descriptions, testimonials, etc.)
  and should be reviewed before launch.
- Never commit `.env` — only `.env.example` with placeholders is tracked.

