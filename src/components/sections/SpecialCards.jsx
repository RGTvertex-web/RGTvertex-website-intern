import { motion } from "framer-motion";
import { Sparkles, Clock, Shield } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Primitives";
import AgentsCircular from "@/components/ui/AgentsCircular";
import Button from "@/components/ui/Button";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const stats = [
  { value: "7", label: "Agents" },
  { value: "1", label: "Platform" },
  { value: "24/7", label: "Always On" },
];

export default function SpecialCards() {
  return (
    <Section className="border-y border-border bg-bg-soft-2/50 backdrop-blur-sm">
      <Eyebrow>The RGTvertex platform</Eyebrow>
      <h2 className="mt-4 max-w-lg text-balance text-3xl font-semibold tracking-tight text-ink md:text-[2.3rem] md:leading-[1.1]">
        One workforce. Always on.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
        {/* Left: 7 agents circular, spans both rows */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55 }}
          className="glow-card corner-glow flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-white/85 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-glow lg:row-span-2"
        >
          <span className="text-sm font-semibold tracking-tight text-ink">Specialized AI Agents</span>
          <AgentsCircular />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Lead Generation Agent is live now
          </span>
        </motion.div>

        {/* Top center: Why RGTvertex */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="corner-glow flex flex-col gap-3 rounded-3xl border border-border bg-white/85 backdrop-blur-md p-7"
        >
          <Sparkles size={20} strokeWidth={1.6} className="text-ink" />
          <h3 className="text-base font-semibold tracking-tight text-ink">Why RGTvertex?</h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            We believe the future of work is hybrid — humans and AI working together, not
            against each other. Our platform empowers teams to focus on strategic, creative,
            and human-centric work.
          </p>
          <Button to="/about" variant="secondary" size="sm" className="mt-1 self-start">
            Our story
          </Button>
        </motion.div>

        {/* Top right: 24/7 */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-border bg-white/85 backdrop-blur-md p-7 text-center"
        >
          <Clock size={24} strokeWidth={1.6} className="text-ink" />
          <span className="text-3xl font-semibold tracking-tight text-ink">24/7</span>
          <span className="text-sm text-ink-soft">Continuous Operation</span>
        </motion.div>

        {/* Bottom: wide "Your AI Workforce" card spanning 2 columns */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="corner-glow flex flex-col gap-4 rounded-3xl border border-border bg-white/85 backdrop-blur-md p-8 lg:col-span-2"
        >
          <Shield size={22} strokeWidth={1.6} className="text-ink" />
          <h3 className="text-lg font-semibold tracking-tight text-ink">Your AI Workforce</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
            Deploy specialized AI agents across every department — support, legal, finance,
            engineering, sales, hiring, and research — all on one secure, unified platform.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tracking-tight text-ink">{s.value}</span>
                  <span className="text-sm text-ink-soft">{s.label}</span>
                </div>
                {i < stats.length - 1 && <span className="h-4 w-px bg-border" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}