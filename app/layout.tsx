import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deal Driver | Car Shopping Intelligence",
  description: "Compare statewide new-car lease and finance promotions against manufacturer benchmarks.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
