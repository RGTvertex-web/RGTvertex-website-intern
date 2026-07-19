import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, AlertCircle, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/context/AuthContext";

export default function ResetPassword() {
  const { updatePassword, session, loading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setStatus("submitting");
    const { error } = await updatePassword(password);
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("success");
  };

  // Supabase signs the visitor into a short-lived "recovery" session the
  // moment they land here from the emailed link. If there's no session at
  // all once auth has finished loading, the link was invalid or expired.
  const linkInvalid = !loading && !session;

  return (
    <>
      <Seo title="Reset Password — RGTvertex" description="Set a new password for your RGTvertex account." />
      <PageHero eyebrow="Account" title="Set a new password" description="Choose a new password for your RGTvertex account." />

      <Section>
        <div className="mx-auto max-w-md">
          <Card hover={false} className="p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckCircle2 size={22} strokeWidth={1.8} />
                </div>
                <p className="text-lg font-semibold text-ink">Password updated.</p>
                <p className="text-sm text-ink-soft">You can now log in with your new password.</p>
                <Button onClick={() => navigate("/dashboard")} size="sm" icon={false} className="mt-2">
                  Go to dashboard
                </Button>
              </div>
            ) : linkInvalid ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertCircle size={22} strokeWidth={1.8} />
                </div>
                <p className="text-lg font-semibold text-ink">This reset link isn't valid.</p>
                <p className="text-sm text-ink-soft">
                  It may have expired, or already been used. Request a new one from the log in page.
                </p>
                <Button onClick={() => navigate("/login")} variant="secondary" size="sm" icon={false} className="mt-2">
                  Back to log in
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  New password
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-11 text-sm focus:border-ink/40"
                    />
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
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Confirm new password
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm focus:border-ink/40"
                    />
                  </div>
                </label>
                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <Button type="submit" className="w-full justify-center" disabled={status === "submitting"} icon={false}>
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Updating…</span>
                  ) : (
                    "Update password"
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}