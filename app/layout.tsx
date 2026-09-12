import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothCursor />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}