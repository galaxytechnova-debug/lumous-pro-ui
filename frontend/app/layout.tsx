import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lumousui.com'

export const metadata: Metadata = {
  title: 'LumosUI — Ship interfaces that feel alive',
  description:
    'LumosUI is a gallery of animated React + Tailwind interface blocks—glass, glow, parallax, and scroll depth you can paste into Next.js marketing pages.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  keywords: ['UI components', 'React', 'Tailwind CSS', 'Framer Motion', 'animations', 'dark mode'],
  authors: [{ name: 'LumosUI' }],
  openGraph: {
    title: 'LumosUI — Ship interfaces that feel alive',
    description:
      'LumosUI is a gallery of animated React + Tailwind interface blocks—glass, glow, parallax, and scroll depth you can paste into Next.js marketing pages.',
    url: siteUrl,
    siteName: 'LumosUI',
    type: 'website',
    images: [
      {
        url: '/lumouslogo.png',
        width: 512,
        height: 512,
        alt: 'LumosUI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LumosUI — Ship interfaces that feel alive',
    description:
      'LumosUI is a gallery of animated React + Tailwind interface blocks—glass, glow, parallax, and scroll depth you can paste into Next.js marketing pages.',
    images: ['/lumouslogo.png'],
  },
  icons: {
    icon: '/lumouslogo.png',
    shortcut: '/lumouslogo.png',
    apple: '/lumouslogo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LumosUI',
    url: siteUrl,
    logo: `${siteUrl}/lumouslogo.png`,
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LumosUI',
    url: siteUrl,
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark font-sans antialiased bg-background text-foreground`}>
        {children}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <GoogleAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
