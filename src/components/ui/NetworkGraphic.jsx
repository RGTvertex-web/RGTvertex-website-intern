import { motion } from "framer-motion";

const traces = [
  { path: "M 30,150 L 30,80 L 70,40 L 140,40", nodes: [{ x: 30, y: 150 }, { x: 140, y: 40 }] },
  { path: "M 160,160 L 160,100 L 120,60 L 90,60", nodes: [{ x: 160, y: 160 }, { x: 90, y: 60 }] },
  { path: "M 15,70 L 45,70 L 75,100 L 75,140", nodes: [{ x: 15, y: 70 }, { x: 75, y: 140 }] },
  { path: "M 185,40 L 155,70 L 155,130", nodes: [{ x: 185, y: 40 }, { x: 155, y: 130 }] },
  { path: "M 110,170 L 110,120 L 140,90", nodes: [{ x: 110, y: 170 }, { x: 140, y: 90 }] },
  { path: "M 60,110 L 90,140 L 140,140", nodes: [{ x: 60, y: 110 }, { x: 140, y: 140 }] }
];

export default function NetworkGraphic({ className = "", variant = "light", eager = false }) {
  const traceColor = variant === "dark" ? "rgba(17,17,17,0.3)" : "rgba(255,255,255,0.4)";
  const nodeColor = variant === "dark" ? "rgba(17,17,17,0.7)" : "rgba(255,255,255,0.8)";
  
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 180" className="h-full w-full" aria-hidden="true">
        {traces.map((trace, i) => (
          <motion.path
            key={`path-${i}`}
            d={trace.path}
            fill="none"
            stroke={traceColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            {...(eager
              ? { animate: { pathLength: 1, opacity: 1 } }
              : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true } })}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease: "easeInOut" }}
          />
        ))}
        {traces.flatMap((trace, i) => 
          trace.nodes.map((node, j) => (
            <motion.circle
              key={`node-${i}-${j}`}
              cx={node.x}
              cy={node.y}
              r={3}
              fill={nodeColor}
              initial={{ scale: 0, opacity: 0 }}
              {...(eager
                ? { animate: { scale: 1, opacity: 1 } }
                : { whileInView: { scale: 1, opacity: 1 }, viewport: { once: true } })}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          ))
        )}
      </svg>
    </div>
  );
}
