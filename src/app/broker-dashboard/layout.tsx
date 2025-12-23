import { BrokerSidebar } from "@/components/broker-sidebar";

export default function BrokerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <BrokerSidebar />
      <main className="flex-1 p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
