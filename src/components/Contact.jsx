import { useState } from "react";
import { socialsData } from "../data/socials";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { JaggedDivider } from "./ui/Dividers";
import "./Contact.css";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Nama wajib diisi.";
    }
    if (!formData.email.trim()) {
      errors.email = "Alamat email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid.";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subjek pesan wajib diisi.";
    }
    if (!formData.message.trim()) {
      errors.message = "Pesan wajib diisi.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus("loading");

    try {
      // Send to configured endpoint (AppScript / Formspree URL or simulated if local)
      const appScriptUrl = import.meta.env.VITE_CONTACT_ENDPOINT || "";
      
      if (appScriptUrl) {
        const response = await fetch(appScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error("Network error");
      } else {
        // Fallback simulated success for preview / dev
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  const resetForm = () => {
    setFormStatus("idle");
    setFormErrors({});
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-band">
        <div className="container">
          {/* Section Heading 04 */}
          <SectionHeading
            number="04"
            title="Contact"
            subtitle="Mari Berkolaborasi"
            color="mint"
            align="center"
          />

          <div className="contact-grid">
            {/* Left Column: Direct Channels / Social Cards */}
            <div className="contact-channels">
              <div className="channels-header">
                <h3 className="channels-title">Kanal Komunikasi</h3>
                <p className="channels-subtitle">
                  Terbuka untuk diskusi proyek, peluang magang (internship), atau sekadar bertukar sapa.
                </p>
              </div>

              <div className="channels-list">
                {socialsData.map((social) => {
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`channel-card card card--${social.color}`}
                      style={{ "--tilt": social.tilt }}
                      aria-label={`${social.name}: ${social.handle} (membuka ${social.href.startsWith("http") ? "tab baru" : "aplikasi"})`}
                    >
                      <div className="channel-card__icon-wrapper" aria-hidden="true">
                        <Icon name={social.icon} size={24} />
                      </div>

                      <div className="channel-card__info">
                        <span className="channel-card__name mono-label">
                          {social.name}
                        </span>
                        <span className="channel-card__handle">
                          {social.handle}
                        </span>
                      </div>

                      <span className="channel-card__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Embedded Contact Form */}
            <div className="contact-form-wrapper card">
              <div className="form-card__header">
                <span className="form-card__badge mono-label">KIRIM PESAN LANGSUNG</span>
                <h3 className="form-card__title">Formulir Pesan</h3>
              </div>

              {/* Status Announcements (aria-live) */}
              <div className="form-status-area" aria-live="polite">
                {formStatus === "success" && (
                  <div className="status-box status-box--success">
                    <span className="status-box__icon" aria-hidden="true">✓</span>
                    <div>
                      <p className="status-box__title">Pesan Berhasil Terkirim!</p>
                      <p className="status-box__desc">
                        Terima kasih telah menghubungi. Saya akan membalas ke email Anda sesegera mungkin.
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetForm} className="status-box__btn">
                      Kirim Pesan Lain
                    </Button>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="status-box status-box--error">
                    <span className="status-box__icon" aria-hidden="true">✕</span>
                    <div>
                      <p className="status-box__title">Gagal Mengirim Pesan</p>
                      <p className="status-box__desc">
                        Terjadi kendala jaringan. Anda dapat mencoba lagi atau menghubungi langsung via email.
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetForm} className="status-box__btn">
                      Coba Lagi
                    </Button>
                  </div>
                )}
              </div>

              {formStatus !== "success" && (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label mono-label">
                      NAMA LENGKAP <span className="form-required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Budi Pratama"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${formErrors.name ? "is-error" : ""}`}
                      aria-describedby={formErrors.name ? "error-name" : undefined}
                      disabled={formStatus === "loading"}
                    />
                    {formErrors.name && (
                      <span id="error-name" className="form-error-msg mono-label">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label mono-label">
                      ALAMAT EMAIL <span className="form-required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. budi@perusahaan.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${formErrors.email ? "is-error" : ""}`}
                      aria-describedby={formErrors.email ? "error-email" : undefined}
                      disabled={formStatus === "loading"}
                    />
                    {formErrors.email && (
                      <span id="error-email" className="form-error-msg mono-label">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label mono-label">
                      SUBJEK PESAN <span className="form-required">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Tawaran Magang / Diskusi Proyek"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-input ${formErrors.subject ? "is-error" : ""}`}
                      aria-describedby={formErrors.subject ? "error-subject" : undefined}
                      disabled={formStatus === "loading"}
                    />
                    {formErrors.subject && (
                      <span id="error-subject" className="form-error-msg mono-label">
                        {formErrors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label mono-label">
                      PESAN <span className="form-required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tuliskan pesan atau detail kebutuhan Anda di sini..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-textarea ${formErrors.message ? "is-error" : ""}`}
                      aria-describedby={formErrors.message ? "error-message" : undefined}
                      disabled={formStatus === "loading"}
                    />
                    {formErrors.message && (
                      <span id="error-message" className="form-error-msg mono-label">
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-action">
                    <Button
                      type="submit"
                      variant="primary"
                      className="form-submit-btn"
                      disabled={formStatus === "loading"}
                    >
                      {formStatus === "loading" ? (
                        <>
                          <span className="spinner-dots" aria-hidden="true">•••</span>
                          <span>Mengirim Pesan...</span>
                        </>
                      ) : (
                        <>
                          <span>Kirim Pesan</span>
                          <Icon name="arrow-right" size={18} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <JaggedDivider fill="var(--ink)" bg="var(--mint)" position="bottom" />
    </section>
  );
}
