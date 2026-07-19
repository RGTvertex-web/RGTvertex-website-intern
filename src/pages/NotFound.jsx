import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — RGTvertex" description="The page you're looking for doesn't exist." />
      <section className="flex min-h-[70vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container-x flex flex-col items-center gap-5 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.14em] text-ink-faint">Error 404</span>
          <h1 className="text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            Lost node.
          </h1>
          <p className="max-w-md text-balance text-base leading-relaxed text-ink-soft">
            This page isn't connected to anything in our network. Let's get you back to
            somewhere that is.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Button to="/">Back to home</Button>
            <Button to="/contact" variant="secondary">Contact us</Button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
