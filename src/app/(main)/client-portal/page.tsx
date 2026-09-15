import { CheckCircle2, Clock, FileText, Download, CreditCard } from "lucide-react";

const phases = [
  { id: 1, name: "Discover", status: "completed" },
  { id: 2, name: "Analyze", status: "completed" },
  { id: 3, name: "Appraise", status: "in-progress" },
  { id: 4, name: "Plan", status: "pending" },
  { id: 5, name: "Build", status: "pending" },
  { id: 6, name: "Test", status: "pending" },
  { id: 7, name: "Deliver", status: "pending" },
  { id: 8, name: "Support", status: "pending" },
];

const assets = [
  { id: 1, name: "Project_Charter_v1.pdf", type: "Document", date: "Oct 12, 2023" },
  { id: 2, name: "Architecture_Diagram.png", type: "Design", date: "Oct 15, 2023" },
  { id: 3, name: "Requirements_Spec.docx", type: "Document", date: "Oct 18, 2023" },
];

const invoices = [
  { id: "INV-001", amount: "$5,000", status: "Paid", date: "Oct 01, 2023" },
  { id: "INV-002", amount: "$15,000", status: "Pending", date: "Oct 20, 2023" },
];

export default function ClientPortalPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Overview</h1>
        <p className="text-gray-400">Track your project milestones, access deliverables, and manage billing.</p>
      </header>

      {/* Milestone Tracker */}
      <section className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-8">Phase Tracker</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#D4AF37]/20 -translate-y-1/2 z-0" />
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-0 relative z-10">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 transition-all
                  ${phase.status === 'completed' ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 
                    phase.status === 'in-progress' ? 'bg-[#111111] border-[#D4AF37] text-[#D4AF37]' : 
                    'bg-[#0A0A0A] border-gray-600 text-gray-600'}`}
                >
                  {phase.status === 'completed' ? <CheckCircle2 size={20} /> : 
                   phase.status === 'in-progress' ? <Clock size={20} /> : 
                   <span className="text-sm font-semibold">{index + 1}</span>}
                </div>
                <span className={`text-sm font-medium ${phase.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                  {phase.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Asset Repository */}
        <section className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="text-[#D4AF37]" /> Deliverables
            </h2>
          </div>
          <div className="space-y-4">
            {assets.map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-md hover:border-[#D4AF37]/40 transition-all">
                <div>
                  <p className="font-semibold text-white">{asset.name}</p>
                  <p className="text-sm text-gray-500">{asset.type} • {asset.date}</p>
                </div>
                <button className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Invoice Tracking */}
        <section className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="text-[#D4AF37]" /> Invoices
            </h2>
          </div>
          <div className="space-y-4">
            {invoices.map(invoice => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-md">
                <div>
                  <p className="font-semibold text-white">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{invoice.amount}</p>
                  <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${invoice.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
