import { QueryProvider } from "@/components";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Clanflare",
  description:
    "Streamline, Secure, and ScaleYour Discord Community,with Clanflare",
};

function getTheme() {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie ? themeCookie.value : "system";
  return theme;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme();
  return (
    <html
      lang="en"
      style={{ colorScheme: theme }}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
