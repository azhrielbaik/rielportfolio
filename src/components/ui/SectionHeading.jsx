export function SectionHeading({
  number,
  title,
  subtitle,
  color = "yellow",
  align = "left",
  className = ""
}) {
  const alignClass = align === "center" ? "section-heading--center" : "";

  return (
    <div className={`section-heading ${alignClass} ${className}`.trim()}>
      <div className="section-heading__badge-wrap">
        <span
          className="section-heading__number"
          style={{ backgroundColor: `var(--${color})` }}
          aria-hidden="true"
        >
          {number}
        </span>
        {subtitle && (
          <span className="section-heading__subtitle mono-label">
            {subtitle}
          </span>
        )}
      </div>

      <div className="section-heading__title-wrap">
        <h2 className="section-heading__title">{title}</h2>
        {/* Playful SVG Squiggle underline */}
        <svg
          className="section-heading__squiggle"
          viewBox="0 0 240 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 11C35 4 55 14 85 8C115 2 135 14 165 7C195 2 215 13 238 7"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

