import { motion } from "framer-motion";
import { Section } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import NetworkGraphic from "@/components/ui/NetworkGraphic";

export default function CTASection({
  eyebrow = "Get started",
  title = "Ready to put an AI workforce to work?",
  description = "Talk to us about which agents fit your business first — most teams are live within weeks.",
}) {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="corner-glow relative overflow-hidden rounded-3xl border border-border bg-ink px-8 py-14 text-center sm:px-14 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float-a absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="animate-float-b absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <NetworkGraphic className="absolute -right-8 top-1/2 hidden h-56 w-56 -translate-y-1/2 opacity-70 md:block" />
          <NetworkGraphic className="absolute -left-8 top-1/2 hidden h-56 w-56 -translate-y-1/2 scale-x-[-1] opacity-70 md:block" />
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
          <span className="h-1 w-1 rounded-full bg-accent" />
          {eyebrow}
        </span>
        <h2 className="mx-auto mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-balance text-base leading-relaxed text-white/65">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/contact" size="lg" className="!bg-white !text-ink !border-white">
            Get Started
          </Button>
          <Button to="/contact" variant="secondary" size="lg" className="!border-white/25 !bg-transparent !text-white hover:!bg-white/10">
            Book a Demo
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
