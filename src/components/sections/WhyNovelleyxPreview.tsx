import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export default function WhyNovelleyxPreview() {
  const reasons = [
    {
      title: '01 NO TEMPLATES',
      desc: 'We build custom solutions tailored to your unique requirements.'
    },
    {
      title: '02 NO GUESSWORK',
      desc: 'We rely on data, architecture and logic.'
    },
    {
      title: '03 NO SILOS',
      desc: 'Media, IT, and AI operate together as a single cohesive unit.'
    },
    {
      title: '04 NO EXCUSES',
      desc: 'We deliver outcomes, not just outputs.'
    }
  ];

  return (
    <section id="why-novelleyx" className="bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="THE DIFFERENCE" title="WE DON'T JUST BUILD. WE ENGINEER." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
        {reasons.map((reason, idx) => (
          <Card key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37]/40 transition-all">
            <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-3">{reason.title}</h3>
            <p className="text-gray-400 text-base">{reason.desc}</p>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Link
          href="/why-novelleyx"
          className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-md hover:bg-[#D4AF37]/10 transition-all inline-block uppercase"
        >
          Discover Why
        </Link>
      </div>
    </section>
  );
}
