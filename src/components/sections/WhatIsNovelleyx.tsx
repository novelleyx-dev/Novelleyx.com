import { Lightbulb, Rocket, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export default function WhatIsNovelleyx() {
  return (
    <section id="about" className="bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="OUR IDENTITY" title="WHAT DOES NOVELLEYX STAND FOR?" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Card className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 hover:border-[#D4AF37]/40 transition-all">
          <Lightbulb className="w-12 h-12 text-[#D4AF37] mb-6" />
          <h3 className="text-xl md:text-2xl font-semibold text-[#D4AF37] mb-4">NOVEL</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 text-base">• New ideas.</li>
            <li className="text-gray-400 text-base">• New approaches.</li>
            <li className="text-gray-400 text-base">• New possibilities.</li>
          </ul>
        </Card>
        
        <Card className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 hover:border-[#D4AF37]/40 transition-all">
          <Rocket className="w-12 h-12 text-[#D4AF37] mb-6" />
          <h3 className="text-xl md:text-2xl font-semibold text-[#D4AF37] mb-4">NEXT</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 text-base">• Next-generation technology.</li>
            <li className="text-gray-400 text-base">• Next-generation skills.</li>
            <li className="text-gray-400 text-base">• Next-generation opportunities.</li>
          </ul>
        </Card>
        
        <Card className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 hover:border-[#D4AF37]/40 transition-all">
          <Sparkles className="w-12 h-12 text-[#D4AF37] mb-6" />
          <h3 className="text-xl md:text-2xl font-semibold text-[#D4AF37] mb-4">EXPERIENCE</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 text-base">• Turning ideas and technology into useful experiences and real-world outcomes.</li>
          </ul>
        </Card>
      </div>
      
      <p className="text-gray-400 italic text-center max-w-3xl mx-auto mt-12 text-lg">
        "NOVELLEYX represents new ideas, next-generation possibilities and meaningful experiences built around real-world needs."
      </p>
    </section>
  );
}
