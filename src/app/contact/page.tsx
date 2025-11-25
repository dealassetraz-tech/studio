import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactPage } from "@/components/contact-page";

export default function Contact() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}