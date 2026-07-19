import * as Icons from "lucide-react";

export default function Icon({ name, size = 20, strokeWidth = 1.75, className = "" }) {
  const LucideIcon = Icons[name] || Icons.Circle;
  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />;
}
