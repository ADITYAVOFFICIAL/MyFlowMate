import Hero from '../components/hero';
import Features from '../components/features';
import CTA from '../components/cta';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}