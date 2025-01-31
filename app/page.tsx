'use client';

import Image from 'next/image'
import Link from 'next/link'
import DivisionalStructure from '../components/DivisionalStructure'
import Partners from '../components/Partners'
import ProductTypeNav from '../components/ProductTypeNav'
import BrandCarousel from '../components/BrandCarousel'
import { Fragment, Suspense } from 'react'
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

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
      <section className="relative h-[calc(100vh-4rem)] bg-gray-900">
        {/* Background image avec overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
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
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 h-full flex flex-col justify-center">
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition-colors duration-300"
                  >
                    Contactez-nous
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/tout-sur-alphas"
                    className="rounded-full bg-blue-700/30 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700/40 transition-colors duration-300"
                  >
                    En savoir plus
                  </Link>
                </motion.div>
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
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-blue-200 text-sm mb-2">Découvrir</span>
              <svg className="w-6 h-6 text-blue-200" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation des types de produits */}
      <Suspense fallback={<div className="h-16 bg-primary/10 animate-pulse" />}>
        <ProductTypeNav />
      </Suspense>

      {/* Section Domaines d'activité */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
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
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 p-6 hover:border-blue-200 transition-all duration-300 block"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="h-16 w-16 bg-blue-50 rounded-xl text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                        <span className="text-4xl">{domain.icon}</span>
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

      {/* Section Marques */}
      <section className="bg-white py-24">
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
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
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
          </div>
        </div>
      </section>
    </main>
  );
}
