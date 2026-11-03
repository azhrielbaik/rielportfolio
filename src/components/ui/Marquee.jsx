import "./Marquee.css";

const TECH_LOGOS = [
  {
    name: "HTML5",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="HTML5">
        <title>HTML5</title>
        <path fill="#E34F26" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
        <path fill="#EF652A" d="M12 3.8v18.3l5.6-1.4L19.2 3.8H12z" />
        <path fill="#ECECEC" d="M12 8.4H7.8l.3 3.6h3.9v3.6l-3.8-1-.2-2.5H6.2l.4 4.5L12 18l5.4-1.4.6-6.8h-6V8.4z" />
        <path fill="#FFFFFF" d="M12 8.4h4.2l-.4 4.8h-3.8V8.4zM12 14.6h3.6l-.3 3.4-3.3.9v-4.3z" />
      </svg>
    )
  },
  {
    name: "CSS3",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="CSS3">
        <title>CSS3</title>
        <path fill="#1572B6" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
        <path fill="#33A9DC" d="M12 3.8v18.3l5.6-1.4L19.2 3.8H12z" />
        <path fill="#ECECEC" d="M12 8.4H7.8l.2 2.4h4V8.4zm0 4.8H8.2l.3 3.4 3.5.9V13.2z" />
        <path fill="#FFFFFF" d="M12 8.4h4.2l-.2 2.4H12v2.4h3.8l-.4 4.5-3.4.9V13.2z" />
      </svg>
    )
  },
  {
    name: "JavaScript",
    svg: (
      <svg viewBox="0 0 24 24" className="tech-logo" aria-label="JavaScript">
        <title>JavaScript</title>
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          fill="#111111"
          d="M6.5 17.2c.6.9 1.4 1.4 2.4 1.4 1.2 0 1.9-.7 1.9-1.6v-6.2h2.2v6.2c0 2.3-1.4 3.4-4 3.4-1.9 0-3-.8-3.7-2l1.2-1.2zm7.7-1c.6.9 1.5 1.4 2.7 1.4 1.1 0 1.8-.5 1.8-1.3 0-.8-.6-1.2-2-1.7-2.1-.8-3.4-1.6-3.4-3.4 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.5.6 3.2 1.7l-1.4 1.2c-.4-.7-1-1.1-1.8-1.1-.9 0-1.4.5-1.4 1.1 0 .7.6 1.1 2 1.6 2.3.9 3.5 1.8 3.5 3.6 0 2-1.6 3.2-3.9 3.2-2.1 0-3.4-.8-4.2-2.2l1.4-1.4z"
        />
      </svg>
    )
  },
  {
    name: "PHP",
    svg: (
      <svg viewBox="0 0 28 20" className="tech-logo tech-logo--wide" aria-label="PHP">
        <title>PHP</title>
        <ellipse cx="14" cy="10" rx="13" ry="9" fill="#777BB4" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          fill="#FFFFFF"
          d="M6 14h1.5l.5-2.5h1.8c1.6 0 2.6-.7 3-2.2.4-1.6-.4-2.5-2-2.5H7.2L6 14zm2.4-3.8l.4-2h1.4c.7 0 1.1.4 1 1s-.5.9-1.2.9H8.4zm6.6 3.8h1.5l.5-2.5h1.8c1.6 0 2.6-.7 3-2.2.4-1.6-.4-2.5-2-2.5h-3.6L15 14zm2.4-3.8l.4-2h1.4c.7 0 1.1.4 1 1s-.5.9-1.2.9h-1.4z"
        />
      </svg>
    )
  },
  {
    name: "MySQL",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="MySQL">
        <title>MySQL</title>
        <path
          fill="#00758F"
          d="M12 2C6.5 2 2 4.2 2 7v10c0 2.8 4.5 5 10 5s10-2.2 10-5V7c0-2.8-4.5-5-10-5zm0 2c4.4 0 8 1.6 8 3.5S16.4 11 12 11 4 9.4 4 7.5 7.6 4 12 4zm8 13c0 1.9-3.6 3.5-8 3.5S4 18.9 4 17v-2.5c2 1.5 4.9 2.5 8 2.5s6-1 8-2.5V17zm0-4.5c0 1.9-3.6 3.5-8 3.5S4 14.4 4 12.5V10c2 1.5 4.9 2.5 8 2.5s6-1 8-2.5v2.5z"
        />
        <path
          fill="#F29111"
          d="M17 11.5c1.7.5 3 1.3 3 2.2v2.5c-1.2.9-2.8 1.6-4.6 2-1-.8-1.4-2.1-1.4-3.2 0-1.8 1.3-3.1 3-3.5z"
        />
      </svg>
    )
  },
  {
    name: "Laravel",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="Laravel">
        <title>Laravel</title>
        <path fill="#FF2D20" d="M12 2.5l7.5 4.3v8.7L12 19.8l-7.5-4.3V6.8L12 2.5z" />
        <path fill="#FFFFFF" fillOpacity="0.25" d="M12 2.5l7.5 4.3-7.5 4.3-7.5-4.3 7.5-4.3z" />
        <path
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 7.5l7 4-3.5 2 7 4M12 11.5v6"
        />
      </svg>
    )
  },
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="React">
        <title>React</title>
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      </svg>
    )
  },
  {
    name: "Figma (UI/UX)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="Figma UI/UX">
        <title>Figma (UI/UX)</title>
        <path fill="#F24E1E" d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" />
        <path fill="#FF7262" d="M12 2h4a2.5 2.5 0 1 1 0 5h-4V2z" />
        <path fill="#A259FF" d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" />
        <path fill="#1ABCFE" d="M12 7h4a2.5 2.5 0 1 1 0 5h-4V7z" />
        <path fill="#0ACF83" d="M8 12h4v2.5A2.5 2.5 0 1 1 8 12z" />
      </svg>
    )
  },
  {
    name: "Problem Solving",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className="tech-logo" aria-label="Problem Solving">
        <title>Problem Solving</title>
        <rect x="2" y="3" width="20" height="18" rx="4" fill="#7DE3A8" stroke="#111111" strokeWidth="1.5" />
        <path
          d="M7 9l3 3-3 3M13 15h5"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export function Marquee() {
  const renderItemSequence = () => (
    <>
      {TECH_LOGOS.map((tech, index) => {
        const starColor = index % 2 === 0 ? "var(--yellow)" : "var(--pink)";
        return (
          <span key={index} className="marquee__segment">
            <span className="marquee__logo-wrapper" title={tech.name}>
              {tech.svg}
            </span>
            <span
              className="marquee__star"
              style={{ color: starColor }}
              aria-hidden="true"
            >
              ★
            </span>
          </span>
        );
      })}
    </>
  );

  return (
    <div className="marquee-wrapper" aria-label="Logo Teknologi dan Keahlian Utama">
      <div className="marquee-band">
        <div className="marquee-track">
          <div className="marquee-content">{renderItemSequence()}</div>
          <div className="marquee-content" aria-hidden="true">
            {renderItemSequence()}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {renderItemSequence()}
          </div>
        </div>
      </div>
    </div>
  );
}
