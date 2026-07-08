import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InnovationSection from '../components/InnovationSection';
import FeaturedProducts from '../components/FeaturedProducts';
import About from '../components/About';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <InnovationSection />
      <FeaturedProducts />
      <About />
      <Footer />
    </div>
  );
}