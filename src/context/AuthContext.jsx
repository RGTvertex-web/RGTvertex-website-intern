import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Safety timeout — if Supabase takes too long (e.g. network issues on
    // Vercel cold starts), don't leave the app stuck on the loading screen.
    const safetyTimer = setTimeout(() => setLoading(false), 3000);

    supabase.auth.getSession().then(({ data }) => {
      clearTimeout(safetyTimer);
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      clearTimeout(safetyTimer);
      listener.subscription.unsubscribe();
    };
  }, []);

  // Always turns whatever Supabase (or a network failure) throws into a
  // plain, readable string — so the UI never ends up displaying "{}",
  // "[object Object]", or a blank error.
  const normalizeError = (err) => {
    if (!err) return null;
    if (typeof err === "string" && err.trim()) return { message: err };
    const message =
      (typeof err.message === "string" && err.message.trim()) ||
      (typeof err.error_description === "string" && err.error_description.trim()) ||
      (typeof err.msg === "string" && err.msg.trim()) ||
      "Something went wrong. Please try again.";
    return { ...err, message };
  };

  const signUp = async ({ email, password, fullName }) => {
    if (!isSupabaseConfigured) return { error: { message: "Supabase is not configured yet." } };

    let data, error;
    try {
      ({ data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      }));
    } catch (err) {
      return { error: normalizeError(err) };
    }

    if (error) return { data, error: normalizeError(error) };

    // Supabase Auth (with "Confirm email" enabled) does NOT return a normal
    // error when someone signs up with an email that's already registered —
    // it returns a fake "success" response with an empty `identities` array
    // instead, to avoid leaking which emails exist. We detect that here and
    // surface it as a real duplicate-account error.
    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return {
        data,
        error: { message: "An account with this email already exists. Please log in instead." },
      };
    }

    return { data, error: null };
  };

  const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured) return { error: { message: "Supabase is not configured yet." } };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error: normalizeError(error) };
    } catch (err) {
      return { error: normalizeError(err) };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) return { error: { message: "Supabase is not configured yet." } };
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      return { data, error: normalizeError(error) };
    } catch (err) {
      return { error: normalizeError(err) };
    }
  };

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isSupabaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
