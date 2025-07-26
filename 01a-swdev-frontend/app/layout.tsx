import type { Metadata } from "next";

import "./globals.css";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
export const metadata: Metadata = {
  title: 'Unit Logbook',
  description: 'A digital field logbook built for a frontend challenge.',
  keywords: ['Unit Logbook', 'Next.js', 'GitHub Pages', 'Military App'],
  authors: [{ name: 'Miikatu' }],
  openGraph: {
    title: 'Unit Logbook',
    description: 'Digital log entries for platoon field ops.',
    url: 'https://miika.github.io/test-ictconscript-admission/',
    images: ['https://miika.github.io/test-ictconscript-admission/preview.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Logbook',
    description: 'Real-time field logging tool for teams.',
    images: ['https://miika.github.io/test-ictconscript-admission/preview.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-geist font-geist-mono  antialiased"
      >
        {children}
      </body>
    </html>
  );
}
