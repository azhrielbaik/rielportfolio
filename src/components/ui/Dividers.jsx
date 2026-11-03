export function JaggedDivider({ fill = "var(--ink)", bg = "transparent", position = "top", className = "" }) {
  // Repeating zig-zag / jagged teeth divider
  return (
    <div
      className={`divider-jagged divider--${position} ${className}`.trim()}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "24px" }}
      >
        <path
          d="M0,0 L20,24 L40,0 L60,24 L80,0 L100,24 L120,0 L140,24 L160,0 L180,24 L200,0 L220,24 L240,0 L260,24 L280,0 L300,24 L320,0 L340,24 L360,0 L380,24 L400,0 L420,24 L440,0 L460,24 L480,0 L500,24 L520,0 L540,24 L560,0 L580,24 L600,0 L620,24 L640,0 L660,24 L680,0 L700,24 L720,0 L740,24 L760,0 L780,24 L800,0 L820,24 L840,0 L860,24 L880,0 L900,24 L920,0 L940,24 L960,0 L980,24 L1000,0 L1020,24 L1040,0 L1060,24 L1080,0 L1100,24 L1120,0 L1140,24 L1160,0 L1180,24 L1200,0 L1200,24 L0,24 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function WavyDivider({ fill = "var(--blue)", bg = "transparent", position = "top", className = "" }) {
  return (
    <div
      className={`divider-wavy divider--${position} ${className}`.trim()}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "32px" }}
      >
        <path
          d="M0,16 C150,32 350,0 500,16 C650,32 850,0 1000,16 C1100,24 1170,28 1200,32 L1200,32 L0,32 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

