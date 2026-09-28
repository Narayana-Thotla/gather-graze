import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gather & Graze — Make hosting feel effortless",
  description: "Find trusted caterers, private chefs, service teams and restaurant feasts for every gathering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
