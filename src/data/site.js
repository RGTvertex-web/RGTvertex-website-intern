export const navLinks = [
  { label: "Home", href: "/" },
  { label: "7-AI Agents", href: "/ai-agents" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Documentation", href: "/resources#documentation" },
      { label: "FAQs", href: "/resources#faqs" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  "AI Agents": [
    { label: "Lead Generation", href: "/ai-agents#lead-generation" },
    { label: "Customer Support", href: "/ai-agents#customer-support" },
    { label: "Legal & Compliance", href: "/ai-agents#legal-compliance" },
    { label: "Finance", href: "/ai-agents#finance" },
    { label: "Tech & DevOps", href: "/ai-agents#tech-devops" },
    { label: "HR & Hiring", href: "/ai-agents#hr-hiring" },
    { label: "Market Research", href: "/ai-agents#market-research" },
  ],
  Resources: [
    { label: "Documentation", href: "/resources#documentation" },
    { label: "FAQs", href: "/resources#faqs" },
  ],
  Company: [
    { label: "Home", href: "/" },
    { label: "AI Agents", href: "/ai-agents" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export const faqs = [
  {
    q: "What exactly is an AI agent, in practical terms?",
    a: "An AI agent is a dedicated digital worker built for one function — support, finance, hiring, and so on. It handles the repetitive, well-defined parts of that function on its own, and knows when to bring in a person for anything that needs judgment.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most teams have their first agent live within a few weeks of kickoff. Timelines depend on how much of your existing workflow and data needs to be connected before launch.",
  },
  {
    q: "Can we start with just one agent?",
    a: "Yes. Most customers start with a single agent that addresses their most pressing bottleneck, then expand once they've seen the results.",
  },
  {
    q: "How do the agents fit into our existing tools?",
    a: "Agents are built to work alongside the tools you already use — support desks, CRMs, accounting software, and more — rather than replace them.",
  },
  {
    q: "Who reviews what the agents do?",
    a: "Every agent operates within limits your team defines, and anything outside those limits is routed to a person. You keep full visibility into what's been handled and what's pending.",
  },
  {
    q: "Is our data secure?",
    a: "Security and access control are built into the platform from the ground up, with enterprise-grade safeguards at every layer.",
  },
];
