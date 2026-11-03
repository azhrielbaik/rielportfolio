# Design System: Mohammad Azhriel Portfolio

**Pendamping:** [`prd.md`](./prd.md) v2.0.0  
**Gaya:** Playful Neo-Brutalism  
**Stack:** React + Vite + CSS native (tanpa library UI / animasi)  
**Tagline desain:** *Tegas di struktur, luwes di detail.*

---

## 1. Arah Desain

Neo-Brutalism pada dasarnya adalah border tebal, bayangan keras tanpa blur, dan warna solid. Masalahnya, kalau semua aturan itu diterapkan seragam, hasilnya terasa **kaku**: semua kotak lurus, sejajar, dan sama persis. Desain ini mempertahankan karakter tegasnya, lalu menambahkan **gerak, kemiringan, dan variasi** agar terasa seperti tumpukan stiker dan kartu fisik di atas meja.

### 1.1 Diagnosis: kenapa terasa kaku dan solusinya

| Penyebab Kaku | Solusi di Desain Ini |
| :--- | :--- |
| Semua elemen 0° dan rata grid | Kemiringan kecil bergantian (±1–3°), elemen saling menimpa, stiker yang keluar dari bingkai |
| Border dan shadow identik di mana-mana | 3 level elevasi (flat, raised, floating) |
| Satu aksen warna + hitam | Palet multi-warna; tiap section punya warna dominan sendiri |
| Tanpa animasi atau animasi linear | Easing *spring*, efek tekan seperti tombol fisik, reveal yang "mendarat" |
| Semua sudut siku, atau semua sama | Radius campuran: siku, rounded, pill, dan bentuk blob |
| Latar polos datar | Dot-grid halus, band berwarna, pembatas section bergerigi / bergelombang |
| Tipografi seragam | Kontras ukuran ekstrem, highlight ala stabilo, label monospace |
| Spasi sama rata | Ritme spasi lega dan rapat bergantian, whitespace besar di sekitar momen utama |

### 1.2 Prinsip

1. **Struktur tegas, detail luwes.** Border, shadow, dan grid tetap keras; yang dilonggarkan adalah posisi, sudut, dan gerak.
2. **Terasa fisik.** Kartu bisa terangkat saat hover dan "tertekan" saat diklik, seperti tombol sungguhan.
3. **Satu momen "wow" per section.** Jangan menganimasikan semuanya; pilih satu elemen unggulan di tiap section.
4. **Warna punya fungsi.** Warna menandai kategori atau section, bukan sekadar hiasan.
5. **Dekorasi tidak boleh mengalahkan konten.** Semua dekorasi `aria-hidden`, dan mengecil atau hilang di mobile.

---

## 2. Design Tokens

### 2.1 Warna

| Token | Hex | Penggunaan |
| :--- | :--- | :--- |
| `--ink` | `#111111` | Teks, border, shadow, section gelap |
| `--paper` | `#FFF6DC` | Latar utama (off-white hangat) |
| `--paper-2` | `#FFEFC2` | Latar alternatif, band section |
| `--white` | `#FFFFFF` | Input, bingkai foto, polaroid |
| `--yellow` | `#FFD93D` | Aksen utama, highlight, CTA primer |
| `--pink` | `#FF8FB8` | Aksen sekunder, hover, badge |
| `--blue` | `#7CB7FF` | Section Portfolio, tag teknologi |
| `--mint` | `#7DE3A8` | Section Contact, status sukses |
| `--orange` | `#FFA94D` | Aksen hangat, peringatan ringan |
| `--lilac` | `#C4A8FF` | Aksen UI/UX, variasi kartu |

**Aturan warna**
- Teks di atas semua warna aksen selalu `--ink`. Teks putih tidak dipakai di atas warna terang.
- Perkiraan kontras `--ink` di atas aksen: kuning ±14:1, pink ±9:1, biru ±9:1. Tetap verifikasi ulang dengan alat kontras sebelum rilis untuk memenuhi target PRD (> 7:1).
- Peta warna per section:

