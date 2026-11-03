import { useState, useEffect } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import "./Header.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const activeSection = useScrollSpy(["home", "about", "portfolio", "contact"]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide if mobile menu is open
      if (menuOpen) return;

      // Always show at top of page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
        // Scrolling down: hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
        // Scrolling up: reveal
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (e, targetId) => {
    setMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`header-floating ${isVisible ? "" : "is-hidden"}`}>
      <div className="header-bar">
        {/* Brand Logo */}
        <a
          href="#home"
          className="header-brand"
          onClick={(e) => handleLinkClick(e, "home")}
          aria-label="Kembali ke Beranda"
        >
          <span className="header-brand__text">My Portfolio</span>
          <span className="header-brand__dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Navigasi Utama">
          <ul className="header-nav__list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="header-nav__item">
                  <a
                    href={`#${link.id}`}
                    className={`header-nav__link ${isActive ? "active" : ""}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="header-nav__link-text">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          type="button"
          className={`header-hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-navigation"
        className={`header-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="header-drawer__list">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeSection === link.id;
            return (
              <li
                key={link.id}
                className="header-drawer__item"
                style={{ "--stagger": `${index * 60}ms` }}
              >
                <a
                  href={`#${link.id}`}
                  className={`header-drawer__link ${isActive ? "active" : ""}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="header-drawer__number mono-label">
                    0{index + 1}
                  </span>
                  <span className="header-drawer__label">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

