import { BuyerSidebar } from "@/components/buyer-sidebar";

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <BuyerSidebar />
      <main className="flex-1 p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