| Section | Warna Dominan | Pendukung |
| :--- | :--- | :--- |
| Hero | `--paper` + `--yellow` | `--pink`, `--ink` (marquee) |
| About | `--paper` | Kartu stat: yellow, pink, blue, mint |
| Portfolio | `--blue` (band latar) | Tag bergantian multi-warna |
| Contact | `--mint` (band latar) | Kartu sosial multi-warna |
| Footer | `--ink` | Teks `--yellow`, shadow `--pink` |

### 2.2 Tipografi

| Peran | Font | Weight | Catatan |
| :--- | :--- | :--- | :--- |
| Display / Heading | **Bricolage Grotesque** | 700–800 | Bentuk huruf berkarakter dan sedikit "aneh", cocok melunakkan kesan kaku |
| Body | **DM Sans** | 400, 500, 700 | Mudah dibaca untuk paragraf |
| Label / Mono | **Space Mono** | 400, 700 | Chip, label form, nomor section, caption |

Pasang lewat paket npm agar di-*self-host* (tanpa request ke Google Fonts): `@fontsource-variable/bricolage-grotesque`, `@fontsource/dm-sans`, `@fontsource/space-mono`.

| Token | Nilai | Dipakai untuk |
| :--- | :--- | :--- |
| `--fs-hero` | `clamp(3rem, 9vw, 7.5rem)` | Nama di Hero |
| `--fs-h2` | `clamp(2.25rem, 6vw, 4.5rem)` | Judul section |
| `--fs-h3` | `clamp(1.25rem, 2.5vw, 1.75rem)` | Judul kartu |
| `--fs-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Paragraf |
| `--fs-label` | `0.8125rem` | Label mono (uppercase, letter-spacing `0.06em`) |

Heading: `line-height: 0.95`, `letter-spacing: -0.03em`. Body: `line-height: 1.6`.

### 2.3 Border, Radius, dan Shadow

```css
--bw: 3px;
--border: var(--bw) solid var(--ink);

--r-sm: 8px;
--r-md: 16px;
--r-pill: 999px;
--r-blob: 255px 18px 225px 18px / 18px 225px 18px 255px; /* bingkai ala gambar tangan */
```

| Level Elevasi | Shadow | Dipakai untuk |
| :--- | :--- | :--- |
| 0 (Flat) | tanpa shadow, border saja | Tabel, input, wrapper |
| 1 (Raised) | `4px 4px 0 var(--ink)` | Kartu, chip, tombol |
| 2 (Floating) | `8px 8px 0 var(--ink)` | Avatar Hero, modal, kartu fokus |

Variasi: sesekali shadow diberi warna (`--pink`, `--blue`) sebagai aksen, mis. input saat fokus atau kartu yang di-hover. Border tetap `--ink`.

### 2.4 Kemiringan dan Spasi

```css
--tilt-a: -2deg;
--tilt-b: 1.5deg;
--tilt-c: -1deg;
--tilt-d: 2.5deg;

--space-1: 4px;  --space-2: 8px;  --space-3: 16px;
--space-4: 24px; --space-5: 40px; --space-6: 72px; --space-7: 120px;
```

Kemiringan dipasang lewat custom property `--tilt` per elemen agar mudah di-reset saat hover atau di mobile.

### 2.5 Motion Token

```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* membal halus */
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
--dur-fast: 120ms;
--dur-base: 220ms;
--dur-slow: 480ms;
```

### 2.6 `tokens.css` Lengkap

```css
:root {
  /* Color */
  --ink: #111111;
  --paper: #FFF6DC;
  --paper-2: #FFEFC2;
  --white: #FFFFFF;
  --yellow: #FFD93D;
  --pink: #FF8FB8;
  --blue: #7CB7FF;
  --mint: #7DE3A8;
  --orange: #FFA94D;
  --lilac: #C4A8FF;

  /* Border & radius */
  --bw: 3px;
  --border: var(--bw) solid var(--ink);
  --r-sm: 8px;
  --r-md: 16px;
  --r-pill: 999px;
  --r-blob: 255px 18px 225px 18px / 18px 225px 18px 255px;

  /* Shadow */
  --shadow-1: 4px 4px 0 var(--ink);
  --shadow-2: 8px 8px 0 var(--ink);

  /* Tilt */
  --tilt-a: -2deg;
  --tilt-b: 1.5deg;
  --tilt-c: -1deg;
  --tilt-d: 2.5deg;

  /* Motion */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 120ms;
  --dur-base: 220ms;
  --dur-slow: 480ms;

  /* Font */
  --font-display: "Bricolage Grotesque Variable", "Arial Black", sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;
}

