import { useState } from "react";
import { profileData } from "../data/profile";
import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";
import { Icon } from "./ui/Icon";
import { Marquee } from "./ui/Marquee";
import avatarImg from "../assets/azhriel.jpg";
import "./Hero.css";

export function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column (7 parts on desktop) */}
        <div className="hero-content">
          {/* Location Chip */}
          <div className="hero-chip-wrap">
            <Chip color="yellow" tilt="var(--tilt-a)">
              <span className="hero-location-pin" aria-hidden="true">📍</span>
              <span>{profileData.location}</span>
            </Chip>
          </div>

          {/* Headline Display */}
          <h1 className="hero-headline">
            <span className="mark">Mohammad</span>{" "}
            <span className="hero-name-shadow">Azhriel</span>
            <br />
            <span className="hero-name-sub">Muari Fullah</span>
          </h1>

          {/* Subtitle / Role Tagline */}
          <p className="hero-tagline mono-label">
            {profileData.tagline}
          </p>

          {/* Short Bio */}
          <p className="hero-bio">
            {profileData.shortBio}
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <Button
              as="a"
              href="#portfolio"
              variant="primary"
              className="hero-btn-primary"
            >
              <span>Lihat Portfolio</span>
              <Icon name="arrow-right" size={18} className="hero-btn-arrow" />
            </Button>
            <Button
              as="a"
              href="#contact"
              variant="ghost"
              className="hero-btn-secondary"
            >
              <span>Hubungi Saya</span>
            </Button>
          </div>
        </div>

        {/* Right Column / Avatar Unit (5 parts on desktop) */}
        <div className="hero-avatar-wrapper">
          {/* Background Decorative Layer 1: Pink Circle */}
          <div className="avatar-layer avatar-layer--pink-circle" aria-hidden="true" />
          
          {/* Background Decorative Layer 2: Yellow Offset Box */}
          <div className="avatar-layer avatar-layer--yellow-box" aria-hidden="true" />

          {/* Floating Decorative Shapes */}
          <div className="floating-shape shape-star" aria-hidden="true">
            <Icon name="star" size={28} />
          </div>
          <div className="floating-shape shape-dot" aria-hidden="true" />
          <div className="floating-shape shape-cross" aria-hidden="true">✦</div>

          {/* Flip Hint Sticker */}
          <button
            type="button"
            className="avatar-flip-hint mono-label"
            onClick={toggleFlip}
            aria-label={isFlipped ? "Balik ke foto depan" : "Balik foto untuk scan QR CV"}
          >
            <span>{isFlipped ? "↺ FOTO" : "🔄 FLIP QR"}</span>
          </button>

          {/* 3D Flip Card Container */}
          <div
            className={`avatar-flip-card ${isFlipped ? "is-flipped" : ""}`}
            onClick={toggleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFlip();
              }
            }}
            aria-label={isFlipped ? "Kartu QR CV. Klik untuk kembali ke foto depan" : "Foto profil Azhriel. Klik untuk membalik kartu dan melihat QR Code CV"}
          >
            <div className="avatar-flip-inner">
              {/* Front Face: Photo */}
              <div className="avatar-flip-face avatar-flip-front">
                <img
                  src={avatarImg}
                  alt="Mohammad Azhriel Muari Fullah"
                  width="360"
                  height="360"
                  className="avatar-image"
                  loading="eager"
                />
              </div>

              {/* Back Face: QR Code to CV */}
              <div className="avatar-flip-face avatar-flip-back">
                <div className="avatar-qr-content">
                  <span className="avatar-qr-title mono-label">SCAN MY CV</span>
                  
                  <div className="avatar-qr-box">
                    <img
                      src="/assets/cv-qr.svg"
                      alt="QR Code menuju Curriculum Vitae resmi Mohammad Azhriel"
                      width="150"
                      height="150"
                      className="avatar-qr-img"
                    />
                  </div>

                  <a
                    href={profileData.cvPath}
                    download="CV_MOHAMMAD_AZHRIEL.pdf"
                    className="avatar-qr-download-link mono-label"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Unduh berkas CV format PDF"
                  >
                    <span>Unduh PDF ↓</span>
                  </a>

                  <span className="avatar-qr-hint mono-label">
                    ↺ Ketuk untuk balik
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge: Open to Internship */}
          <div className="status-badge" title="Status Ketersediaan">
            <span className="status-badge__dot" aria-hidden="true" />
            <span className="status-badge__text mono-label">
              {profileData.statusBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ticker */}
      <Marquee />
    </section>
  );
}
