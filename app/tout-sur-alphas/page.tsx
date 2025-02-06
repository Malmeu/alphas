'use client';

import Image from 'next/image';
import Timeline from '../../components/Timeline';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ToutSurAlphas() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Section 1 - Hero */}
      <section className="relative h-[80vh] sm:h-screen bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-tout.png"
            alt="Banner Alphas Pompes"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-4xl"
          >
            <span className="text-blue-400 font-semibold text-base sm:text-lg mb-2 sm:mb-4 block">Bienvenue chez Alphas Pompes</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8">
              <span className="text-white">TOUT SUR</span>{' '}
              <span className="text-blue-400">ALPHAS POMPES</span>
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center">
              {['Positivité', 'Ambition', 'Esprit d\'équipe', 'Intégrité', 'Excellence'].map((value, index) => (
                <motion.span
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm sm:text-lg"
                >
                  {value}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 sm:space-y-8"
            >
              <p className="text-xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-blue-200">+28 ans de succès & d'innovations</p>
              <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto px-4 sm:px-0">
                ALPHAS POMPES célèbre plus de 28 ans de succès dans le domaine du pompage des fluides grâce à ses solutions de qualité.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8 justify-center">
                <ScrollLink
                  to="notre-force"
                  smooth={true}
                  duration={500}
                  offset={-64}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white cursor-pointer transition-all text-sm sm:text-base"
                >
                  Notre Force
                </ScrollLink>
                <ScrollLink
                  to="innovation"
                  smooth={true}
                  duration={500}
                  offset={-64}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white cursor-pointer transition-all text-sm sm:text-base"
                >
                  Innovation
                </ScrollLink>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator - Masqué sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center"
        >
          <span className="text-blue-200 text-sm mb-2">Découvrir Plus</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 - Notre Force */}
      <section id="notre-force" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-8 sm:mb-16"
          >
            <span className="text-blue-600 font-semibold text-base sm:text-lg mb-2 block">Notre Force</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Chaque Jour Plus Forts</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Grâce à notre travail d'équipe, nous repoussons nos limites pour offrir le meilleur de nous-mêmes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true }}
              transition={fadeIn.transition}
              className="space-y-4 sm:space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group">
                <div className="p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Une Énergie Renouvelée</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Chez ALPHAS POMPES, nous proposons une vaste gamme de solutions de pompage, comprenant une variété de modèles et de technologies. Notre catalogue diversifié nous permet de répondre précisément aux besoins de chaque application.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group">
                <div className="p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Déploiement National</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Notre présence étendue à travers le territoire national nous permet d'intervenir rapidement pour servir nos clients dans tous les coins du pays (58 wilayas).
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true }}
              transition={fadeIn.transition}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-4 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Des Objectifs Et Des Ambitions</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8 leading-relaxed">
                  Notre objectif est de fournir au client une solution de pompage complète avec des produits de qualité dont le prix est compétitif.
                </p>
                <ul className="space-y-2 sm:space-y-4">
                  {[
                    'Solutions de Pompage Complètes',
                    'Produits de Qualité à Prix Compétitif',
                    'Livraison à Temps',
                    'Coût du Cycle de Vie Réduit',
                    'Service Après-Vente Impeccable'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 - Innovation */}
      <section id="innovation" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Innover Dans Chaque Détail</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Nous avançons avec assurance et détermination, car nous savons exactement où nous voulons aller.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: 'Partenaire Privilégié',
                description: 'Nous aspirons à devenir le partenaire privilégié de nos clients pour toutes leurs solutions de pompage.',
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Innovation Technologique',
                description: 'Nous repoussons les limites de l\'ingénierie pour créer des solutions de pompage de pointe.',
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Excellence & Intégrité',
                description: 'Nous croyons fermement en la valeur de l\'excellence et de l\'intégrité dans tout ce que nous faisons.',
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Notre Histoire</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Découvrez les moments clés qui ont façonné notre entreprise et nous ont menés vers l'excellence.
            </p>
          </motion.div>
          <Timeline />
        </div>
      </section>

      {/* Section Téléchargement Brochure */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                Téléchargez notre brochure
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Découvrez en détail notre histoire, nos valeurs et notre expertise
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <a
                href="/alphas-services.pdf"
                download
                className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 text-sm sm:text-base"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Télécharger la brochure
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
