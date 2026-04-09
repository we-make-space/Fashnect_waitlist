import { Fira_Code as FontMono, Syne as FontHeading } from "next/font/google";

export const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
