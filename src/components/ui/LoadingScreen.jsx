import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// persist=true  → stays visible until parent unmounts it (used as auth gate)
// persist=false → auto-hides after 650 ms (used as initial page-load splash)
export default function LoadingScreen({ persist = false }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (persist) return; // never auto-hide when used as a gate
    const timer = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(timer);
  }, [persist]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-ink"
            >
              <span className="text-sm font-semibold tracking-tight text-white">rgt</span>
            </motion.div>
            <div className="h-[2px] w-24 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full w-1/2 rounded-full bg-ink"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
