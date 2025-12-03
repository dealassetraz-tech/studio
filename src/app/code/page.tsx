import { Header } from "@/components/header";
import { CodeExplorer } from "@/components/code-explorer";

export default function CodePage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CodeExplorer />
      </main>
    </div>
  );
}