@media (max-width: 768px) {
  :root {
    --shadow-1: 3px 3px 0 var(--ink);
    --shadow-2: 5px 5px 0 var(--ink);
    --tilt-a: -1deg;
    --tilt-b: 0.75deg;
    --tilt-c: -0.5deg;
    --tilt-d: 1deg;
  }
}
```

---

## 3. Pola Dasar (Utilities)

### 3.1 Kartu fisik (hover terangkat, klik tertekan)

```css
.card {
  border: var(--border);
  border-radius: var(--r-md);
  background: var(--white);
  box-shadow: var(--shadow-1);
  transform: rotate(var(--tilt, 0deg));
  transition:
    transform var(--dur-base) var(--ease-spring),
    box-shadow var(--dur-base) var(--ease-spring);
}
.card:hover {
  transform: rotate(0deg) translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--ink);
}
.card:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--ink);
}
```

### 3.2 Highlight ala stabilo

```css
.mark {
  background: linear-gradient(transparent 55%, var(--yellow) 55% 92%, transparent 92%);
  padding: 0 0.1em;
}
```

### 3.3 Latar dot-grid

```css
body {
  background-color: var(--paper);
  background-image: radial-gradient(rgba(17, 17, 17, 0.18) 1px, transparent 1.2px);
  background-size: 22px 22px;
}
```

### 3.4 Scroll reveal ("mendarat")

```css
.reveal {
  opacity: 0;
  transform: translateY(28px) rotate(calc(var(--tilt, 0deg) * 2));
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-spring);
  transition-delay: calc(var(--i, 0) * 70ms); /* stagger lewat style={{ '--i': index }} */
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) rotate(var(--tilt, 0deg));
}
```

### 3.5 Tombol

```css
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  min-height: 44px; padding: 0.75rem 1.5rem;
  font: 700 1rem var(--font-body);
  color: var(--ink); background: var(--yellow);
  border: var(--border); border-radius: var(--r-pill);
  box-shadow: var(--shadow-1); cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-spring),
              box-shadow var(--dur-fast) var(--ease-spring),
              background var(--dur-fast);
}
.btn:hover  { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); background: var(--pink); }
.btn:active { transform: translate(3px, 3px);   box-shadow: 1px 1px 0 var(--ink); }
.btn--ghost { background: var(--white); }
```

---

## 4. Spesifikasi Komponen

### 4.1 Header (`Header.jsx`)
- **Bentuk:** bar mengambang (bukan menempel penuh di tepi), `max-width: 1100px`, `top: 12px`, border + shadow level 1, radius pill, latar `--paper`.
- **Brand:** `My Portfolio.` dengan titik berwarna `--pink`; titik membal kecil saat hover.
- **Link:** hover memunculkan highlight kuning yang "tergeser masuk" dari kiri; link aktif (scroll spy) berupa pill kuning dengan border.
- **Hamburger (≤ 768px):** tiga garis berubah jadi X dengan transisi; drawer turun dengan easing spring, item menu muncul bertahap (stagger 60ms). Tutup otomatis saat link diklik. `aria-label` dan `aria-expanded` wajib.

### 4.2 Hero (`Hero.jsx`)
- **Layout:** asimetris 7 : 5 di desktop (teks kiri, avatar kanan); satu kolom di mobile dengan avatar di atas.
- **Chip lokasi** `📍 Subang, Jawa Barat`: pill dengan kemiringan `--tilt-a`.
- **Nama:** ukuran `--fs-hero`, satu kata diberi `.mark` kuning, kata lain dengan *hard text-shadow* `4px 4px 0 var(--pink)`.
- **CTA:** `Lihat Portfolio →` (kuning, primer) dan `Hubungi Saya` (putih, ghost). Panah bergeser 4px ke kanan saat hover.
- **Avatar (momen wow Hero):**
  - Foto dalam bingkai border 4px, miring `--tilt-d`, radius `--r-blob` atau `--r-md`.
  - Di belakang foto: blok kuning dan lingkaran pink yang bergeser dan sedikit berputar (offset berbeda dari foto), menciptakan kedalaman berlapis.
  - **Status badge** `🟢 Open to Internship`: stiker bulat memanjang, miring `-6deg`, menimpa sudut bingkai. Titik hijau berdenyut (animasi pulse).
  - Bentuk dekoratif melayang (bintang, squiggle, lingkaran) dengan animasi `float` 6 detik, delay berbeda tiap bentuk.
- **Marquee ticker:** band `--ink` miring `-1.5deg`, melebar melewati tepi layar (bungkus dengan `overflow: hidden` agar tidak muncul scroll horizontal). Teks `--paper` dengan simbol `★` bergantian kuning dan pink. Animasi `linear infinite` ±28 detik, **berhenti saat hover**. Konten diduplikasi untuk loop mulus; salinan kedua `aria-hidden`.

### 4.3 Section Heading (komponen `SectionHeading`)
- Nomor (`02`, `03`, `04`) dalam kotak berborder, berwarna sesuai section, miring `-4deg`, font mono.
- Judul `--fs-h2` dengan garis squiggle SVG di bawahnya.
- Antar section berbeda warna, pakai pembatas **bergerigi atau bergelombang** (SVG, `aria-hidden`) alih-alih garis lurus.

### 4.4 About (`About.jsx`)
- **Narasi** di kiri, dengan satu frasa kunci di-*highlight* `.mark`.
- **Stat cards (2×2):** Semester 4, Proyek 4+, Sertifikat 3+, Semangat ∞. Warna berbeda (yellow, pink, blue, mint), kemiringan bergantian, angka besar `font-display`. Angka menghitung naik saat masuk viewport (opsional). Simbol `∞` berputar pelan.
- **Profile table:** tampil seperti **kartu ID**. Strip judul berwarna di atas, baris dipisah garis putus-putus, label mono kecil, nilai tebal.
- **Tombol Download CV:** primer besar dengan ikon unduh; ikon bergerak turun-naik saat hover.

### 4.5 Portfolio (`Portfolio/`)
- **Latar section:** band `--blue`.
- **Tabs (`role="tablist"`):** berbentuk tombol stiker. Tab tidak aktif: putih, miring bergantian. Tab aktif: berwarna, lurus, terangkat 4px dengan shadow level 1. Dukung navigasi panah kiri/kanan. Bila tidak muat di mobile, bisa digeser horizontal.
- **Projects (kartu proyek):**
  - Grid 2 kolom desktop; kartu genap turun 24px untuk efek tangga (masonry ringan), kemiringan bergantian `-1deg` / `+1deg`.
  - Thumbnail rasio 16:10, border bawah tebal, `loading="lazy"`.
  - Tag teknologi: chip pill mono dengan warna bergilir (yellow, pink, mint, lilac).
  - Tautan GitHub / Figma / YouTube berupa tombol kecil dengan ikon.
- **Certificates:**
  - Gaya **polaroid**: bingkai putih dengan bagian bawah tebal untuk caption, potongan "selotip" (pseudo-element kuning semi-transparan, miring) di atasnya.
  - Hover: luruskan dan angkat. Klik: buka modal.
  - **Modal:** backdrop `--ink` 70%, panel muncul dengan scale `0.9 → 1` (spring). Tutup lewat tombol close, klik area luar, dan tombol `Esc`. Scroll background dikunci, fokus dijebak di dalam modal, dan fokus dikembalikan ke kartu pemicu saat ditutup.
- **Skills:**
  - Dikelompokkan: Frontend Development, Backend Development, UI/UX Design; tiap kelompok punya warna sendiri.
  - Progress bar tebal (tinggi 28px) dengan border, isi bergaris diagonal. Isi bar tumbuh dari 0 saat tab aktif (±900ms, `--ease-out`), stagger 80ms per bar. Angka persen tampil dalam stiker kecil di ujung bar. Gunakan `role="progressbar"` dengan `aria-valuenow`.

### 4.6 Contact (`Contact.jsx`)
- **Latar section:** band `--mint`.
- **Kartu sosial (Email, GitHub, LinkedIn, Instagram):** tiap kartu berwarna beda, ikon SVG dalam lingkaran berborder, nama + handle. Hover: animasi *wobble* singkat (rotate -2° → 2° → 0°) dan terangkat.
- **Form:**
  - Label mono uppercase di atas input; input putih, border 3px, radius `--r-sm`, tinggi min 48px.
  - **Fokus:** shadow berubah jadi `5px 5px 0 var(--blue)` dan input naik 2px.
  - **Error:** shadow `--pink` + pesan error inline (`aria-describedby`).
  - **Tombol kirim:** 4 state. *Idle* (kuning), *Loading* ("Mengirim..." dengan titik beranimasi, tombol dinonaktifkan), *Sukses* (kartu mint "Terkirim ✓" dengan pop-in), *Gagal* (kartu pink dengan opsi coba lagi). Status diumumkan lewat `aria-live="polite"`.

### 4.7 Footer (`Footer.jsx`)
- Latar `--ink` dengan tepi atas bergerigi.
- **Instagram tiles:** 4–6 kotak berborder `--paper`, kemiringan bergantian. Hover: overlay `--pink` 85% dengan ikon ▶ di lingkaran yang muncul membal (scale spring).
- **`RIEL.`** raksasa (`clamp(5rem, 22vw, 18rem)`), warna `--yellow`, hard shadow `--pink`, sebagai penutup visual.
- Hak cipta © 2026 Mohammad Azhriel Muari Fullah dalam font mono kecil.

---

## 5. Motion dan Interaksi

| Interaksi | Perilaku | Durasi / Easing |
| :--- | :--- | :--- |
| Hover kartu / tombol | Terangkat, shadow membesar, kemiringan lurus | `--dur-base` / spring |
| Klik (active) | Bergeser ke arah shadow, shadow mengecil (efek tertekan) | `--dur-fast` |
| Scroll reveal | Fade + naik + miring lalu "mendarat" | `--dur-slow`, stagger 70ms |
| Ganti tab | Panel lama fade out cepat, panel baru naik 12px + fade in | 200ms / `--ease-out` |
| Skill bar | Tumbuh dari 0 saat tab aktif | 900ms / `--ease-out` |
| Modal | Backdrop fade, panel scale 0.9 → 1 | `--dur-base` / spring |
| Marquee | Geser horizontal tanpa henti, jeda saat hover | 28s linear |
| Bentuk melayang | Naik-turun + rotasi kecil bergantian | 6s ease-in-out alternate |

**Aturan performa:** animasikan terutama `transform` dan `opacity`. Transisi `box-shadow` boleh dipakai karena elemennya kecil, tetapi hindari menganimasikan banyak elemen besar sekaligus. Gunakan `will-change` hanya pada marquee.

**`prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: rotate(var(--tilt, 0deg)); }
}
```

---

## 6. Elemen Dekoratif

- **Bentuk:** bintang 4/5 titik, squiggle, lingkaran, tanda plus, asterisk. Dibuat sebagai komponen SVG inline, warna dari token.
- **Selotip dan stiker:** pseudo-element atau SVG kecil, selalu `aria-hidden="true"` dan `pointer-events: none`.
- **Tekstur:** cukup dot-grid pada body. Hindari menumpuk tekstur lain agar tetap bersih.
- **Batasan:** maksimal 3–4 elemen dekoratif terlihat per layar. Di mobile, sisakan 1–2.
- **Foto dan gambar:** semua berborder, boleh sedikit miring; format WebP, lebar ≤ 800px, `loading="lazy"` (kecuali avatar Hero yang dimuat langsung), atribut `width`/`height` diisi untuk mencegah layout shift.

---

## 7. Responsif

| Breakpoint | Rentang | Penyesuaian |
| :--- | :--- | :--- |
| Desktop | > 1024px | Layout asimetris penuh, efek tangga pada grid proyek, semua dekorasi aktif |
| Tablet | 768–1023px | Grid 2 kolom dipertahankan, dekorasi dikurangi, marquee lebih kecil |
| Mobile | < 768px | Satu kolom, hamburger menu, shadow dan tilt dikecilkan (lihat `tokens.css`), efek tangga dimatikan, dekorasi tersisa 1–2 |

Target sentuh minimal **44×44px**. Kartu hover-only tidak boleh menyembunyikan informasi penting di perangkat sentuh.

---

## 8. Aksesibilitas

- **Kontras:** teks `--ink` di atas seluruh warna latar pada palet; tidak ada teks putih di atas warna terang.
- **Fokus keyboard:**

```css
:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 3px;
  box-shadow: 0 0 0 7px var(--yellow);
}
```

- **Semantik:** `lang="id"`, satu `<h1>` (nama di Hero), heading berurutan, landmark `header` / `main` / `footer`, tautan lompat "Lewati ke konten".
- **Tabs:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, navigasi panah.
- **Modal:** `role="dialog"`, `aria-modal="true"`, fokus terjebak di dalam, `Esc` menutup.
- **Gerak:** hormati `prefers-reduced-motion`. Tidak ada konten berkedip lebih dari 3 kali per detik.
- **Dekorasi:** `aria-hidden="true"`. Gambar bermakna wajib punya `alt`.
- **Tautan eksternal:** `target="_blank"` dengan `rel="noopener noreferrer"`, dan beri petunjuk teks tersembunyi "(membuka tab baru)" bila perlu.

---

## 9. Do dan Don't

| Do | Don't |
| :--- | :--- |
| Variasikan kemiringan, warna, dan radius antar elemen | Memiringkan semua elemen dengan sudut yang sama |
| Pakai spring easing untuk hover dan reveal | Pakai `linear` atau durasi > 600ms untuk interaksi UI |
| Beri satu momen unggulan per section | Menganimasikan semua elemen sekaligus |
| Pertahankan border `--ink` 3px di semua elemen interaktif | Memakai shadow blur atau gradien halus (merusak karakter brutalist) |
| Gunakan warna sebagai penanda kategori | Menambah warna di luar palet |
| Beri ruang kosong yang lega di sekitar judul | Memenuhi layar dengan dekorasi |
| Tes di mobile dan dengan reduced motion | Mengandalkan hover untuk informasi penting |

---

## 10. Catatan Implementasi React

### 10.1 Arsitektur CSS

```text
src/styles/
├─ tokens.css       # semua custom properties (Section 2.6)
├─ base.css         # reset, tipografi, body, :focus-visible, reduced-motion
└─ utilities.css    # .card, .btn, .chip, .mark, .reveal
```

CSS per komponen berdampingan dengan file `.jsx` (mis. `Hero.css`) dan hanya memakai token, tanpa nilai warna hardcode.

### 10.2 Hook `useInView` (untuk `.reveal`)

```jsx
import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect(); // reveal hanya sekali
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
```

Pemakaian:

```jsx
const [ref, inView] = useInView();
<article ref={ref} className={`card reveal ${inView ? "is-visible" : ""}`}
         style={{ "--tilt": "var(--tilt-a)", "--i": index }}>
