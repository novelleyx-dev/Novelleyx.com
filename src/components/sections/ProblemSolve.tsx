import SectionHeading from '@/components/ui/SectionHeading';
import { XCircle, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ProblemSolve() {
  return (
    <section className="bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="OUR APPROACH" title="WE FIX FRAGMENTED SYSTEMS." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
        <Card className="bg-red-950/10 border border-red-500/20 p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="w-8 h-8 text-red-500" />
            <h3 className="text-2xl font-bold text-white">The old way</h3>
          </div>
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            You hire one agency for web, another for marketing, and try to figure out AI yourself.
          </p>
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <p className="text-red-400 font-medium">
              <span className="font-bold">The result:</span> Wasted time, miscommunication, and broken systems.
            </p>
          </div>
        </Card>

        <Card className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-2xl font-bold text-white">The NOVELLEYX way</h3>
          </div>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            A single, intelligent ecosystem.
          </p>
          <div className="p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
            <p className="text-[#D4AF37] font-medium">
              Media, IT, AI, and talent—orchestrated perfectly by one organization.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
