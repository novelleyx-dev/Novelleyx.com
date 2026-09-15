import Link from 'next/link';
import { User } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { teamMembers } from '@/data/team';

export default function TeamPreview() {
  return (
    <section className="bg-[#0A0A0A] px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="OUR TEAM" title="THE PEOPLE BEHIND NOVELLEYX" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        {teamMembers?.slice(0, 4).map((member, idx) => (
          <Card key={idx} className="bg-transparent border border-[#D4AF37]/20 rounded-lg p-6 text-center hover:border-[#D4AF37]/40 transition-all">
            <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h4 className="text-white font-semibold text-lg">{member.fullName}</h4>
            <p className="text-sm text-[#D4AF37] mt-1">{member.role}</p>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Link
          href="/pillars"
          className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-md hover:bg-[#D4AF37]/10 transition-all inline-block"
        >
          MEET ALL PILLARS
        </Link>
      </div>
    </section>
  );
}

