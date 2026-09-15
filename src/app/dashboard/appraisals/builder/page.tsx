'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save, Eye, FileOutput, Send } from 'lucide-react';

export default function AppraisalBuilder() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Appraisal Builder</h1>
          <p className="text-gray-400">APP-2026-001 • Global Tech Corp</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <Save size={16} /> Save Draft
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <Eye size={16} /> Preview
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <FileOutput size={16} /> Generate PDF
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Send size={16} /> Send
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Left Side: Customer Requirement & AI Analysis */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-10">
          <Card goldBorder>
            <h2 className="text-lg font-bold text-[#D4AF37] mb-4">Customer Requirement</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Original Request</h3>
                <p className="text-gray-200 mt-1 bg-black p-3 rounded border border-gray-800">
                  "We need to migrate our legacy on-premise infrastructure to the cloud. We want high availability, auto-scaling, and a seamless transition with minimal downtime."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400">Customer Type</h3>
                  <p className="text-gray-200 mt-1">Enterprise</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400">Budget Constraint</h3>
                  <p className="text-gray-200 mt-1">$100k - $150k</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-[#D4AF37] mb-4">NOVELLEYX AI Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400">AI Recommendation</h3>
                <p className="text-gray-200 mt-1">AWS Multi-Region Architecture with EKS and RDS Multi-AZ.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Matched Services</h3>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-1 rounded border border-[#D4AF37]/20">Cloud Deployment</span>
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-1 rounded border border-[#D4AF37]/20">IT Support</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Complexity</h3>
                <p className="text-red-400 font-medium mt-1">ENTERPRISE</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Builder */}
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 overflow-y-auto pb-10">
          <h2 className="text-lg font-bold text-white mb-6">Build Official Appraisal</h2>
          
          <div className="space-y-6">
            <Input label="Summary" name="summary" placeholder="Executive summary of the project..." defaultValue="Enterprise Cloud Migration Strategy" />
            
            <Input type="textarea" rows={3} label="Problem Statement" name="problem" placeholder="Define the problem..." defaultValue="Current legacy infrastructure limits scalability, increases maintenance costs, and presents single points of failure." />
            
            <Input type="textarea" rows={4} label="Scope of Work" name="scope" placeholder="Define the scope..." defaultValue="- Architectural audit&#10;- AWS Landing Zone setup&#10;- Database migration (DMS)&#10;- Containerization of core apps&#10;- CI/CD pipeline implementation" />
            
            <Input type="textarea" rows={3} label="Deliverables" name="deliverables" placeholder="List deliverables..." />
            
            <Input label="Recommended Services" name="services" placeholder="Select services..." defaultValue="Cloud Deployment, Cybersecurity Assessment" />
            
            <div className="grid grid-cols-2 gap-4">
              <Input label="Timeline Estimate" name="timeline" placeholder="e.g., 12-16 weeks" />
              <Input label="Indicative Price" name="price" placeholder="e.g., ₹X,XXX or Custom" />
            </div>
            
            <Input type="textarea" rows={3} label="Assumptions" name="assumptions" placeholder="Project assumptions..." />
            
            <Input type="textarea" rows={3} label="Dependencies" name="dependencies" placeholder="Customer dependencies..." />
            
            <Input type="textarea" rows={2} label="Terms & Notes" name="terms" placeholder="Internal notes or terms..." />
          </div>
        </div>
      </div>
    </div>
  );
}
