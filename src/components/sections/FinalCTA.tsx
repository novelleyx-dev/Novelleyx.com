import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="bg-[#050505] text-white py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight uppercase">
          Have a problem?<br/>
          Have an idea?<br/>
          Have a plan?<br/>
          <span className="text-[#D4AF37]">Let's build it.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-16">
          <Link href="/dashboard/ai">
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-bold rounded-full hover:bg-[#D4AF37]/10 transition-all uppercase tracking-wide">
              ASK NOVELLEYX AI
            </button>
          </Link>
          <Link href="/appraisal">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#E8C547] transition-all uppercase tracking-wide">
              GET AN APPRAISAL
            </button>
          </Link>
        </div>

        <div className="space-y-2 mt-8 pt-8 border-t border-[#D4AF37]/10 max-w-2xl mx-auto">
          <p className="text-gray-400 text-sm md:text-base">NOVELLEYX isn't just about providing services.</p>
          <p className="text-gray-400 text-sm md:text-base">We understand problems. We analyze requirements. We design solutions.</p>
          <p className="text-gray-400 text-sm md:text-base">We build. We test. We deliver. We support.</p>
          <p className="text-gray-400 text-sm md:text-base">And we grow together.</p>
          <p className="text-[#D4AF37] font-medium mt-6 block">For a better change. For a better India.</p>
          <p className="text-white font-bold text-xl mt-4 block">WE BUILD. WE GROW. WE EARN.</p>
        </div>
      </div>
    </section>
  );
}
