import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { bundles } from '@/data/bundles';

export default function BundlesPreview() {
  return (
    <section className="bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="CURATED SOLUTIONS" title="ONE GOAL. ONE TEAM. ONE SOLUTION." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {bundles?.slice(0, 3).map((bundle, idx) => (
          <Card key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37]/40 transition-all flex flex-col items-start h-full">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{bundle.name}</h3>
            <p className="text-sm text-[#D4AF37] mb-6">
              {bundle.targetAudience?.join(', ')}
            </p>
            <p className="text-gray-400 text-sm mb-8 flex-grow">
              {bundle.includes?.length || 0} services included
            </p>
            <Link
              href={`/bundles#${bundle.slug}`}
              className="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-sm rounded-md hover:bg-[#D4AF37]/10 transition-all mt-auto"
            >
              VIEW BUNDLE
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Link
          href="/bundles"
          className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#E8C547] transition-all inline-block"
        >
          EXPLORE ALL BUNDLES
        </Link>
      </div>
    </section>
  );
}

