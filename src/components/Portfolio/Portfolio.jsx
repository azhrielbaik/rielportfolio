import { useState, useRef } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectsTab } from "./ProjectsTab";
import { CertificatesTab } from "./CertificatesTab";
import { SkillsTab } from "./SkillsTab";
import { WavyDivider } from "../ui/Dividers";
import "./Portfolio.css";

const TABS = [
  { id: "projects", label: "Projects", icon: "🗂", color: "yellow", tilt: "var(--tilt-a)" },
  { id: "certificates", label: "Certificates", icon: "🏆", color: "pink", tilt: "var(--tilt-b)" },
  { id: "skills", label: "Skills", icon: "⚡", color: "mint", tilt: "var(--tilt-c)" }
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const tabListRef = useRef(null);

  const handleKeyDown = (e, index) => {
    let newIndex = null;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + TABS.length) % TABS.length;
    }

    if (newIndex !== null) {
      e.preventDefault();
      const nextTab = TABS[newIndex];
      setActiveTab(nextTab.id);
      const buttons = tabListRef.current?.querySelectorAll('[role="tab"]');
      buttons?.[newIndex]?.focus();
    }
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <WavyDivider fill="var(--blue)" bg="var(--paper)" position="top" />

      <div className="portfolio-band">
        <div className="container">
          {/* Section Heading 03 */}
          <SectionHeading
            number="03"
            title="Portfolio"
            subtitle="Karya, Prestasi &amp; Keahlian"
            color="yellow"
            align="center"
          />

          {/* Interactive Tabs Controller */}
          <div className="portfolio-tabs-wrapper">
            <div
              className="portfolio-tablist"
              role="tablist"
              aria-label="Kategori Portfolio"
              ref={tabListRef}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === tab.id;
                const tabStyle = isActive
                  ? { transform: "translateY(-4px) rotate(0deg)" }
                  : { transform: `rotate(${tab.tilt})` };

                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    className={`portfolio-tab-btn ${isActive ? `active tab-active--${tab.color}` : ""}`}
                    style={tabStyle}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <span className="portfolio-tab-icon" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <span className="portfolio-tab-label">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Panes */}
          <div className="portfolio-tab-content">
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "certificates" && <CertificatesTab />}
            {activeTab === "skills" && <SkillsTab />}
          </div>
        </div>
      </div>

      <WavyDivider fill="var(--mint)" bg="var(--blue)" position="bottom" />
    </section>
  );
}
