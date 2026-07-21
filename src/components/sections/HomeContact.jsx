import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Primitives";

export default function HomeContact() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="corner-glow relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white via-white to-accent-soft px-8 py-14 md:px-14 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float-a absolute -right-10 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Let&apos;s build the future together.
            </h2>
            <p className="max-w-md text-balance text-base leading-relaxed text-ink-soft">
              Have a project in mind or want to learn more about RGTvertex? We&apos;d love to hear from you.
            </p>
          </div>

          <motion.a
            href="mailto:rgtvertex.ai@outlook.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="corner-glow group flex w-full max-w-full md:w-auto shrink-0 items-center gap-3 md:gap-4 rounded-2xl border border-border bg-white px-4 py-4 md:px-6 md:py-5 shadow-[0_20px_45px_-24px_rgba(47,95,224,0.35)] transition-shadow duration-300 hover:shadow-glow"
          >
            <span className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Mail size={18} strokeWidth={1.8} />
            </span>
            <span className="flex flex-1 min-w-0 flex-col">
              <span className="text-xs text-ink-faint">Email us</span>
              <span className="truncate text-sm font-semibold text-ink">rgtvertex.ai@outlook.com</span>
            </span>
            <ArrowUpRight
              size={16}
              className="ml-1 md:ml-2 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </motion.a>
        </div>
      </motion.div>
    </Section>
  );
}
