import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login"); // login | forgot
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const { error } = await signIn({ email, password });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    navigate(location.state?.from || "/dashboard");
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const { error } = await resetPassword(email);
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("idle");
    setResetSent(true);
  };

  return (
    <>
      <Seo title="Log In — RGTvertex" description="Log in to your RGTvertex account to manage your AI agents and platform settings." />
      <PageHero eyebrow="Account" title="Log in to RGTvertex" description="Access your agents, activity, and platform settings." />

      <Section>
        <div className="mx-auto max-w-md">
          <Card hover={false} className="p-8">
            {mode === "forgot" ? (
              resetSent ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <p className="text-lg font-semibold text-ink">Check your inbox.</p>
                  <p className="text-sm text-ink-soft">We sent a password reset link to {email}.</p>
                  <Button onClick={() => { setMode("login"); setResetSent(false); }} variant="secondary" size="sm" icon={false} className="mt-2">
                    Back to log in
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleForgot} className="flex flex-col gap-5">
                  <div>
                    <p className="text-lg font-semibold text-ink">Reset your password</p>
                    <p className="mt-1 text-sm text-ink-soft">Enter your email and we'll send you a reset link.</p>
                  </div>
                  <label className="flex flex-col gap-1.5 text-sm text-ink">
                    Email address
                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm focus:border-ink/40" />
                    </div>
                  </label>
                  {errorMessage && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <Button type="submit" className="w-full justify-center" disabled={status === "submitting"} icon={false}>
                    {status === "submitting" ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Sending…</span> : "Send reset link"}
                  </Button>
                  <button type="button" onClick={() => setMode("login")} className="text-center text-sm font-medium text-ink hover:underline">
                    Back to log in
                  </button>
                </form>
              )
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Email address
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm focus:border-ink/40" />
                  </div>
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Password
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-11 text-sm focus:border-ink/40" />
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
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-ink-soft">
                    <input type="checkbox" className="h-4 w-4 rounded border-border" />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setMode("forgot")} className="font-medium text-ink hover:underline">
                    Forgot password?
                  </button>
                </div>
                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <Button type="submit" className="w-full justify-center" disabled={status === "submitting"} icon={false}>
                  {status === "submitting" ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Logging in…</span> : "Log in"}
                </Button>
              </form>
            )}
          </Card>
          <p className="mt-6 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-ink hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
