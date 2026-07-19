import { motion } from "framer-motion";

export default function ClockGraphic() {
  const ticks = Array.from({ length: 12 });

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[180px] items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-full w-full" aria-hidden="true">
        <circle cx="90" cy="90" r="82" fill="#111111" />
        <circle cx="90" cy="90" r="82" fill="none" stroke="#3a3a3a" strokeWidth="1" />
        <circle cx="90" cy="90" r="66" fill="none" stroke="#3a3a3a" strokeWidth="1" strokeDasharray="1 7" />

        {ticks.map((_, i) => {
          const angle = (Math.PI * 2 * i) / 12;
          const x1 = 90 + 74 * Math.sin(angle);
          const y1 = 90 - 74 * Math.cos(angle);
          const x2 = 90 + 66 * Math.sin(angle);
          const y2 = 90 - 66 * Math.cos(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" />
          );
        })}

        <motion.line
          x1="90" y1="90" x2="90" y2="48"
          stroke="#ffffff" strokeWidth="3" strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "90px 90px" }}
        />
        <motion.line
          x1="90" y1="90" x2="122" y2="90"
          stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "90px 90px" }}
        />
        <circle cx="90" cy="90" r="4" fill="#ffffff" />
      </svg>
    </div>
  );
}
