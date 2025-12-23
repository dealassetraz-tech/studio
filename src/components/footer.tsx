import Link from "next/link";
import { DealLockLogo } from "./deallock-logo";

const footerLinks = {
    platform: [
        { href: "#how-it-works", label: "How it Works" },
        { href: "#features", label: "Features" },
        { href: "#", label: "Pricing" },
        { href: "#", label: "Sign In" },
    ],
    company: [
        { href: "#", label: "About Us" },
        { href: "#", label: "Contact" },
        { href: "#", label: "Careers" },
    ],
    legal: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
    ],
};

export function Footer() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const href = e.currentTarget.href;
        if (href.includes("#")) {
            e.preventDefault();
            const targetId = href.replace(/.*#/, "");
            if (targetId) {
                const elem = document.getElementById(targetId);
                elem?.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    };
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <DealLockLogo />
              <span className="text-xl font-bold text-foreground">DealLock</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Secure Real Estate Deal Management
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm" onClick={handleScroll}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm" onClick={handleScroll}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm" onClick={handleScroll}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DealLock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
