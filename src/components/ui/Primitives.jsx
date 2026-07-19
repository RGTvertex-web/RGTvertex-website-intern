export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-ink-soft ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-base leading-relaxed text-ink-soft md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white p-6 transition-all duration-300 ${
        hover ? "hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_16px_40px_-24px_rgba(17,17,17,0.25)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-bg-soft px-3 py-1 text-xs font-medium text-ink ${className}`}
    >
      {children}
    </span>
  );
}
