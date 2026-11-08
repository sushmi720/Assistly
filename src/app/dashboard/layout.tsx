import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Ambient background gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-violet-600/8 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-indigo-600/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-96 rounded-full bg-violet-800/5 blur-[80px]" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
