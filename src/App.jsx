import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      {/* Skip to Content for Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Lewati ke konten
      </a>

      {/* Floating Header & Navigation */}
      <Header />

      {/* Main Content Landmark */}
      <main id="main-content">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Footer & Instagram Highlights */}
      <Footer />
    </>
  );
}

export default App;
