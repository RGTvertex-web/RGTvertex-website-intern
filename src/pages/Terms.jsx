import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Primitives";
import Seo from "@/components/ui/Seo";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing or using the RGTvertex website or platform, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old, or the age of legal majority in your jurisdiction, to create an account, submit a job application, or enter into any agreement with RGTvertex.",
  },
  {
    title: "3. Use of the platform",
    body: "You agree to use RGTvertex only for lawful business purposes and in accordance with any agreement executed between your organization and RGTvertex.",
  },
  {
    title: "4. Accounts",
    body: "Creating an account requires a valid email address, personal or work email accounts are both accepted. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Contacting us and applying for open roles do not require an account or login.",
  },
  {
    title: "5. Job applications",
    body: "Submitting a job application, including any resume or personal information provided, is voluntary and does not guarantee an interview or offer. Application materials are reviewed by our hiring team and handled in line with our Privacy Policy.",
  },
  {
    title: "6. Intellectual property",
    body: "All content, branding, and technology associated with RGTvertex remain the property of RGTvertex and may not be copied or reproduced without permission.",
  },
  {
    title: "7. Service availability",
    body: "We aim to maintain reliable access to the platform but do not guarantee uninterrupted availability. Scheduled maintenance will be communicated in advance where possible.",
  },
  {
    title: "8. Limitation of liability",
    body: "RGTvertex is not liable for indirect, incidental, or consequential damages arising from use of the platform, to the fullest extent permitted by law.",
  },
  {
    title: "9. Termination",
    body: "We reserve the right to suspend or terminate access to the platform for any account found to be in violation of these terms.",
  },
  {
    title: "10. Changes to these terms",
    body: "We may revise these terms periodically. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.",
  },
  {
    title: "11. Contact",
    body: "Questions about these terms can be directed to our team through the Contact page, which is accessible without creating an account.",
  },
];

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions — RGTvertex" description="The terms governing use of the RGTvertex website and platform." />
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Last updated June 2026." />
      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {sections.map((s) => (
            <div key={s.title} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
