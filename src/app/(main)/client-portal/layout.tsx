export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="border-b border-[#D4AF37]/20 bg-[#111111] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-[#D4AF37] font-bold text-xl tracking-wider">NOVELLEYX</div>
          <div className="text-sm text-gray-400">Client Portal</div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
