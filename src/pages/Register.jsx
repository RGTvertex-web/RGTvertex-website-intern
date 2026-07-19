import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const { data, error } = await signUp({
      email: form.email,
      password: form.password,
      fullName: form.name,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("idle");
    setSubmitted(true);

    // If email confirmation is disabled in Supabase, the user is signed in
    // immediately and we can send them straight to the dashboard.
    if (data?.session) {
      setTimeout(() => navigate("/dashboard"), 1200);
    }
  };

  return (
    <>
      <Seo title="Sign Up — RGTvertex" description="Create an RGTvertex account to start deploying AI agents for your business." />
      <PageHero eyebrow="Account" title="Create your RGTvertex account" description="Set up your workspace and start deploying agents." />

      <Section>
        <div className="mx-auto max-w-md">
          <Card hover={false} className="p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <p className="text-lg font-semibold text-ink">Account created.</p>
                <p className="text-sm text-ink-soft">
                  Check your inbox to confirm your email, then log in to access your dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Full name
                  <div className="relative">
                    <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input required value={form.name} onChange={update("name")} placeholder="Jordan Smith" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm focus:border-ink/40" />
                  </div>
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Email address
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm focus:border-ink/40" />
                  </div>
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Password
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input required minLength={6} type={showPassword ? "text" : "password"} value={form.password} onChange={update("password")} placeholder="Create a password" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-11 text-sm focus:border-ink/40" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>
                <p className="text-xs leading-relaxed text-ink-faint">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-ink-soft">Terms & Conditions</Link> and{" "}
                  <Link to="/privacy" className="underline hover:text-ink-soft">Privacy Policy</Link>.
                </p>
                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <Button type="submit" className="w-full justify-center" disabled={status === "submitting"} icon={false}>
                  {status === "submitting" ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Creating account…</span> : "Create account"}
                </Button>
              </form>
            )}
          </Card>
          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-ink hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
