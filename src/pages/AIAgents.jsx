import { motion } from "framer-motion";
import { CheckCircle2, Mic } from "lucide-react";
import { agents } from "@/data/agents";
import PageHero from "@/components/ui/PageHero";
import { Section, Pill } from "@/components/ui/Primitives";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import Seo from "@/components/ui/Seo";

export default function AIAgents() {
  return (
    <>
      <Seo
        title="AI Agents — RGTvertex"
        description="Meet the seven specialized AI agents that make up the RGTvertex workforce: lead generation, support, legal, finance, DevOps, HR, and market research."
      />
      <PageHero
        eyebrow="Our AI workforce"
        title="Seven agents. One connected AI workforce."
        description="Each RGTvertex agent is purpose-built for a single function inside your business, and works continuously, not just when someone remembers to ask."
        bgImage="/ai-agents-hero.png"
        bgClass="bg-cover bg-center sm:bg-[length:auto_92%] sm:bg-right bg-no-repeat"
      />

      <Section className="!pb-0">
        <div className="flex flex-col divide-y divide-border">
          {agents.map((agent, i) => (
            <div key={agent.slug} id={agent.slug} className="scroll-mt-24 py-16 first:pt-0 md:py-20">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start gap-5"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-medium text-ink-faint">
                      Agent {String(i + 1).padStart(2, "0")} / {String(agents.length).padStart(2, "0")}
                    </span>
                    {agent.live && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Live now
                      </span>
                    )}
                    {agent.tagline && (
                      <Pill className="border-accent/30 bg-accent-soft text-accent">
                        {agent.voiceEnabled && <Mic size={12} className="mr-1" strokeWidth={2} />}
                        {agent.tagline}
                      </Pill>
                    )}
                  </div>
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-bg-soft ${
                      agent.live ? "border-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" : "border-border"
                    }`}
                  >
                    <Icon name={agent.icon} size={26} strokeWidth={1.5} />
                    {agent.live && (
                      <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {agent.name}
                  </h2>
                  <p className="text-base leading-relaxed text-ink-soft">{agent.overview}</p>

                  {agent.capabilities && (
                    <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
                      {agent.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <CheckCircle2 size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-ink" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button to="/contact" variant="secondary">
                    Talk to us about this agent
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  <div className="rounded-2xl border border-border bg-white p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      Business benefits
                    </h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {agent.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <CheckCircle2 size={16} strokeWidth={1.6} className="mt-0.5 shrink-0 text-signal" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-border bg-white p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">
                        Industries
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.industries.map((ind) => (
                          <Pill key={ind}>{ind}</Pill>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">
                        Upcoming enhancements
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.upcoming.map((f) => (
                          <Pill key={f}>{f}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Meet the full team"
        title="Seven agents. One workforce. Zero extra headcount."
        description="Tell us which part of your business feels the most stretched, and we'll show you the agent built for it."
      />
    </>
  );
}
