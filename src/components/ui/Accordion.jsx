import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="group flex w-full items-center justify-between gap-6 rounded-xl px-2 py-6 text-left transition-colors duration-200 hover:bg-accent-soft/50"
              aria-expanded={isOpen}
            >
              <span className={`text-base font-medium md:text-lg ${isOpen ? "text-accent" : "text-ink"}`}>{item.q}</span>
              <Plus
                size={20}
                strokeWidth={1.75}
                className={`shrink-0 transition-all duration-300 ${
                  isOpen ? "rotate-45 text-accent" : "text-ink-soft group-hover:text-accent"
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-soft md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
