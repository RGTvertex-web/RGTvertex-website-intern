import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Primitives";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  bgImage,
  bgClass = "bg-cover bg-center bg-no-repeat",
  bgBlur = "",
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-soft-2">
      <div className="pointer-events-none absolute inset-0 z-0">
        {bgImage && (
          <>
            {/*
              Hero background images should be WebP/JPEG under ~150 KB.
              Current PNGs are 700 KB–1 MB, causing slow first-paint.
              TODO: compress with `npx sharp-cli` or Squoosh before deploy.
            */}
            {/* Hidden img so the browser preloads the background eagerly */}
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />
            <div
              className={`absolute inset-0 opacity-100 transition-all duration-300 ${bgClass} ${bgBlur}`}
              style={{ backgroundImage: `url('${bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-soft-2 via-bg-soft-2/85 to-transparent" />
          </>
        )}
        <div className="animate-float-a absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="animate-float-b absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent/[0.05] blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.3]" />
        <svg className="absolute -right-6 top-1/2 hidden h-40 w-40 -translate-y-1/2 opacity-[0.5] md:block" viewBox="0 0 160 160" aria-hidden="true">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="2 8" />
          <circle cx="80" cy="80" r="45" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
      </div>
      <div className="container-x relative z-10 flex min-h-[400px] flex-col items-start justify-center gap-5 py-16 md:min-h-[480px] md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex max-w-2xl flex-col items-start gap-5"
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-balance text-lg leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
