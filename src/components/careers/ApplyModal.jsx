import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase, RESUME_BUCKET, isSupabaseConfigured } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const MAX_RESUME_MB = 5;

export default function ApplyModal({ job, onClose }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "",
    linkedin: "",
    portfolio: "",
    duration: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setErrorMessage(`Resume must be under ${MAX_RESUME_MB}MB.`);
      return;
    }
    setErrorMessage("");
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage("Applications aren't connected yet. Please email your resume to rgtvertex.ai@outlook.com in the meantime.");
      return;
    }

    if (!resumeFile) {
      setErrorMessage("Please attach your resume.");
      return;
    }

    if (!form.duration) {
      setErrorMessage("Please select your preferred internship duration.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const fileExt = resumeFile.name.split(".").pop();
      const safeName = `${job.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(safeName, resumeFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(safeName);

      const applicationPayload = {
        job_role: job.role,
        name: form.name,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin || null,
        portfolio: form.portfolio || null,
        duration: form.duration,
        resume_url: publicUrlData?.publicUrl ?? null,
        status: "new",
      };

      const { error: insertError } = await supabase.from("job_applications").insert(applicationPayload);

      if (insertError) throw insertError;

      // Forward the application to rgtvertex.ai@outlook.com via a Supabase
      // Edge Function (see SUPABASE_SETUP.md -> "Email forwarding"). We
      // await this and log any failure, but the application is already
      // safely saved above either way, so an email hiccup doesn't block
      // the applicant from seeing a successful submission.
      try {
        const { error: emailError } = await supabase.functions.invoke("send-application-email", {
          body: applicationPayload,
        });
        if (emailError) throw emailError;
      } catch (emailErr) {
        console.warn("Application saved, but the email notification failed to send:", emailErr);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      const message =
        (typeof err?.message === "string" && err.message.trim()) ||
        (typeof err?.error_description === "string" && err.error_description.trim()) ||
        "Something went wrong. Please try again, or email your resume to rgtvertex.ai@outlook.com.";
      setErrorMessage(message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-white p-6 sm:rounded-3xl sm:p-8"
        >
          <button
            onClick={onClose}
            aria-label="Close application form"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft hover:bg-bg-soft hover:text-ink"
          >
            <X size={16} />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <CheckCircle2 size={22} strokeWidth={1.8} />
              </div>
              <p className="text-lg font-semibold text-ink">Application received.</p>
              <p className="text-sm text-ink-soft">
                Thanks for applying to {job.role}. Our team will review your application and reach out if it's a fit.
              </p>
              <Button onClick={onClose} variant="secondary" size="sm" icon={false} className="mt-2">
                Close
              </Button>
            </div>
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Apply for</span>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{job.role}</h3>
              <p className="mt-1 text-sm text-ink-soft">{job.type} · {job.location}</p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Full name
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm text-ink">
                    Email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm text-ink">
                    Phone
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Preferred duration
                  <select
                    required
                    value={form.duration}
                    onChange={update("duration")}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                  >
                    <option value="" disabled>
                      Select duration
                    </option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  LinkedIn profile
                  <input
                    required
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={form.linkedin}
                    onChange={update("linkedin")}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Portfolio / website <span className="text-ink-faint">(optional)</span>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.portfolio}
                    onChange={update("portfolio")}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/10"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Resume
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-bg-soft-2 px-4 py-3 text-sm text-ink-soft">
                    <Upload size={16} className="shrink-0" />
                    <span className="flex-1 truncate">{resumeFile ? resumeFile.name : "PDF or DOCX, up to 5MB"}</span>
                    <label className="cursor-pointer rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-bg-soft">
                      Browse
                      <input
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>
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
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </span>
                  ) : (
                    "Submit application"
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
