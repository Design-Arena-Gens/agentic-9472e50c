import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wellness AI Hub - Your Productivity & Health Companion",
  description: "AI-powered productivity and health management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
