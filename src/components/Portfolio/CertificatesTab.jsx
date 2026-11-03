import { useState, useRef } from "react";
import { certificatesData } from "../../data/certificates";
import { CertificateModal } from "./CertificateModal";

export function CertificatesTab() {
  const [selectedCert, setSelectedCert] = useState(null);
  const triggerRef = useRef(null);

  const handleOpenModal = (cert, event) => {
    triggerRef.current = event.currentTarget;
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    triggerRef.current?.focus();
  };

  return (
    <div
      id="tabpanel-certificates"
      role="tabpanel"
      aria-labelledby="tab-certificates"
      className="portfolio-panel certificates-panel"
    >
      <div className="certificates-grid">
        {certificatesData.map((cert, index) => {
          return (
            <button
              key={cert.id}
              type="button"
              className="polaroid-card card"
              style={{
                "--tilt": cert.tilt,
                "--i": index
              }}
              onClick={(e) => handleOpenModal(cert, e)}
              aria-haspopup="dialog"
              aria-label={`Buka pratinjau sertifikat: ${cert.title}`}
            >
              {/* Tilted Yellow Tape on Top (aria-hidden) */}
              <span className="polaroid__tape" aria-hidden="true" />

              {/* Photo Box */}
              <div className="polaroid__photo-box">
                <img
                  src={cert.image}
                  alt={`Pratinjau sertifikat ${cert.title}`}
                  width="600"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  className="polaroid__img"
                />
                <span className="polaroid__badge mono-label">
                  {cert.badge}
                </span>
              </div>

              {/* Thick Bottom Caption Frame */}
              <div className="polaroid__caption">
                <h3 className="polaroid__title">{cert.title}</h3>
                <p className="polaroid__issuer mono-label">{cert.issuer} • {cert.year}</p>
                <span className="polaroid__hint mono-label">
                  🔍 Klik untuk inspeksi penuh
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Lightbox */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

