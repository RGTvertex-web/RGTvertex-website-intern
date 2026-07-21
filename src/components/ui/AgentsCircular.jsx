import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { agents } from "@/data/agents";
import Icon from "@/components/ui/Icon";

const RADIUS = 100;
const CENTER = 140;
const NODE_SIZE = 40;
const HUB_SIZE = 64;

function pointOnCircle(index, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function AgentsCircular() {
  const nodes = agents.map((agent, i) => ({
    ...agent,
    ...pointOnCircle(i, agents.length),
  }));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
      {/*
        Everything below — the connecting lines, the guide circle, the hub,
        and every agent icon — lives inside ONE svg coordinate system. That
        guarantees they scale together and stay perfectly aligned no matter
        the container's rendered size, instead of relying on separately
        positioned HTML elements drifting out of sync with the svg.
      */}
      <svg viewBox="0 0 280 280" className="h-full w-full overflow-visible" aria-hidden="true">
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={node.x}
            y2={node.y}
            stroke="#8a8a8a"
            strokeOpacity="0.18"
            strokeWidth="1.4"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: "easeInOut" }}
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="2 6" />

        <foreignObject x={CENTER - HUB_SIZE / 2} y={CENTER - HUB_SIZE / 2} width={HUB_SIZE} height={HUB_SIZE}>
          <Link
            xmlns="http://www.w3.org/1999/xhtml"
            to="/ai-agents"
            aria-label="View all AI agents"
            className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-ink shadow-glow"
          >
            <span className="text-lg font-semibold leading-none text-white">{agents.length}</span>
            <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.1em] text-white/70">Agents</span>
          </Link>
        </foreignObject>

        {nodes.map((node, i) => {
          const pad = node.live ? 8 : 0;
          const boxSize = NODE_SIZE + pad * 2;
          return (
            <foreignObject
              key={node.slug}
              x={node.x - boxSize / 2}
              y={node.y - boxSize / 2}
              width={boxSize}
              height={boxSize}
            >
              <div xmlns="http://www.w3.org/1999/xhtml" className="relative flex h-full w-full items-center justify-center">
                <Link
                  to={`/ai-agents#${node.slug}`}
                  aria-label={node.name}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                    className={`group relative flex items-center justify-center rounded-full border bg-white shadow-[0_6px_18px_-10px_rgba(17,17,17,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow ${
                      node.live
                        ? "h-10 w-10 border-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.14)]"
                        : "h-10 w-10 border-border hover:border-accent/40"
                    }`}
                  >
                    <Icon name={node.icon} size={15} strokeWidth={1.7} className="text-ink transition-colors duration-300 group-hover:text-accent" />
                    {node.live && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      </span>
                    )}
                  </motion.div>
                </Link>
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}