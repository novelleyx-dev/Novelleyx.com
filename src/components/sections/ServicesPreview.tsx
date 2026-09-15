import Link from 'next/link';
import { Film, Code2, Brain, GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import MagneticButton from '@/components/ui/MagneticButton';
import AntigravityCard from '@/components/ui/AntigravityCard';
import AuraWrapper from '@/components/ui/AuraWrapper';
import Badge from '@/components/ui/Badge';
import { serviceCategories } from '@/data/services';
import { AnimatedChart } from '@/components/animations';

const categoryIcons: Record<string, any> = { Film, Code2, Brain, GraduationCap };

export default function ServicesPreview() {
  return (
    <section className="relative bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 mt-32">
        <AnimatedChart />
      </div>
      <SectionHeading eyebrow="EXPLORE" title="OUR SERVICES" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {serviceCategories?.slice(0, 4).map((category, idx) => {
          const Icon = categoryIcons[category.icon] || Code2;
          return (
            <AuraWrapper key={idx} className="h-full rounded-2xl">
              <AntigravityCard className="p-8 flex flex-col items-start h-full" intensity={15}>
                <Icon className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-base mb-6 flex-grow">{category.intro}</p>
                <div className="flex items-center gap-4 mt-auto">
                  {category.services.length && (
                    <Badge>{category.services.length} Services</Badge>
                  )}
                  <Link
                    href={`/services#${category.slug}`}
                    className="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-sm rounded-md hover:bg-[#D4AF37]/10 transition-all"
                  >
                    EXPLORE
                  </Link>
                </div>
              </AntigravityCard>
            </AuraWrapper>
          );
        })}
      </div>
      
      <div className="mt-16 text-center flex justify-center">
        <Link href="/services">
          <MagneticButton
            magneticPull={0.15}
            className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#E8C547] transition-all glow-gold"
          >
            EXPLORE ALL SERVICES
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}

