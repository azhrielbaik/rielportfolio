import { useState } from "react";
import { projectsData } from "../../data/projects";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

function ProjectCardItem({ project, index, isEven, tilt }) {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    // Respect prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    const maxTilt = 7; // Max tilt angle in degrees
    const rotX = (-normY * maxTilt).toFixed(2);
    const rotY = (normX * maxTilt).toFixed(2);

    // Hard brutalist shadow offset moving in opposite direction of mouse
    const shadowX = (5 - normX * 6).toFixed(1);
    const shadowY = (5 - normY * 6).toFixed(1);

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate(-2px, -2px)`,
      boxShadow: `${shadowX}px ${shadowY}px 0 var(--ink)`,
      transition: "transform 60ms ease-out, box-shadow 60ms ease-out"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: undefined,
      boxShadow: undefined,
      transition: "transform 400ms var(--ease-spring), box-shadow 400ms var(--ease-spring)"
    });
  };

  return (
    <article
      className={`project-card card ${isEven ? "project-card--step" : ""}`}
      style={{
        "--tilt": tilt,
        "--i": index,
        ...tiltStyle
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Container (16:10 ratio, thick bottom border) */}
      <div className="project-card__thumbnail">
        <img
          src={project.image}
          alt={`Preview proyek ${project.title}`}
          width="640"
          height="400"
          loading="lazy"
          decoding="async"
          className="project-card__img"
        />
        <span className="project-card__category-badge mono-label">
          {project.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>

        <p className="project-card__summary">{project.summary}</p>

        {/* Technology Tags */}
        <div className="project-card__tags" aria-label="Teknologi yang digunakan">
          {project.tags.map((tag, tagIndex) => {
            const color = project.tagColors[tagIndex % project.tagColors.length];
            return (
              <Chip key={tag} color={color} className="project-tag">
                {tag}
              </Chip>
            );
          })}
        </div>

        {/* Card Action Links */}
        <div className="project-card__actions">
          {project.github && (
            <Button
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="project-action-btn"
              aria-label={`Lihat repositori GitHub untuk ${project.title} (membuka tab baru)`}
            >
              <Icon name="github" size={16} />
              <span>GitHub</span>
            </Button>
          )}

          {project.figma && (
            <Button
              as="a"
              href={project.figma}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="project-action-btn"
              aria-label={`Buka prototipe Figma untuk ${project.title} (membuka tab baru)`}
            >
              <Icon name="figma" size={16} />
              <span>Figma</span>
            </Button>
          )}

          {project.demo && (
            <Button
              as="a"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              className="project-action-btn"
              aria-label={`Buka Live Demo untuk ${project.title} (membuka tab baru)`}
            >
              <Icon name="external" size={16} />
              <span>Live Demo</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsTab() {
  return (
    <div
      id="tabpanel-projects"
      role="tabpanel"
      aria-labelledby="tab-projects"
      className="portfolio-panel projects-panel"
    >
      <div className="projects-grid">
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 1;
          const tilt = isEven ? "var(--tilt-b)" : "var(--tilt-a)";

          return (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              isEven={isEven}
              tilt={tilt}
            />
          );
        })}
      </div>
    </div>
  );
}
