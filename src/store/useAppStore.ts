import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- TYPES ---

export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'LEAD';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  industry?: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  participants: number;
  progress: number;
}

export interface Note {
  id: string;
  text: string;
  completed: boolean;
}

export interface Lead {
  id: string;
  goal: string;
  problem: string;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH';
  recommended_services: string[];
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON';
  createdAt: string;
}

// --- STORE INTERFACE ---

interface AppState {
  // Auth Slice
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;

  // UI Slice
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Data Slice - Tasks
  tasks: Task[];
  updateTaskProgress: (id: string, progress: number) => void;

  // Data Slice - Notes
  notes: Note[];
  toggleNote: (id: string) => void;
  addNote: (text: string) => void;

  // Data Slice - Leads (Kanban)
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  fetchLeads: () => Promise<void>;
}

// --- STORE IMPLEMENTATION ---

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth Slice
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      // UI Slice
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      // Data Slice - Tasks
      tasks: [
        { id: '1', title: 'Design System', time: '09:00 AM - 11:30 AM', participants: 5, progress: 75 },
        { id: '2', title: 'Marketing Sync', time: '01:00 PM - 02:00 PM', participants: 3, progress: 0 },
      ],
      updateTaskProgress: (id, progress) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, progress } : t)),
        })),

      // Data Slice - Notes
      notes: [
        { id: 'n1', text: 'Review Q3 architectural blueprints.', completed: true },
        { id: 'n2', text: 'Finalize the Neo-Brutalism design system update.', completed: false },
      ],
      toggleNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n)),
        })),
      addNote: (text) =>
        set((state) => ({
          notes: [...state.notes, { id: `n${Date.now()}`, text, completed: false }],
        })),

      // Data Slice - Leads
      leads: [],
      setLeads: (leads) => set({ leads }),
      addLead: (leadData) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...leadData,
              id: `l${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateLeadStatus: (id, status) =>
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
        })),
      fetchLeads: async () => {
        try {
          const res = await fetch('/api/leads');
          if (res.ok) {
            const data = await res.json();
            // Map excel rows to Kanban format
            const mappedLeads = data.leads.map((l: any) => ({
              id: l.LeadID || l.id,
              goal: l.Service || 'General Inquiry',
              problem: l.Message || 'No message provided',
              complexity: 'MEDIUM', // Mocking AI complexity analysis for now
              recommended_services: [l.Service || 'Consulting'],
              status: l.Status || 'NEW',
              createdAt: l.DateCreated || new Date().toISOString(),
              name: l.Name,
              email: l.Email,
              company: l.Company
            }));
            set({ leads: mappedLeads });
          }
        } catch (error) {
          console.error("Failed to fetch leads", error);
        }
      }
    }),
    {
      name: 'novelleyx-storage',
      partialize: (state) => ({ user: state.user, isSidebarOpen: state.isSidebarOpen }), // Only persist auth & UI state
    }
  )
);
