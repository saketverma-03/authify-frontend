import Link from "next/link";

import { NavbarAvatar, ThemeToggle } from "@/components";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[10] flex w-full items-center border-b bg-card  px-4 py-2 backdrop-blur-md ">
      <Link href="/dashboard" className="mr-auto">
        Clanflare
      </Link>

      <ul className="flex list-none space-x-4">
        <ThemeToggle />
        <NavbarAvatar />
      </ul>
    </nav>
  );
}
