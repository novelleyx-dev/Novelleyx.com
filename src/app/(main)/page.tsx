export const runtime = 'edge';

import Hero from '@/components/sections/Hero';
import WhatIsNovelleyx from '@/components/sections/WhatIsNovelleyx';
import FourPillars from '@/components/sections/FourPillars';
import ProblemSolve from '@/components/sections/ProblemSolve';
import ServicesPreview from '@/components/sections/ServicesPreview';
import AIPreview from '@/components/sections/AIPreview';
import HowWeWorkPreview from '@/components/sections/HowWeWorkPreview';
import WhyNovelleyxPreview from '@/components/sections/WhyNovelleyxPreview';
import TeamPreview from '@/components/sections/TeamPreview';
import SocialProof from '@/components/sections/SocialProof';
import BundlesPreview from '@/components/sections/BundlesPreview';
import Vision from '@/components/sections/Vision';
import ContactSection from '@/components/sections/ContactSection';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsNovelleyx />
      <FourPillars />
      <ProblemSolve />
      <ServicesPreview />
      <AIPreview />
      <HowWeWorkPreview />
      <WhyNovelleyxPreview />
      <TeamPreview />
      <BundlesPreview />
      <Vision />
      <ContactSection />
      <FinalCTA />
    </main>
  );
}
