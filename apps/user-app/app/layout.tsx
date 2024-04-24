import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import AppBarClient from "../components/AppBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payments Wallet",
  description: "For daily transactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <AppBarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
