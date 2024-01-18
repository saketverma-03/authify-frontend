import { NavbarAvatar, ThemeToggle } from "@/components";
import ProtectedRoute from "@/components/wrappers/ProtectedRote";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add new services",
  description: "Add new services to your dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col items-center">
      {/* NAV section */}
      <ProtectedRoute>
        <nav className="sticky top-0 z-[10] flex w-full items-center border-b bg-card  px-4 py-2 backdrop-blur-md ">
          <Link href="/dashboard" className="mr-auto">
            Clanflare
          </Link>

          <ul className="flex list-none space-x-4">
            <ThemeToggle />
            <NavbarAvatar />
          </ul>
        </nav>
        <div className="h-full w-full max-w-[90rem]  p-4 text-sm">
          {children}
        </div>
      </ProtectedRoute>
    </main>
  );
}
