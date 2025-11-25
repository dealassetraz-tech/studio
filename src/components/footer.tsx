import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <AssetrazLogo className="w-8 h-8 text-white" />
              <span className="text-xl font-bold">ASSETRAZ</span>
            </div>
            <p className="text-sm text-gray-400">
              India's most trusted property verification platform powered by AI and secured by blockchain.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">API Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Security</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white">API Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">User Guide</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Support</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Status Page</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <p className="text-sm text-gray-400 mb-4">
              Follow our development and contribute to the platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Github"><Github className="h-5 w-5 text-gray-400 hover:text-white" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-gray-400 hover:text-white" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2024 ASSETRAZ Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
