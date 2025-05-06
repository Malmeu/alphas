'use client';

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import Partners from '../components/Partners'
import { Fragment, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

const BrandCarousel = dynamic(() => import('../components/BrandCarousel'), { 
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
});

const DivisionalStructure = dynamic(() => import('../components/DivisionalStructure'), { 
  ssr: false 
});

const ProductTypeNav = dynamic(
  () => import('../components/ProductTypeNav'),
  { ssr: false }
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const domains = [
  {
    name: 'Industrie',
    href: '/domaines/industrie',
    icon: '/icons/industrie.png',
  },
  {
    name: 'Pharmacies & Cosmetique',
    href: '/domaines/pharmacie-cosmetique',
    icon: '/icons/pharmacie-cosmetique.png',
  },
  {
    name: 'Anti-incendie',
    href: '/domaines/anti-incendie',
    icon: '/icons/incendie.png',
  },
  {
    name: 'Agroalimentaire',
    href: '/domaines/agroalimentaire',
    icon: '/icons/agro.png',
  },
  {
    name: 'Agriculture & Irrigation',
    href: '/domaines/agriculture-et-irrigation',
    icon: '/icons/erigation.png',
  },
  {
    name: 'Eau & Environnement',
    href: '/domaines/eau-et-environnement',
    icon: '/icons/environement.png',
  },
  {
    name: 'Mines & Carriere',
    href: '/domaines/mine-et-carriere',
    icon: '/icons/mine.png',
  },
  {
    name: 'Batiment & TP',
    href: '/domaines/batiment-et-tp',
    icon: '/icons/batiment.png',
  },
  {
    name: 'Gaz & Oil',
    href: '/domaines/gaz-et-oil',
    icon: '/icons/gaz_oil.png',
  },
  {
    name: 'Service Après-Vente',
    href: '/alphas-service',
    icon: '/icons/sav.png',
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col" suppressHydrationWarning>
      {isMounted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Hero section avec overlay gradient */}
          <section className="relative h-[calc(100vh-4rem)] bg-gray-900">
            {/* Background image avec overlay */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero.jpg"
                alt="ALPHAS POMPES"
                fill
                priority
                sizes="100vw"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-900/90" />
            </div>

            {/* Contenu Hero */}
            <div className="relative h-full">
              <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24 h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
                    Solutions de pompage
                    <span className="block text-blue-400 mt-2">innovantes et fiables</span>
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-blue-100 max-w-3xl mx-auto">
                    Découvrez notre gamme complète de pompes industrielles. Des solutions sur mesure pour tous vos besoins, 
                    avec une expertise technique inégalée et un service client de qualité.
                  </p>
                  <div className="mt-12 flex gap-x-6 justify-center">
                    <a
                      href="/contact"
                      className="rounded-md bg-white px-6 py-3 text-base font-medium text-blue-900 shadow hover:bg-blue-50 transition-colors"
                    >
                      Contactez-nous
                    </a>
                    <a
                      href="/tout-sur-alphas"
                      className="rounded-md bg-blue-700/30 px-6 py-3 text-base font-medium text-white hover:bg-blue-700/40 transition-colors"
                    >
                      En savoir plus
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              >
                
              </motion.div>
            </div>
          </section>

          {/* Navigation des types de produits */}
          <Suspense fallback={<div className="h-16 bg-primary/10 animate-pulse" />}>
            <ProductTypeNav />
          </Suspense>

          {/* Section Domaines d'activité */}
          <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <motion.div
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={{ once: true }}
                transition={fadeIn.transition}
                className="mx-auto max-w-2xl lg:text-center"
              >
                <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Expertise multisectorielle</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  Choisissez votre domaine d'activité
                </p>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  <span className="font-semibold">ALPHAS POMPES</span> est fier de ses solides racines dans la fabrication et l'ingénierie. 
                  Notre usine de fabrication sophistiquée nous permet de fournir des solutions innovantes dans de multiples secteurs.
                </p>
              </motion.div>

              <div className="mx-auto mt-16 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                  {domains.map((domain, index) => (
                    <motion.div
                      key={domain.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        href={domain.href} 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 p-6 hover:border-blue-200 transition-all duration-300 block h-full"
                      >
                        <div className="flex flex-col items-center text-center h-full justify-between">
                          <div className="w-20 h-20 bg-blue-50 rounded-xl text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                            <div className="w-12 h-12 flex items-center justify-center">
                              <Image src={domain.icon} alt={domain.name} width={40} height={40} />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {domain.name}
                          </h3>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section Statistiques */}
          <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={fadeIn.initial}
                whileInView={fadeIn.whileInView}
                viewport={{ once: true }}
                transition={fadeIn.transition}
                className="mx-auto max-w-2xl lg:text-center mb-16"
              >
                <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Notre impact</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  ALPHAS POMPES en chiffres
                </p>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  Découvrez l'étendue de notre expertise et notre impact dans le secteur des solutions de pompage industriel
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { value: '25+', label: 'Années d\'expérience', description: 'Au service de l\'industrie' },
                  { value: '1500+', label: 'Projets réalisés', description: 'À travers le monde entier' },
                  { value: '98%', label: 'Clients satisfaits', description: 'Témoignages positifs' },
                  { value: '24/7', label: 'Service client', description: 'Support technique disponible' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 mx-auto">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                    <p className="text-xl font-semibold text-gray-800 mb-2">{stat.label}</p>
                    <p className="text-gray-500">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Marques */}
          <section className="bg-white py-16">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={{ once: true }}
              transition={fadeIn.transition}
              className="max-w-7xl mx-auto px-6 lg:px-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
                  Nos Marques Partenaires
                </h2>
                <p className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
                  Découvrez notre sélection de marques leaders dans le domaine des pompes industrielles, 
                  choisies pour leur qualité et leur fiabilité exceptionnelles.
                </p>
              </div>
            </motion.div>
            
            <BrandCarousel />
          </section>

          {/* Structure Divisionnelle */}
          <DivisionalStructure />

          {/* Partenaires */}
          <Partners />

          {/* Bannière Devis */}
          <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-white text-center md:text-left">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-4"
                  >
                    Besoin d'un devis personnalisé ?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-blue-100"
                  >
                    Notre équipe d'experts est là pour vous accompagner dans votre projet
                  </motion.p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
                    >
                      Demander un devis
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 0.1 }}
                    className="flex-shrink-0"
                  >
                    <Link
                      href="/media"
                      className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                    >
                      Voir notre médiathèque
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </main>
  );
}
