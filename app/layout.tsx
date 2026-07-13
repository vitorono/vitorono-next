import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './vitorono.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'vitor ono ◎ independent visual developer',
  description:
    'Independent visual developer based in Brazil. Working worldwide. Turning brand identity into websites — direction, design, build.',
  metadataBase: new URL('https://vitorono.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://vitorono.com/',
    title: 'vitor ono ◎ independent visual developer',
    description:
      'Independent visual developer based in Brazil. Working worldwide. Turning brand identity into websites — direction, design, build.',
    images: [{ url: 'https://vitorono.com/images/graphism.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vitor ono ◎ independent visual developer',
    description:
      'Independent visual developer based in Brazil. Working worldwide. Turning brand identity into websites — direction, design, build.',
    images: ['https://vitorono.com/images/graphism.webp'],
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/images/favicon-dark.png', type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/images/webclip.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vitor Ono',
  url: 'https://vitorono.com',
  jobTitle: 'Independent Visual Developer',
  email: 'work@vitorono.com',
  description:
    'Independent visual developer based in Brazil. Working worldwide. Turning brand identity into websites — direction, design, build.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={geistMono.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Adobe Fonts (Dharma Gothic) — must load before paint */}
        <Script
          src="https://use.typekit.net/hyr2oqx.js"
          strategy="beforeInteractive"
        />
        <Script id="typekit-init" strategy="beforeInteractive">
          {`try{Typekit.load();}catch(e){}`}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="image"
          href="/images/graphism.webp"
          imageSrcSet="/images/graphism-p-500.webp 500w, /images/graphism-p-800.webp 800w, /images/graphism-p-1080.webp 1080w, /images/graphism-p-1600.webp 1600w, /images/graphism-p-2000.webp 2000w, /images/graphism-p-2600.webp 2600w, /images/graphism.webp 3840w"
          imageSizes="100vw"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
