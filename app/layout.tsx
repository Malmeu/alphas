import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ALPHAS POMPES',
  description: 'Votre partenaire de confiance dans le domaine des pompes industrielles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="pt-[84px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
