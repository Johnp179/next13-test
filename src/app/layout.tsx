import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("i am the root layout");
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-center items-center p-4 uppercase gap-4 text-4xl">
          <Link href="/vault" prefetch={false}>
            Vault
          </Link>
          <Link href="/prefetch">Prefetch</Link>
          <Link href="/no-prefetch" prefetch={false}>
            No prefetch
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
