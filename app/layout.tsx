import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ALPHAS POMPES',
  description: 'Solutions de pompage industriel en Algérie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
