import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Privacy Policy — NOVELLEYX',
  description: 'NOVELLEYX Privacy Policy - Information on data collection, usage, and security.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#D4AF37]">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-12">
          <div>
            <SectionHeading title="1. Information Collection" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              We collect information you provide directly to us when you use our website, submit an appraisal request, or contact us. This may include your name, email address, phone number, organization details, and project requirements.
            </p>
          </div>
          
          <div>
            <SectionHeading title="2. Information Usage" className="mb-6" />
            <p className="text-gray-300 leading-relaxed mb-4">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Respond to your inquiries and requests.</li>
              <li>Generate accurate project appraisals and estimates.</li>
              <li>Communicate with you regarding our services and updates.</li>
            </ul>
          </div>
          
          <div>
            <SectionHeading title="3. Cookies and Tracking" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              We may use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </div>
          
          <div>
            <SectionHeading title="4. Third Parties" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.
            </p>
          </div>

          <div>
            <SectionHeading title="5. Data Security" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our site.
            </p>
          </div>

          <div>
            <SectionHeading title="6. Contact Us" className="mb-6" />
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at info@novelleyx.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
