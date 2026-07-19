import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Primitives";
import Seo from "@/components/ui/Seo";

const sections = [
  {
    title: "1. Information we collect",
    body: "We collect information you provide directly: your name and email when you create an account, message details and company information when you contact us, and your resume, phone number, and professional links when you apply for a role. We also collect basic usage information generated when you interact with the RGTvertex website and platform.",
  },
  {
    title: "2. How we use information",
    body: "Information is used to operate and improve the platform, respond to inquiries, review job applications, provide support, and communicate updates relevant to your account. We do not sell personal information to third parties, and we do not require a business or work email address. A personal email account works just as well for an account, an enquiry, or a job application.",
  },
  {
    title: "3. Data security",
    body: "We apply access controls, encryption in transit and at rest, and regular internal review to protect information handled by the platform, including account credentials and uploaded documents such as resumes. No system is completely immune to risk, and we work continuously to reduce it.",
  },
  {
    title: "4. Data retention",
    body: "Information is retained for as long as needed to provide the service and meet legal and operational requirements. Job application materials, including resumes, are retained for the duration of the hiring process and a reasonable period afterward, after which they are securely deleted or anonymized.",
  },
  {
    title: "5. Your choices",
    body: "You may request access to, correction of, or deletion of your personal information, including your account, resume, or application data, at any time by contacting us using the details on our Contact page.",
  },
  {
    title: "6. Third-party service providers",
    body: "We use trusted infrastructure providers (such as our authentication, database, and file-storage provider) to operate the platform. These providers process data on our behalf under their own security commitments and do not use your information for their own purposes.",
  },
  {
    title: "7. Cookies",
    body: "Our website uses a limited set of cookies to support core functionality, keep you signed in, and understand aggregate usage patterns. You can control cookie preferences through your browser settings.",
  },
  {
    title: "8. Children's privacy",
    body: "RGTvertex is intended for business and professional use and is not directed at individuals under the age of 18. We do not knowingly collect personal information from children.",
  },
  {
    title: "9. Changes to this policy",
    body: "We may update this policy from time to time as our platform evolves. Material changes will be communicated through the website or directly to account holders.",
  },
  {
    title: "10. Contact",
    body: "Questions about this policy, or requests regarding your personal data, can be directed to our team through the Contact page. No account or login is required to reach us.",
  },
];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy — RGTvertex" description="How RGTvertex collects, uses, and protects your information." />
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated June 2026." />
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
