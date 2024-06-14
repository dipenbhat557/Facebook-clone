import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facebook clone",
  description: "Practicing next js with spring boot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
