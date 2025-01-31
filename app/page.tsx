import Image from 'next/image'
import Link from 'next/link'
import DivisionalStructure from '../components/DivisionalStructure'
import Partners from '../components/Partners'
import ProductTypeNav from '../components/ProductTypeNav'
import BrandCarousel from '../components/BrandCarousel'
import { Fragment, Suspense } from 'react'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

const domains = [
  {
    name: 'Industrie',
    href: '/domaines/industrie',
    icon: '🏭',
  },
  {
    name: 'Pharmacies & Cosmetique',
    href: '/domaines/pharmacie-cosmetique',
    icon: '💊',
  },
  {
    name: 'Anti-incendie',
    href: '/domaines/anti-incendie',
    icon: '🧯',
  },
  {
    name: 'Agroalimentaire',
    href: '/domaines/agroalimentaire',
    icon: '🍃',
  },
  {
    name: 'Agriculture & Irrigation',
    href: '/domaines/agriculture-et-irrigation',
    icon: '🌾',
  },
  {
    name: 'Eau & Environnement',
    href: '/domaines/eau-et-environnement',
    icon: '💧',
  },
  {
    name: 'Mines & Carriere',
    href: '/domaines/mine-et-carriere',
    icon: '⛏️',
  },
  {
    name: 'Batiment & TP',
    href: '/domaines/batiment-et-tp',
    icon: '🏗️',
  },
  {
    name: 'Gaz & Oil',
    href: '/domaines/gaz-et-oil',
    icon: '⛽',
  },
  {
    name: 'Service Après-Vente',
    href: '/alphas-service',
    icon: '🔧',
  }
]

const products = [
  'Pompes Centrifuges',
  'Pompes Volumetriques',
  'Pompes vide fût',
  'Anti incendie',
  'Moto pompes',
  'Anti bélier',
  'Stations de relevage',
  'Stations d\'épuration',
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero section avec overlay gradient */}
      <section className="relative h-[calc(100vh-5rem)] bg-gray-900">
        {/* Background image avec overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt="ALPHAS POMPES"
            fill
            priority
            sizes="100vw"
            className="object-cover w-full h-full opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70" />
        </div>

        {/* Contenu Hero */}
        <div className="relative h-full">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 h-full flex flex-col justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Solutions de pompage innovantes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                Découvrez notre gamme complète de pompes industrielles. Des solutions sur mesure pour tous vos besoins, 
                avec une expertise technique inégalée et un service client de qualité.
              </p>
              <div className="mt-10 flex gap-x-6 justify-center">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary px-5 py-3 text-base font-medium text-white shadow-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Contactez-nous
                </Link>
                <Link
                  href="/tout-sur-alphas"
                  className="rounded-lg bg-white/10 backdrop-blur-sm px-5 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-white text-sm mb-2">Découvrir</span>
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Navigation des types de produits */}
      <Suspense fallback={<div className="h-16 bg-primary/10 animate-pulse" />}>
        <ProductTypeNav />
      </Suspense>

      {/* Section Domaines d'activité */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-medium text-primary uppercase tracking-wide">Expertise multisectorielle</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Choisissez votre domaine d'activité
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <span className="font-semibold">ALPHAS POMPES</span> est fier de ses solides racines dans la fabrication et l'ingénierie. 
              Notre usine de fabrication sophistiquée nous permet de fournir des solutions innovantes dans de multiples secteurs.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {domains.map((domain) => (
                <Link 
                  key={domain.name} 
                  href={domain.href} 
                  className="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{domain.icon}</span>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {domain.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Marques */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nos Marques Partenaires
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de marques leaders dans le domaine des pompes industrielles, 
              choisies pour leur qualité et leur fiabilité exceptionnelles.
            </p>
          </div>
        </div>
        
        <BrandCarousel />
      </section>

      {/* Structure Divisionnelle */}
      <DivisionalStructure />

      {/* Partenaires */}
      <Partners />

      {/* Bannière Devis */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl font-bold">
                Besoin d'un devis personnalisé ?
              </h2>
              <p className="mt-2 text-lg text-white/90">
                Nos experts sont à votre disposition pour étudier votre projet
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white transition-colors duration-200"
            >
              Demander un devis
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
