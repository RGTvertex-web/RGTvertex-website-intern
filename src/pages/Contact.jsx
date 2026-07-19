import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import NetworkGraphic from "@/components/ui/NetworkGraphic";
import Seo from "@/components/ui/Seo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function Contact() {
  const { user } = useAuth();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", companySize: "1–20", message: "" });

  // Pre-fill from the logged-in account
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.user_metadata?.full_name || "",
        email: f.email || user.email || "",
        company: f.company || user.user_metadata?.company || "",
      }));
    }
  }, [user]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage("This form isn't connected yet. Please email us directly at rgtvertex.ai@outlook.com.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company || null,
        subject: `Company size: ${form.companySize}`,
        message: form.message,
      };

      const { error } = await supabase.from("contact_messages").insert(payload);
      if (error) throw error;

      // Forward the enquiry to rgtvertex.ai@outlook.com via a Supabase Edge
      // Function. This is a best-effort call: if the function isn't deployed
      // yet, the message is still saved above and the form still succeeds.
      // See SUPABASE_SETUP.md → "Email forwarding" for deployment steps.
      supabase.functions.invoke("send-contact-email", { body: payload }).catch(() => { });

      setSubmitted(true);
    } catch (err) {
      const message =
        (typeof err?.message === "string" && err.message.trim()) ||
        (typeof err?.error_description === "string" && err.error_description.trim()) ||
        "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact — RGTvertex"
        description="Get in touch with RGTvertex to see the AI workforce in action for your business."
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what an AI workforce could take off your team's plate."
        description="Tell us a bit about your business and we'll get back to you personally — no ticket queue."
        bgImage="/contact-hero.png"
        bgClass="bg-cover bg-center sm:bg-[length:auto_92%] sm:bg-right bg-no-repeat"
      />

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <motion.a
              href="mailto:rgtvertex.ai@outlook.com"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="corner-glow group flex flex-col gap-2 rounded-3xl border border-border bg-white p-7 transition-shadow duration-300 hover:shadow-glow"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-ink-faint">Email us directly</span>
              <span className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-ink">
                rgtvertex.ai@outlook.com
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </span>
              <span className="text-sm text-ink-soft">We typically reply within one business day.</span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-ink p-8 text-white"
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
              <div className="animate-float-a pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
              <div className="animate-float-b pointer-events-none absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <NetworkGraphic className="pointer-events-none absolute -right-6 -top-6 z-0 h-40 w-40 opacity-80" />

              {/* mini illustration: floating status card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative mb-6 w-fit rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-xs font-medium text-white/80">Agent active</span>
                </div>
                <div className="mt-3 flex items-end gap-1.5">
                  {[10, 18, 12, 22, 16, 26, 20].map((h, i) => (
                    <motion.span
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                      className="w-1.5 rounded-full bg-accent/70"
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </motion.div>

              <p className="relative text-lg font-semibold leading-snug tracking-tight">
                Seven agents, one workforce, built to scale with your business.
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                Reach out and we'll help you find the right place to start.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Card hover={false} className="corner-glow p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center gap-2 py-16 text-center"
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Sparkles size={20} strokeWidth={1.8} />
                  </div>
                  <p className="text-lg font-semibold text-ink">Message sent.</p>
                  <p className="text-sm text-ink-soft">We'll be in touch within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-sm text-ink">
                      Full name
                      <input required value={form.name} onChange={update("name")} className="rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm text-ink">
                      Email address
                      <input required type="email" value={form.email} onChange={update("email")} className="rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10" />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-sm text-ink">
                      Company
                      <input value={form.company} onChange={update("company")} className="rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm text-ink">
                      Company size
                      <select value={form.companySize} onChange={update("companySize")} className="rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10">
                        <option>1–20</option>
                        <option>21–100</option>
                        <option>101–500</option>
                        <option>500+</option>
                      </select>
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5 text-sm text-ink">
                    What would you like to talk about?
                    <textarea rows={5} required value={form.message} onChange={update("message")} className="rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10" />
                  </label>
                  {errorMessage && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <Button type="submit" className="self-start" disabled={submitting} icon={false}>
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
