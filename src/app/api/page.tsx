import { Header } from "@/components/header";
import { ApiDocumentation } from "@/components/api-documentation";

export default function ApiPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ApiDocumentation />
      </main>
    </div>
  );
}
