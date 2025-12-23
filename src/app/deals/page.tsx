import DashboardLayout from "../dashboard/layout";

export default function DealsPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-headline">Deals</h1>
        <p className="text-muted-foreground">
          Manage your deals here.
        </p>
      </div>
    </DashboardLayout>
  );
}
