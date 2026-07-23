import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import InnovationSection from '../components/InnovationSection';
import FeaturedBakers from '../components/FeaturedBakers';
import About from '../components/About';
import Footer from '../components/Footer';

export default function LandingPage() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedBakers />
        <InnovationSection />
        <About />
      </main>
      <Footer />
    </div>
  );
}
