import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { footerLinks } from "@/data/site";
import Logo from "@/components/ui/Logo";
import { LinkedInIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
  { label: "Youtube", href: "https://youtube.com", Icon: YoutubeIcon },
  { label: "Instagram", href: "https://www.instagram.com/rgtvertex.ai/", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft-2">
      <div className="container-x py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              A specialized AI workforce for the enterprise — seven agents, one platform,
              built to work the way your teams already do.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors duration-200 hover:border-accent/40 hover:text-accent hover:shadow-glow"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-ink">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="inline-block text-sm text-ink-soft transition-all duration-200 hover:translate-x-0.5 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-8 text-xs text-ink-faint md:flex-row">
          <span>&copy; {new Date().getFullYear()} RGTvertex. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