```

### 10.3 Hook `useScrollSpy` (untuk Header)

```jsx
import { useEffect, useState } from "react";

export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: `-${offset}px 0px -55% 0px` }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids, offset]);

  return active;
}
```

### 10.4 Komponen `Button`

```jsx
export function Button({ as: Tag = "button", variant = "primary", className = "", children, ...props }) {
  const cls = `btn ${variant === "ghost" ? "btn--ghost" : ""} ${className}`.trim();
  return <Tag className={cls} {...props}>{children}</Tag>;
}

// <Button as="a" href="#portfolio">Lihat Portfolio →</Button>
```

---

## 11. Checklist QA Visual

- [ ] Tidak ada dua kartu bersebelahan dengan kemiringan dan warna yang sama persis
- [ ] Semua elemen interaktif punya state hover, active, dan focus-visible
- [ ] Tidak ada scroll horizontal di semua breakpoint (cek marquee dan elemen miring)
- [ ] Layout stabil (CLS rendah): gambar punya `width` dan `height`
- [ ] `prefers-reduced-motion` dites: tidak ada animasi mengganggu
- [ ] Fokus keyboard terlihat jelas, modal bisa ditutup dengan `Esc`
- [ ] Kontras teks dicek ulang pada setiap warna latar
- [ ] Lighthouse > 90 (Performance, Accessibility, Best Practices, SEO)
