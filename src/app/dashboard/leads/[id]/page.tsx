import { ArrowLeft, User, Mail, Phone, MapPin, Clock, CheckCircle2, FileText, Send, Sparkles, AlertCircle, Edit2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function LeadDetailView({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      customer: {
        include: {
          user: true,
        },
      },
      assignedTo: true,
      requirements: {
        include: {
          recommendations: true,
          appraisals: true,
        },
      },
    },
  });

  if (!lead) {
    notFound();
  }

  // Formatting values for UI
  const name = lead.customer?.user?.name || "Unknown";
  const company = lead.customer?.companyName || lead.customer?.type || "Unknown Type";
  const email = lead.customer?.user?.email || "No Email";
  const phone = lead.customer?.phone || "No Phone";
  const location = "Not specified"; // Update if you add location to customer model
  
  // Use first requirement if available
  const mainRequirement = lead.requirements[0];
  const requirementText = mainRequirement?.details || "No requirements documented yet.";
  
  // For AI summary/recommendations, grab from recommendations
  const recommendedServices = mainRequirement?.recommendations.map(r => r.details) || [];
  const aiSummary = recommendedServices.length > 0 
    ? "AI has analyzed the requirements and generated service recommendations."
    : "No AI synthesis available for this lead yet.";

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-8 font-sans">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <Link href="/dashboard/leads" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Pipeline
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{name}</h1>
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-xs font-mono px-2 py-1 rounded uppercase tracking-wider">
              {lead.status}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-[#111111] border border-gray-700 text-gray-300 px-4 py-2 rounded-md hover:border-gray-500 hover:text-white transition-all text-sm font-medium flex items-center gap-2">
            Change Status <ChevronDown className="w-4 h-4" />
          </button>
          <button className="bg-[#111111] border border-gray-700 text-gray-300 px-4 py-2 rounded-md hover:border-gray-500 hover:text-white transition-all text-sm font-medium">
            Assign
          </button>
          <button className="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-md hover:bg-[#D4AF37]/10 transition-all text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" /> Create Appraisal
          </button>
          <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-md hover:bg-[#E8C547] transition-all text-sm font-semibold flex items-center gap-2">
            <Send className="w-4 h-4" /> Contact
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info Card */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold tracking-tight">CUSTOMER INFO</h2>
              <button className="text-gray-500 hover:text-white"><Edit2 className="w-4 h-4" /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Company / Type</div>
                  <div className="text-sm">{company}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Email</div>
                  <div className="text-sm text-[#D4AF37] hover:underline cursor-pointer">{email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Phone</div>
                  <div className="text-sm">{phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Location</div>
                  <div className="text-sm">{location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirement & AI Summary */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h2 className="text-lg font-bold tracking-tight mb-4">REQUIREMENT DETAILS</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 bg-[#111111] p-4 rounded-md border border-gray-800">
              {requirementText}
            </p>

            <div className="border border-[#D4AF37]/30 rounded-md p-5 bg-[#D4AF37]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-semibold text-[#D4AF37]">AI Synthesis</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {aiSummary}
              </p>
              
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recommended Services</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendedServices.length > 0 ? (
                    recommendedServices.map((service, idx) => (
                      <span key={idx} className="bg-black border border-[#D4AF37]/20 text-xs px-2.5 py-1 rounded text-gray-300">
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No recommendations yet.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline & Notes */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-sm text-gray-500">Lead Score</span>
                <span className="font-bold text-lg text-white">{lead.leadScore}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-sm text-gray-500">Assigned To</span>
                <span className="text-sm font-medium text-white flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-500"/> {lead.assignedTo?.name || "Unassigned"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm font-medium text-gray-300">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h2 className="text-lg font-bold tracking-tight mb-6">ACTIVITY TIMELINE</h2>
            
            <div className="relative border-l border-gray-800 ml-3 space-y-6">
              <div className="relative pl-6">
                <span className="absolute -left-2.5 top-1 bg-black border-2 border-[#D4AF37] w-5 h-5 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
                </span>
                <div className="text-sm text-gray-400 mb-1">{new Date(lead.updatedAt).toLocaleDateString()}</div>
                <div className="text-sm font-medium text-white">Last Updated</div>
                <div className="text-xs text-gray-500 mt-1">Lead status changed to {lead.status}.</div>
              </div>
              
              <div className="relative pl-6">
                <span className="absolute -left-2.5 top-1 bg-[#111111] border border-gray-600 w-5 h-5 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-gray-400" />
                </span>
                <div className="text-sm text-gray-400 mb-1">{new Date(lead.createdAt).toLocaleDateString()}</div>
                <div className="text-sm font-medium text-white">Lead Created</div>
                <div className="text-xs text-gray-500 mt-1">Added to system.</div>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h2 className="text-lg font-bold tracking-tight mb-4">INTERNAL NOTES</h2>
            <textarea 
              className="w-full bg-[#111111] border border-gray-800 rounded-md p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors min-h-[100px] mb-3 placeholder:text-gray-600"
              placeholder="Add a note about this lead..."
              defaultValue={lead.notes || ""}
            ></textarea>
            <button className="w-full bg-[#111111] border border-gray-700 text-gray-300 font-medium px-4 py-2 rounded-md hover:border-gray-500 hover:text-white transition-all text-sm">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
