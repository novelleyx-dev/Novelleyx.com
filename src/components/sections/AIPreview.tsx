import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AIPreview() {
  const steps = [
    'Tell us your goal',
    'Answer a few intelligent questions',
    'NOVELLEYX AI analyzes your requirement',
    'Receive a solution recommendation',
    'Generate your requirement summary',
    'Send it to NOVELLEYX for appraisal'
  ];

  return (
    <section className="bg-transparent px-6 md:px-12 lg:px-24 py-20 md:py-28 lg:py-32">
      <SectionHeading eyebrow="NOVELLEYX AI" title="YOUR BUSINESS COPILOT." />
      
      <div className="mt-12 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto shadow-2xl">
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E8C547] bg-clip-text text-transparent mb-6 leading-tight uppercase">
            Don't know where to start?
          </h3>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tell NOVELLEYX AI what you want to achieve. It analyzes your goals, asks the right questions, and builds a custom capability roadmap before you even speak to our team.
          </p>
          <div>
            <Link
              href="/dashboard/ai"
              className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded-md hover:bg-[#E8C547] transition-all inline-block uppercase"
            >
              START AI ANALYSIS
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2 border-l-0 lg:border-l border-[#D4AF37]/10 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center">
          <ul className="space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-[#D4AF37] font-mono font-bold mr-4 mt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white text-base md:text-lg">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 text-center px-4">
        <p className="text-xs text-gray-600">
          NOVELLEYX AI provides preliminary recommendations based on the information provided. Final scope, pricing, feasibility and delivery commitments are confirmed through human appraisal.
        </p>
      </div>
    </section>
  );
}
