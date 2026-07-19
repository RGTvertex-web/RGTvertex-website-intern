import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import Icon from "@/components/ui/Icon";

const reasons = [
  {
    icon: "LayoutGrid",
    title: "One platform, every function",
    description: "Every agent runs on the same platform, so visibility and control never fragment across tools.",
  },
  {
    icon: "ShieldCheck",
    title: "Built for enterprise security",
    description: "Access control, audit trails, and data handling designed to meet enterprise standards from day one.",
  },
  {
    icon: "GitBranch",
    title: "Fits your existing workflow",
    description: "Agents work inside the tools your teams already use, not a separate system they have to learn.",
  },
  {
    icon: "TrendingUp",
    title: "Scales as you grow",
    description: "Add agents, expand scope, and grow usage without re-platforming or redesigning your stack.",
  },
];

export default function WhyChooseUs() {
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Section>
      <SectionHeading
        eyebrow="Why RGTvertex"
        title="A workforce designed to fit your business, not the other way around."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onMouseMove={handleMouseMove}
            className="glow-card border-glow group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-ink transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent-soft group-hover:text-accent">
              <Icon name={reason.icon} size={20} strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-semibold tracking-tight text-ink">{reason.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
