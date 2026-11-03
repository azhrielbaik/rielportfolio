import { useEffect, useRef } from "react";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Chip } from "../ui/Chip";

export function CertificateModal({ certificate, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock body scroll when modal is mounted
  useLockBodyScroll(Boolean(certificate));

  // Focus trap and escape key handler
  useEffect(() => {
    if (!certificate) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="cert-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="cert-modal-panel card"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="cert-modal__header">
          <div className="cert-modal__badge-group">
            <Chip color="yellow" className="mono-label">
              {certificate.year}
            </Chip>
            <span className="cert-modal__category mono-label">
              {certificate.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="cert-modal__close-btn"
            onClick={onClose}
            aria-label="Tutup pratinjau sertifikat"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Certificate Large Preview */}
        <div className="cert-modal__image-wrapper">
          <img
            src={certificate.image}
            alt={`Pratinjau sertifikat ${certificate.title}`}
            width="600"
            height="420"
            className="cert-modal__img"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="cert-modal__footer">
          <h3 id="cert-modal-title" className="cert-modal__title">
            {certificate.title}
          </h3>
          <p className="cert-modal__issuer mono-label">
            Penyelenggara: {certificate.issuer}
          </p>
          <p className="cert-modal__desc">
            {certificate.description}
          </p>
          <div className="cert-modal__action">
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              <span>Tutup Pratinjau</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

