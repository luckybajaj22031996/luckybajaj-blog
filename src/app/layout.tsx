import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { getSiteData } from "@/lib/posts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientLight from "@/components/AmbientLight";
import "./globals.css";

const site = getSiteData();

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Sans+Devanagari:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="grain" />
          <AmbientLight />
          <SmoothScroll />
          <Nav />
          <main>{children}</main>
          <Footer site={site} />
        </ThemeProvider>
      </body>
    </html>
  );
}
