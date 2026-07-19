import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project (Project Settings → API).
// See SUPABASE_SETUP.md at the project root for step-by-step instructions.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw — this keeps the app (and the marketing pages) usable even
  // before Supabase is configured. Forms that need Supabase will show a
  // friendly error instead of a blank screen. See SUPABASE_SETUP.md.
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
      "Auth, Contact, and Careers forms will not work until you add them to .env. " +
      "See SUPABASE_SETUP.md."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// Storage bucket used for career application resumes. Must match the
// bucket name created in Supabase Storage — see SUPABASE_SETUP.md.
export const RESUME_BUCKET = "resumes";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
