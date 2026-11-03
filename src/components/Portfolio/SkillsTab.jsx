import { useState, useEffect } from "react";
import { skillsData } from "../../data/skills";

export function SkillsTab() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Animate progress bars from 0% to target% when mounted/tab active
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="tabpanel-skills"
      role="tabpanel"
      aria-labelledby="tab-skills"
      className="portfolio-panel skills-panel"
    >
      <div className="skills-categories-grid">
        {skillsData.map((category, catIndex) => {
          const catTilt = catIndex % 2 === 0 ? "var(--tilt-a)" : "var(--tilt-b)";

          return (
            <div
              key={category.category}
              className={`skills-category-card card card--${category.color}`}
              style={{
                "--tilt": catTilt,
                "--i": catIndex
              }}
            >
              {/* Category Header */}
              <div className="skills-category__header">
                <span
                  className="skills-category__pill mono-label"
                  style={{ backgroundColor: category.accentHex }}
                >
                  CATEGORY 0{catIndex + 1}
                </span>
                <h3 className="skills-category__title">{category.category}</h3>
                <p className="skills-category__desc">{category.description}</p>
              </div>

              {/* Progress Bars List */}
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => {
                  const currentWidth = animated ? `${skill.level}%` : "0%";
                  const staggerDelay = `${skillIndex * 80}ms`;

                  return (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-item__meta">
                        <span className="skill-item__name">{skill.name}</span>
                        <span className="skill-item__percent-badge mono-label">
                          {skill.level}%
                        </span>
                      </div>

                      {/* 28px Thick Progress Bar with Diagonal Striped Pattern */}
                      <div
                        className="skill-bar__track"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`Kemampuan ${skill.name} sebesar ${skill.level}%`}
                      >
                        <div
                          className="skill-bar__fill"
                          style={{
                            width: currentWidth,
                            transitionDelay: staggerDelay,
                            backgroundColor: category.accentHex
                          }}
                        >
                          {/* Inner diagonal pattern */}
                          <span className="skill-bar__stripes" aria-hidden="true" />
                          {/* End Sticker */}
                          <span className="skill-bar__sticker mono-label" aria-hidden="true">
                            ★
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
