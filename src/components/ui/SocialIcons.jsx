// Lucide dropped brand/social icons, so these are small hand-built monochrome
// equivalents, styled to match the rest of the icon set (1.6 stroke, currentColor).

export function LinkedInIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 10.2V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7.5" cy="7.1" r="1.05" fill="currentColor" />
      <path
        d="M11.3 17v-4.1c0-1.5.95-2.5 2.25-2.5s2.15 1 2.15 2.5V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.3 10.2V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
export function YoutubeIcon({ size = 15, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Rounded Square Border */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      {/* YouTube Play Button */}
      <path
        d="M9.5 8.8C8.7 8.8 8 9.5 8 10.3v3.4c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5v-3.4c0-.8-.7-1.5-1.5-1.5h-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M11 10.5L14 12L11 13.5V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
    </svg>
  );
}
