'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, XCircle, FileText, Search } from 'lucide-react';
import IDCard from '@/components/identity/IDCard';

export default function AdminIdentityPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  
  // Create form state
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    department: '',
    role: 'TEAM_MEMBER',
    joiningDate: new Date().toISOString().split('T')[0],
    employmentType: 'FULL_TIME',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetch('/api/admin/identity/employees')
      .then(r => r.json())
      .then(data => {
        if (data.employees) {
          setEmployees(data.employees);
        }
      })
      .catch(err => console.error('Failed to fetch employees:', err));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setEmployees([result.data.employee, ...employees]);
        setShowCreate(false);
        alert('Employee and Credential created successfully!');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create employee');
    }
  };

  const handleRevoke = async (credentialId: string) => {
    if (!confirm('Are you sure you want to revoke this credential? This action will invalidate the ID card immediately.')) return;
    
    try {
      const res = await fetch('/api/admin/identity/credential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REVOKE', credentialId })
      });
      const result = await res.json();
      if (result.success) {
        alert('Credential revoked successfully.');
        // Refresh local state by refetching all employees
        fetch('/api/admin/identity/employees')
          .then(r => r.json())
          .then(data => {
            if (data.employees) {
              setEmployees(data.employees);
            }
          });
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to revoke credential');
    }
  };

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Identity <span className="text-[#D4AF37]">Management</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Manage NOVELLEYX employee credentials and physical ID cards.</p>
          </div>
          <button 
            onClick={() => setShowCreate(!showCreate)}
            className="bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#E8C547] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Issue New Credential
          </button>
        </div>

        {showCreate && (
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Employee Record</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required className="bg-[#111111] border border-gray-800 p-2 text-white rounded"
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              <input type="text" placeholder="Designation" required className="bg-[#111111] border border-gray-800 p-2 text-white rounded"
                value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
              <input type="text" placeholder="Department" required className="bg-[#111111] border border-gray-800 p-2 text-white rounded"
                value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              <select className="bg-[#111111] border border-gray-800 p-2 text-white rounded"
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="CORE_TEAM">Core Team</option>
                <option value="LEADER">Leader</option>
                <option value="SPECIALIST">Specialist</option>
                <option value="TEAM_MEMBER">Team Member</option>
                <option value="INTERN">Intern</option>
              </select>
              <input type="date" required className="bg-[#111111] border border-gray-800 p-2 text-white rounded"
                value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} />
              <button type="submit" className="bg-[#D4AF37] text-black font-bold p-2 rounded col-span-1 md:col-span-2">
                Generate Secure Credential & ID Card
              </button>
            </form>
          </div>
        )}

        {/* Display newly created employee ID card for verification */}
        {employees.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recently Issued Credentials</h2>
            {employees.map(emp => {
              // Get active credential
              const activeCred = emp.credentials?.find((c: any) => c.status === 'ACTIVE');
              if (!activeCred) return null;

              return (
                <div key={emp.id} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{emp.fullName} - {emp.employeeId}</h3>
                      <p className="text-sm text-gray-400">Credential Public ID: {activeCred.credentialPublicId}</p>
                    </div>
                    <button 
                      onClick={() => handleRevoke(activeCred.credentialPublicId)}
                      className="text-red-500 hover:text-red-400 text-sm border border-red-500/20 px-3 py-1 rounded bg-red-500/10"
                    >
                      Revoke Credential
                    </button>
                  </div>
                  
                  <div className="flex justify-center bg-[#111111] p-8 rounded-lg overflow-x-auto">
                    <IDCard employee={emp} credentialPublicId={activeCred.credentialPublicId} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {employees.length === 0 && !showCreate && (
           <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-12 text-center">
             <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 opacity-50" />
             <h3 className="text-xl font-medium text-gray-300">Identity System Active</h3>
             <p className="text-gray-500 mt-2">No employee credentials found. Click "Issue New Credential" to generate a secure employee ID card.</p>
           </div>
        )}

      </div>
    </div>
  );
}
