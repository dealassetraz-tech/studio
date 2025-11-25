import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ApiDocs } from "@/components/api/api-docs";

export default function ApiPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ApiDocs />
      </main>
      <Footer />
    </div>
  );
}
