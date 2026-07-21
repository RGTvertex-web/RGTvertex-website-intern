import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Primitives";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  bgImage,
  bgVideo,
  bgClass = "bg-cover bg-center bg-no-repeat",
  bgBlur = "",
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-soft-2">
      <div className="pointer-events-none absolute inset-0 z-0">
        {bgImage && !bgVideo && (
          <>
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
        {bgVideo && (
          <>
            <video
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 h-full w-full object-cover opacity-100 transition-all duration-300 ${bgBlur}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-soft-2/90 via-bg-soft-2/60 to-transparent" />
          </>
        )}
        <div className="animate-float-a absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="animate-float-b absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-accent/[0.05] blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.3]" />
      </div>
      <div className={`container-x relative z-10 flex flex-col items-start justify-center gap-5 py-16 md:py-24 ${bgImage || bgVideo ? "min-h-[60vh] md:min-h-[70vh]" : "min-h-[25vh]"}`}>
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
