export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white shadow-xs">
        <img
          src="/RGTvertex-icon.png"
          alt="RGTvertex"
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="text-xl font-bold tracking-tight text-ink">RGTvertex</span>
    </div>
  );
}