export default function Logo() {
  return (
    <div className="flex items-center gap-3 text-[var(--color-text)]">
      <svg
        aria-label="WORXPATH"
        viewBox="0 0 48 48"
        className="h-10 w-10"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="40"
          height="40"
          rx="14"
          fill="url(#wp-bg)"
          stroke="rgba(15,23,42,0.08)"
        />
        <path
          d="M14 30L20 18L24 24L28 14L34 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="wp-bg" x1="6" y1="6" x2="42" y2="42">
            <stop stopColor="#ECFDF5" />
            <stop offset="0.55" stopColor="#EEF2FF" />
            <stop offset="1" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>
      </svg>

      <div className="leading-none">
        <div className="font-[var(--font-display)] text-[1.05rem] font-bold tracking-[-0.04em]">
          WORXPATH
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Employability OS
        </div>
      </div>
    </div>
  );
}