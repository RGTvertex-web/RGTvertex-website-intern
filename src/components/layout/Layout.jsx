import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Framer Motion's IntersectionObserver (used by whileInView) does not
    // automatically re-evaluate elements that are already in the viewport
    // after a client-side navigation. Dispatching a synthetic scroll event
    // after the new page has rendered forces the observer to re-check all
    // elements, so whileInView content is visible on the FIRST click.
    const id = setTimeout(() => window.dispatchEvent(new Event("scroll")), 50);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
