import { DashboardNav } from '@/components/dashboard/nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardNav />
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
} 