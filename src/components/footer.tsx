import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#3C3C8E' }} className="text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <AssetrazLogo isDark={true} />
              <span className="text-xl font-bold">ASSETRAZ UK</span>
            </Link>
            <p className="text-sm text-purple-200">
              UK's most trusted property verification platform powered by AI.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-purple-200 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-purple-200 hover:text-white">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/api" className="text-purple-200 hover:text-white">
                  API Documentation
                </Link>
              </li>
               <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Status Page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <p className="text-sm text-purple-200 mb-4">
              Follow our development and contribute to the platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-purple-200 hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-purple-200">
          <p>© 2024 ASSETRAZ Technologies. All rights reserved. | Property Verification Platform</p>
        </div>
      </div>
    </footer>
  );
}
