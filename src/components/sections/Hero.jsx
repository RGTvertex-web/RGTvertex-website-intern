import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background layer - z-index 0 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero-bg1.png')] bg-cover bg-center bg-no-repeat filter grayscale opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
        <div className="grain absolute inset-0 opacity-[0.25]" />
      </div>

      {/* Content layer - z-index 10 */}
      <div className="container-x relative z-10 flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Eyebrow className="rounded-full border border-border bg-bg-soft px-4.5 py-1.5 shadow-xs">
            Reliable AI • Scalable Growth • Intelligent Technology
          </Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="text-balance text-[3.2rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[4.2rem] md:text-[5rem]"
        >
          Building the Future
          <br />
          of Enterprise AI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          className="max-w-2xl text-balance text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          RGTvertex build enterprise AI products that automate operations,
          eliminate repetitive work, and help organizations scale with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
        >
          <Button 
            to="/contact" 
            size="lg"
            className="rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-ink/90 hover:scale-105"
          >
            Get in Touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-2 flex items-center gap-6 text-xs text-ink-faint"
        >
        </motion.div>
      </div>
    </section>
  );
}