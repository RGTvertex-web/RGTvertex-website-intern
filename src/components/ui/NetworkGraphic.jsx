import { motion } from "framer-motion";

const nodes = [
  { x: 60, y: 50, r: 4 },
  { x: 130, y: 30, r: 3 },
  { x: 175, y: 85, r: 5 },
  { x: 110, y: 120, r: 3 },
  { x: 40, y: 130, r: 3.5 },
  { x: 155, y: 150, r: 4 },
  { x: 90, y: 75, r: 6 },
];

const edges = [
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [1, 2], [3, 5], [0, 4],
];

export default function NetworkGraphic({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 180" className="h-full w-full" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.r}
            fill={i === 6 ? "#ffffff" : "rgba(255,255,255,0.7)"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: "easeOut" }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </svg>
    </div>
  );
}
