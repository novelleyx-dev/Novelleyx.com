import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Terms & Conditions — NOVELLEYX',
  description: 'NOVELLEYX Terms and Conditions of service and usage.',
};

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#D4AF37]">Terms & Conditions</h1>
        <p className="text-gray-400 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-12">
          <div>
            <SectionHeading title="1. Acceptance of Terms" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </div>
          
          <div>
            <SectionHeading title="2. Services" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              NOVELLEYX provides technology, media, AI, education, and career services. The specific scope, deliverables, and terms of any service will be governed by a separate mutual agreement or contract specific to that project.
            </p>
          </div>
          
          <div>
            <SectionHeading title="3. Appraisal Process & Pricing" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              Any preliminary estimates or appraisals generated through our website or AI tools are non-binding and for informational purposes only. Final scope, pricing, and timelines are subject to formal review and agreement by NOVELLEYX and the client.
            </p>
          </div>
          
          <div>
            <SectionHeading title="4. Intellectual Property" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              All content included on this site, such as text, graphics, logos, images, and software, is the property of NOVELLEYX or its content suppliers and protected by intellectual property laws.
            </p>
          </div>

          <div>
            <SectionHeading title="5. Limitation of Liability" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              NOVELLEYX shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if NOVELLEYX has been advised of the possibility of such damages.
            </p>
          </div>

          <div>
            <SectionHeading title="6. Contact Information" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              If you have any questions regarding these terms, please contact us at info@novelleyx.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
