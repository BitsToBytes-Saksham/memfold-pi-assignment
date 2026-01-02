import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const serifFont = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Pi AI Clone",
  description: "A clone of the Pi.ai desktop experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serifFont.variable} font-serif bg-[#F3F0E7] text-[#0D3C26]`}
      >
        {children}
      </body>
    </html>
  );
}
