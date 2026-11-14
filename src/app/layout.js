import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StartupLocationPrompt from "@/components/StartupLocationPrompt";
import { SITE_CONFIG } from "@/data/properties";

// Fonts are self-hosted (Latin subset, variable weight) so builds never depend on
// fetching from Google Fonts — that fetch was failing on the deploy server.
const geistSans = localFont({
  src: "./fonts/Geist-Latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dancingScript = localFont({
  src: "./fonts/DancingScript-Latin.woff2",
  variable: "--font-dancing-script",
  weight: "400 700",
});

export const metadata = {
  title: "Property Rent Wala — Find Your Perfect Property to Rent or Buy",
  description:
    "Trusted by millions. Find verified properties to rent or buy with a hassle-free experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body>; ignore those mismatches. */}
      <body className="flex min-h-full flex-col bg-surface font-sans text-ink" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat number={SITE_CONFIG.whatsappNumber || ""} />
        <StartupLocationPrompt />
      </body>
    </html>
  );
}
