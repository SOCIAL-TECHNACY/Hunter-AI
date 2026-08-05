import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hunter AI — Find Buyers Before They Find You | Social Technancy",
  description:
    "Hunter AI automatically finds customers on social media who are actively looking for what you sell. Join the waitlist and get early access.",
  keywords: [
    "Hunter AI",
    "Social Technancy",
    "customer hunting",
    "AI lead generation",
    "Africa ecommerce",
    "social media leads",
  ],
  openGraph: {
    title: "Hunter AI — Find Buyers Before They Find You",
    description: "AI-powered customer discovery for African businesses. Join the waitlist now.",
    siteName: "Hunter AI by Social Technancy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased bg-brand-dark text-white">{children}</body>
    </html>
  );
}
