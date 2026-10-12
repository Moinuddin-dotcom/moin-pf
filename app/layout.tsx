import type { Metadata } from "next";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export const metadata: Metadata = {
  title: "Md. Moinuddin Chowdhury | Full-Stack Developer",
  description:
    "Portfolio of Md. Moinuddin Chowdhury, a Full-Stack Developer building scalable, production-ready web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}