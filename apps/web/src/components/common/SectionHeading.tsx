type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-[2rem] font-bold tracking-[-0.05em] text-[var(--color-text)] sm:text-[2.5rem]">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}