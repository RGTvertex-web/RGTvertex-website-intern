import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Primitives";

const steps = [
  {
    step: "01",
    title: "Map your workflow",
    description: "We start with the specific function you want to hand off, and how it works today.",
    art: (
      <>
        <rect x="14" y="18" width="36" height="10" rx="3" fill="#e5e5e5" />
        <rect x="14" y="34" width="52" height="10" rx="3" fill="#111111" />
        <rect x="14" y="50" width="24" height="10" rx="3" fill="#e5e5e5" />
      </>
    ),
  },
  {
    step: "02",
    title: "Connect your tools",
    description: "The agent connects to your existing systems, so it works within your current setup.",
    art: (
      <>
        <circle cx="24" cy="34" r="11" fill="#e5e5e5" />
        <circle cx="58" cy="34" r="11" fill="#111111" />
        <line x1="35" y1="34" x2="47" y2="34" stroke="#9a9a9a" strokeWidth="2" strokeDasharray="2 4" />
      </>
    ),
  },
  {
    step: "03",
    title: "Set the boundaries",
    description: "You define what the agent handles alone and what gets routed to your team.",
    art: (
      <>
        <rect x="14" y="14" width="52" height="40" rx="8" fill="none" stroke="#d4d4d4" strokeWidth="2" />
        <path d="M28 34 L36 42 L52 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    step: "04",
    title: "Go live and expand",
    description: "The agent starts working immediately, with results visible from week one — then scale to more.",
    art: (
      <>
        <path d="M18 52 L30 34 L42 42 L58 16" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="58" cy="16" r="4" fill="#111111" />
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <Section className="bg-bg-soft-2 border-y border-border">
      <SectionHeading
        eyebrow="How it works"
        title="From first conversation to a live agent, in four steps."
        description="A real process with a defined order — each step depends on the one before it."
      />
      <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-4">
        <motion.div
          className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-border md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
        {steps.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group relative flex flex-col gap-4"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-border bg-white shadow-[0_10px_28px_-16px_rgba(17,17,17,0.3)] transition-all duration-300 group-hover:border-border-strong group-hover:shadow-glow"
            >
              <svg viewBox="0 0 80 68" className="h-12 w-12">
                {item.art}
              </svg>
            </motion.div>
            <span className="text-sm font-semibold tracking-tight text-ink-faint">Step {item.step}</span>
            <h3 className="-mt-2 text-base font-semibold tracking-tight text-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
