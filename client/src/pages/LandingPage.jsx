import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import InnovationSection from '../components/InnovationSection';
import FeaturedBakers from '../components/FeaturedBakers';
import About from '../components/About';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <InnovationSection />
      <FeaturedBakers />
      <About />
      <Footer />
    </div>
  );
}