import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const variants = {
  primary:
    "bg-ink text-white hover:bg-black/85 border border-ink hover:shadow-[0_16px_36px_-14px_rgba(47,95,224,0.55)]",
  secondary:
    "bg-white text-ink border border-border hover:border-accent/40 hover:bg-bg-soft-2 hover:shadow-[0_14px_30px_-18px_rgba(47,95,224,0.35)]",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-bg-soft",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  ...props
}) {
  const classes = `btn-sheen group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="sheen" aria-hidden="true" />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowRight
          size={16}
          strokeWidth={2}
          className="relative transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
