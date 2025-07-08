import Link from "next/link";
import { AuthButtons } from "@/components/AuthButtons";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hover:text-primary text-lg font-bold tracking-tight transition-colors"
        >
          Motion Playground
        </Link>
        <Link href="/portflio" className="hover:text-primary transition-colors">
          Portfolio
        </Link>
      </div>
      <AuthButtons />
    </nav>
  );
}
