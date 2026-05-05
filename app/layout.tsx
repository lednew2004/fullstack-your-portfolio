import { GoogleAnalytics } from "@next/third-parties/google";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${redHatDisplay.className}
          bg-linear-to-br
          from-lime-300
          via-neutral-800
          to-neutral-950
          text-zinc-300
          antialiased
          min-h-screen
        `}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-FH2XX8NDBH" />
    </html>
  );
}
