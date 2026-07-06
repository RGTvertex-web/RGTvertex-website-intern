import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, TrendingUp, BrainCircuit } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading, Card } from "@/components/ui/Primitives";
import CTASection from "@/components/sections/CTASection";
import Seo from "@/components/ui/Seo";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliable AI",
    description: "Building AI systems businesses can trust for critical operations with consistency, security, and accuracy.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description: "Creating solutions that grow alongside organizations, adapting to new challenges and opportunities.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Technology",
    description: "Designing AI that understands business context, makes informed decisions, and delivers measurable impact.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About — RGTvertex"
        description="RGTvertex is building the future of Enterprise AI: a connected ecosystem of AI employees that automate operations, enhance decision-making, and help organizations scale with confidence."
      />
      <PageHero
        eyebrow="About RGTvertex"
        title="Building the Future of Enterprise AI"
        description="At RGTvertex, we're redefining how businesses work through intelligent AI. Our mission is to create a connected ecosystem of AI employees that automate operations, enhance decision-making, and enable organizations to scale with confidence."
        bgImage="/about-hero-new.jpg"
        bgClass="bg-cover bg-center bg-no-repeat scale-105"
        bgBlur="blur-[3px]"
      />

      {/* Intro */}
      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Founded on the principles of{" "}
            <span className="font-semibold text-ink">Reliability, Growth, and Technology</span>, we believe
            AI should go beyond simple automation. It should understand, collaborate, and execute, helping
            businesses eliminate repetitive work so people can focus on innovation, strategy, and meaningful
            impact.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base leading-relaxed text-ink-soft"
          >
            We're building enterprise-grade AI solutions that transform complex workflows into intelligent,
            autonomous systems for modern organizations.
          </motion.p>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card hover={false} className="corner-glow h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Eye size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                To become the world's trusted Enterprise AI platform, empowering every business with
                intelligent AI employees that work alongside people to drive innovation, productivity, and
                sustainable growth.
              </p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card hover={false} className="corner-glow h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Target size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                To build reliable, scalable, and intelligent AI solutions that automate business operations,
                simplify complex workflows, and empower organizations to focus on what truly matters,
                innovation, creativity, and growth.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* What We Stand For */}
      <Section className="border-y border-border bg-bg-soft-2">
        <SectionHeading eyebrow="What we stand for" title="The principles behind every agent we build." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="corner-glow h-full bg-white hover:border-accent/30 hover:shadow-glow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <IconComp size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Our Purpose */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl gap-6"
        >
          <div className="mt-1 h-full w-1 shrink-0 rounded-full bg-ink" />
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">Our Purpose</span>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
              We believe the future of work is built on collaboration between people and intelligent AI.
            </p>
            <p className="text-base leading-relaxed text-ink-soft">
              Our goal is to create an AI workforce that empowers organizations to work smarter, innovate
              faster, and achieve more, without replacing human creativity, leadership, and vision.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Our Motto */}
      <section className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="animate-float-a pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.05] blur-3xl" />
        <div className="animate-float-b pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="container-x relative z-10 flex flex-col items-center gap-5 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
          >
            Our Motto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-[1.15]"
          >
            Reaching the Highest Point of Innovation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-[0.1em] text-white/70 md:text-base"
          >
            <span>Reliable AI</span>
            <span className="text-white/30">•</span>
            <span>Scalable Growth</span>
            <span className="text-white/30">•</span>
            <span>Intelligent Technology</span>
          </motion.p>
        </div>
      </section>

      <CTASection
        eyebrow="About RGTvertex"
        title="Want to see the workforce in action?"
        description="Book a walkthrough and we'll show you exactly how RGTvertex fits your team."
      />
    </>
  );
}