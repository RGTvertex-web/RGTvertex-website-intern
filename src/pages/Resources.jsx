import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldCheck, Settings2, Workflow, LifeBuoy, Download, Lock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import { faqs } from "@/data/site";
import { agents } from "@/data/agents";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/context/AuthContext";

const docs = [
  {
    icon: BookOpen,
    title: "Getting started guide",
    description: "Everything you need to configure your first agent and get it live.",
  },
  {
    icon: Settings2,
    title: "Agent configuration reference",
    description: "The full reference for tuning agent behavior, scope, and boundaries.",
  },
  {
    icon: ShieldCheck,
    title: "Access & permissions overview",
    description: "How access control, roles, and audit trails work across the platform.",
  },
  {
    icon: Workflow,
    title: "Integrations & workflow setup",
    description: "How agents connect into the tools your teams already use, step by step.",
  },
  {
    icon: LifeBuoy,
    title: "Support & escalation paths",
    description: "What gets routed to your team, when, and how to adjust those rules.",
  },
];

const tabs = [
  { key: "documentation", label: "Documentation" },
  { key: "faqs", label: "FAQs" },
];

const handleMouseMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Resources() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [active, setActive] = useState(location.hash === "#faqs" ? "faqs" : "documentation");

  useEffect(() => {
    if (location.hash === "#faqs") setActive("faqs");
    if (location.hash === "#documentation") setActive("documentation");
  }, [location.hash]);

  const selectTab = (key) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  // Documentation downloads require an account. If the person isn't logged
  // in, send them to log in first and bring them right back here afterward.
  const handleDownloadClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login", { state: { from: `${location.pathname}${location.hash}` } });
    }
  };

  return (
    <>
      <Seo
        title="Resources — RGTvertex"
        description="Documentation and frequently asked questions to help your team get the most out of RGTvertex."
      />
      <PageHero
        eyebrow="Resources"
        title="Everything you need to plan, launch, and scale."
        description="Documentation and answers to the questions teams ask most before rolling out an AI workforce."
        bgImage="/resources-hero.png"
        bgClass="bg-cover bg-center sm:bg-[length:auto_92%] sm:bg-right bg-no-repeat"
      />

      <Section>
        <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => selectTab(tab.key)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${active === tab.key ? "text-white" : "text-ink-soft hover:text-ink"
                }`}
            >
              {active === tab.key && (
                <motion.span
                  layoutId="resources-tab-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active === "documentation" ? (
            <motion.div
              key="documentation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              id="documentation"
              className="scroll-mt-24"
            >
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    Guides to get your team up and running.
                  </h2>
                </div>
                <a href="/RGTvertex-Documentation.pdf" download onClick={handleDownloadClick} className="shrink-0">
                  <Button variant="secondary" className="whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      {user ? <Download size={15} /> : <Lock size={15} />}
                      {user ? "Download Documentation PDF" : "Log in to download"}
                    </span>
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {docs.map((doc, i) => (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    onMouseMove={handleMouseMove}
                  >
                    <Card hover className="glow-card corner-glow h-full hover:border-accent/30 hover:shadow-glow">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-ink">
                        <doc.icon size={20} strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{doc.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{doc.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <h3 className="mt-16 text-xl font-semibold tracking-tight text-ink">
                What each agent handles, at a glance.
              </h3>
              <div className="mt-8 flex flex-col divide-y divide-border">
                {agents.map((agent, i) => (
                  <motion.div
                    key={agent.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                    className="grid grid-cols-1 gap-6 py-10 first:pt-0 md:grid-cols-[auto_1fr_auto] md:items-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-soft text-ink">
                      <Icon name={agent.icon} size={22} strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold tracking-tight text-ink">{agent.name}</h4>
                        {agent.live && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Live
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">{agent.short}</p>
                    </div>
                    <a 
                      href={agent.slug === "lead-generation" ? "/brochure/RGTVertex_Brochure.html" : `/docs/${agent.slug}.pdf`} 
                      download={agent.slug === "lead-generation" ? undefined : true} 
                      target={agent.slug === "lead-generation" ? "_blank" : undefined}
                      rel={agent.slug === "lead-generation" ? "noopener noreferrer" : undefined}
                      onClick={handleDownloadClick} 
                      className="shrink-0"
                    >
                      <Button variant="secondary" size="sm" className="whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          {user ? (agent.slug === "lead-generation" ? <BookOpen size={14} /> : <Download size={14} />) : <Lock size={14} />}
                          {user ? (agent.slug === "lead-generation" ? "View Brochure" : "Download Document") : (agent.slug === "lead-generation" ? "Log in to view" : "Log in to download")}
                        </span>
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              id="faqs"
              className="scroll-mt-24"
            >
              <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    Common questions about resources and support.
                  </h2>
                </div>
                <Accordion items={faqs} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
