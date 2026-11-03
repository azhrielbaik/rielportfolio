import { profileData } from "../data/profile";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { useInView } from "../hooks/useInView";
import "./About.css";

export function About() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        {/* Section Heading 02 */}
        <SectionHeading
          number="02"
          title="About Me"
          subtitle="Kenali Lebih Dekat"
          color="pink"
        />

        <div className="about-grid">
          {/* Left Column: Narrative & ID Card & Download CV */}
          <div className={`about-info reveal ${inView ? "is-visible" : ""}`} style={{ "--i": 0 }}>
            {/* Narrative Story */}
            <div className="about-story card">
              <p className="about-story__paragraph">
                Halo! Saya <strong>{profileData.nickname}</strong>, mahasiswa Sistem Informasi di Politeknik Negeri Subang.
                Saya berfokus pada pengembangan sistem web full-stack dan desain produk digital.
                Filosofi utama saya dalam berkarya adalah{" "}
                <span className="mark">
                  {profileData.keyHighlight}
                </span>
                .
              </p>
              <p className="about-story__paragraph">
                Bagi saya, arsitektur kode yang rapi serta estetika visual yang manusiawi adalah harmoni yang wajib dihadirkan
                dalam setiap produk digital untuk menciptakan dampak nyata bagi penggunanya.
              </p>
            </div>

            {/* Profile Detail Table: Styled like a Physical ID Card */}
            <div className="about-id-card card" style={{ "--tilt": "var(--tilt-c)" }}>
              {/* ID Card Top Header Strip */}
              <div className="id-card__header">
                <span className="id-card__chip mono-label">STUDENT ID CARD</span>
                <span className="id-card__id mono-label">POLSUB // SI-2026</span>
              </div>

              {/* ID Card Rows */}
              <div className="id-card__body">
                <table className="id-card__table" aria-label="Detail Profil Mahasiswa">
                  <tbody>
                    {profileData.idCard.map((item, index) => (
                      <tr key={index} className="id-card__row">
                        <th scope="row" className="id-card__label mono-label">
                          {item.label}
                        </th>
                        <td className="id-card__value">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ID Card Barcode decoration */}
              <div className="id-card__footer" aria-hidden="true">
                <div className="id-card__barcode">
                  <span /><span /><span /><span /><span /><span /><span /><span />
                  <span /><span /><span /><span /><span /><span /><span /><span />
                </div>
                <span className="id-card__stamp mono-label">VERIFIED STUDENT</span>
              </div>
            </div>

            {/* Direct CV Download Button */}
            <div className="about-cv-action">
              <Button
                as="a"
                href={profileData.cvPath}
                download="CV_MOHAMMAD_AZHRIEL.pdf"
                variant="primary"
                className="btn-download-cv"
                aria-label="Download berkas Curriculum Vitae resmi format PDF"
              >
                <Icon name="download" size={20} className="cv-download-icon" />
                <span>Unduh Curriculum Vitae (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Right Column: 2x2 Stat Cards Grid */}
          <div className="about-stats-col">
            <div className="stats-grid">
              {profileData.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`stat-card card card--${stat.color} reveal ${inView ? "is-visible" : ""}`}
                  style={{
                    "--tilt": stat.tilt,
                    "--i": index + 1
                  }}
                >
                  <div className="stat-card__inner">
                    <span
                      className={`stat-card__number ${stat.isRotating ? "stat-card__number--rotating" : ""}`}
                    >
                      {stat.value}
                    </span>
                    <span className="stat-card__label mono-label">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative note box */}
            <div className={`about-quote-box card reveal ${inView ? "is-visible" : ""}`} style={{ "--tilt": "var(--tilt-b)", "--i": 5 }}>
              <span className="quote-box__tag mono-label">💡 FILOSOFI KERJA</span>
              <p className="quote-box__text">
                &ldquo;Kode yang baik bukan sekadar berjalan tanpa error, tapi mampu memberi kemudahan dan senyuman bagi manusia yang menggunakannya.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

