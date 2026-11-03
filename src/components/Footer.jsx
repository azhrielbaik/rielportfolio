import { instagramData } from "../data/instagram";
import { Icon } from "./ui/Icon";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Instagram Highlights Feed Preview */}
        <div className="footer-instagram-feed">
          <div className="instagram-feed__header">
            <span className="instagram-feed__badge mono-label">
              CREATIVE LOGS &amp; HIGHLIGHTS
            </span>
            <h3 className="instagram-feed__title">
              Instagram Stories // @mhmd_azrl0
            </h3>
          </div>

          <div className="instagram-grid">
            {instagramData.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/mhmd_azrl0"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-tile card"
                style={{ "--tilt": post.tilt }}
                aria-label={`${post.caption} - Lihat di Instagram (membuka tab baru)`}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  width="300"
                  height="300"
                  loading="lazy"
                  className="instagram-tile__img"
                />

                {/* Pink Hover Overlay with Play Button Spring Effect */}
                <div className="instagram-tile__overlay" aria-hidden="true">
                  <div className="instagram-tile__play-circle">
                    <Icon name="play" size={24} />
                  </div>
                  <span className="instagram-tile__tag mono-label">
                    {post.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Giant Visual Colophon: RIEL. */}
        <div className="footer-branding" aria-hidden="true">
          <span className="footer-branding__word">RIEL.</span>
        </div>

        {/* Bottom Colophon and Copyright Statement */}
        <div className="footer-bottom">
          <p className="footer-copyright mono-label">
            &copy; 2026 Mohammad Azhriel Muari Fullah. All rights reserved.
          </p>
          <p className="footer-tech-stack mono-label">
            Built with React &bull; Native CSS &bull; Neo-Brutalism System
          </p>
        </div>
      </div>
    </footer>
  );
}

