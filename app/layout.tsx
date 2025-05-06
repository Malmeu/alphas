import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SeoOptimizer from './components/SeoOptimizer'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alphaspompes.com'),
  title: {
    default: 'ALPHAS POMPES | Solutions de pompage industrielles en Algérie',
    template: '%s | ALPHAS POMPES'
  },
  description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs: industrie, agriculture, eau et environnement.',
  keywords: ['pompes industrielles', 'Algérie', 'solutions de pompage', 'ALPHAS POMPES', 'équipements industriels', 'pompes centrifuges', 'pompes volumétriques'],
  authors: [{ name: 'ALPHAS POMPES' }],
  creator: 'ALPHAS POMPES',
  publisher: 'ALPHAS POMPES',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.alphaspompes.com',
    siteName: 'ALPHAS POMPES',
    title: 'ALPHAS POMPES | Solutions de pompage industrielles en Algérie',
    description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs.',
    images: [
      {
        url: '/images/alphas-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ALPHAS POMPES - Solutions de pompage industrielles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALPHAS POMPES | Solutions de pompage industrielles en Algérie',
    description: 'Votre partenaire de confiance dans le domaine des pompes industrielles en Algérie. Solutions sur mesure pour tous secteurs.',
    images: ['/images/alphas-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.alphaspompes.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="canonical" href="https://www.alphaspompes.com" />
      </head>
      <body className={inter.className}>
        <SeoOptimizer />
        <Header />
        <main className="pt-[84px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
