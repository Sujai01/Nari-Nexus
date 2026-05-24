import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "NARI Nexus | Greater Noida - Academic Research & Innovation Hub",
  description: "Official portal of the Nexus for Academic Research & Innovation (NARI), located at Knowledge Park III. Discover collaborative academic labs, incubation forums, workshops, and register for the flagship NARI Summit 2026.",
  keywords: ["NARI Nexus", "Academic Research Noida", "Knowledge Park III Summit", "Incubator Labs Greater Noida", "NARI Summit 2026", "Patent Commercialization"],
  authors: [{ name: "NARI Executive Council", url: "https://nari.world" }],
  metadataBase: new URL("https://narinexus.com"),
  openGraph: {
    title: "NARI Nexus | Academic & Research Innovation Forum",
    description: "Discover state-of-the-art incubation, engineering sandboxes, scholarly workshops, and the flagship NARI Summit 2026 in Greater Noida.",
    url: "https://narinexus.com",
    siteName: "NARI Nexus",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "NARI Summit 2026 Panel Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NARI Nexus | Academic Research & Innovation Hub",
    description: "Bridging the translation gap between university labs and high-scale commercial markets in Knowledge Park III.",
    images: ["https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="gradient-bg-main text-slate-900 min-h-screen flex flex-col justify-between selection:bg-blue-500/15 selection:text-blue-600 antialiased custom-scrollbar">
        <Navbar />
        <main className="flex-grow pt-[76px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
