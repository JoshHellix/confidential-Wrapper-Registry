import type { Metadata } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@zama-season3/shared/styles.css";
import "./globals.css";
import { AppProviders } from "./providers";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Confidential Wrapper Registry | Zama FHEVM",
  description: "Private balances. Public composability. Official ERC-20 ↔ ERC-7984 wrapper explorer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${instrumentSerif.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
