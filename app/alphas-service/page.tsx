'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const navigationItems = [
  { id: 'pompes', name: 'Maintenance Pompes' },
  { id: 'moteurs', name: 'Maintenance Moteurs' },
  { id: 'hydro', name: 'Installation Hydromécanique' },
  { id: 'autres', name: 'Autres Services' },
];

const typePompes = [
  { name: 'Pompes centrifuges' },
  { name: 'Pompes volumétriques' },
  { name: 'Pompes de relevage' },
  { name: 'Pompes immergées' },
  { name: 'Pompes à vide' },
  { name: 'Pompes doseuses' },
];

const typeMoteurs = [
  { name: 'Moteurs électriques' },
  { name: 'Moteurs diesel' },
  { name: 'Motoréducteurs' },
  { name: 'Variateurs de vitesse' },
];

const typeInstallations = [
  { name: 'Installation de stations de pompage' },
  { name: 'Installation de stations de surpression' },
  { name: 'Installation de stations de relevage' },
  { name: 'Installation de systèmes anti-incendie' },
  { name: 'Travaux de tuyauterie industrielle' },
];

const autresServices = [
  { name: 'Audit et diagnostic' },
  { name: 'Contrats de maintenance' },
  { name: 'Formation technique' },
  { name: 'Assistance technique' },
];

export default function AlphasService() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero section avec overlay gradient */}
      <section className="relative h-[80vh] sm:h-[calc(100vh-4rem)] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-service.jpg"
            alt="ALPHAS Services"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-blue-900/90" />
        </div>

        {/* Contenu Hero */}
        <div className="relative h-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                Service et maintenance
                <span className="block text-blue-400 mt-2">expertise technique</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-blue-100 max-w-3xl mx-auto px-4 sm:px-0">
                ALPHAS SERVICES est votre partenaire de confiance pour la maintenance, la réparation et l'installation 
                d'équipements de pompage. Notre expertise technique et notre engagement qualité garantissent des solutions 
                fiables et durables.
              </p>
              <div className="mt-8 sm:mt-12 flex flex-wrap gap-2 sm:gap-4 justify-center px-2 sm:px-4">
                {navigationItems.map((item) => (
                  <ScrollLink
                    key={item.id}
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-64}
                    className="rounded-full bg-blue-700/30 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-blue-700/40 transition-colors duration-300 whitespace-nowrap"
                  >
                    {item.name}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator - Masqué sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center"
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

      {/* Section Services */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Maintenance Pompes */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-semibold text-sm sm:text-base mb-2 block">Services</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Maintenance Pompes</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
                Notre expertise en maintenance de pompes garantit la performance et la longévité de vos équipements.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
              {[
                {
                  title: "Pompes Centrifuges",
                  description: "Maintenance préventive et corrective des pompes centrifuges mono et multi-étagées."
                },
                {
                  title: "Pompes à Vide",
                  description: "Entretien et réparation des systèmes de pompage sous vide."
                },
                {
                  title: "Pompes Volumétriques",
                  description: "Service complet pour pompes à engrenages, à lobes et à vis."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {["/image_pompe/35.jpg", "/image_pompe/36.jpg", "/image_pompe/37.jpg"].map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative h-48 sm:h-64 overflow-hidden rounded-2xl group"
                >
                  <Image
                    src={src}
                    alt={`Maintenance pompe ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Maintenance Moteurs */}
          <div className="mb-12 sm:mb-16 bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 rounded-3xl">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-orange-600 font-semibold text-base sm:text-lg mb-2 block">Services</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Maintenance Moteurs</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Service complet de maintenance pour tous types de moteurs électriques et thermiques.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
              {[
                {
                  title: "Moteurs Électriques",
                  description: "Diagnostic, réparation et maintenance des moteurs électriques industriels."
                },
                {
                  title: "Moteurs Thermiques",
                  description: "Service complet pour moteurs diesel et essence de toutes puissances."
                },
                {
                  title: "Variateurs de Vitesse",
                  description: "Installation et maintenance des systèmes de contrôle de vitesse."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                    <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {["/image_moteur/30.jpg", "/image_moteur/31.jpg", "/image_moteur/32.jpg"].map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative h-48 sm:h-64 overflow-hidden rounded-2xl group"
                >
                  <Image
                    src={src}
                    alt={`Maintenance moteur ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Installation Hydromécanique */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-red-600 font-semibold text-base sm:text-lg mb-2 block">Services</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Installation Hydromécanique</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Solutions complètes pour l'installation et la maintenance des systèmes hydromécaniques.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Systèmes de Pompage",
                  description: "Installation et mise en service de stations de pompage complètes."
                },
                {
                  title: "Réseaux Hydrauliques",
                  description: "Conception et installation de réseaux de distribution d'eau."
                },
                {
                  title: "Automatisation",
                  description: "Mise en place de systèmes de contrôle et d'automatisation."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                    <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {["/image_hydro/25.jpg", "/image_hydro/26.jpg", "/image_hydro/27.jpg"].map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative h-48 sm:h-64 overflow-hidden rounded-2xl group"
                >
                  <Image
                    src={src}
                    alt={`Installation hydromécanique ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Autres Services */}
          <div className="bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 rounded-3xl">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-purple-600 font-semibold text-base sm:text-lg mb-2 block">Services</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Autres Services</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Des services spécialisés pour répondre à tous vos besoins en pompage et maintenance.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
              {[
                {
                  title: "Audit Technique",
                  description: "Évaluation complète de vos installations et recommandations d'optimisation."
                },
                {
                  title: "Formation",
                  description: "Sessions de formation pour vos équipes techniques et opérationnelles."
                },
                {
                  title: "Conseil",
                  description: "Accompagnement dans vos projets et choix d'équipements."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Téléchargement Brochure */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Téléchargez notre brochure
              </h2>
              <p className="text-blue-100 text-base sm:text-lg">
                Découvrez en détail tous nos services et notre expertise
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <a
                href="/alphas-services.pdf"
                download
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 text-sm sm:text-base"
              >
                <svg
                  className="w-6 h-6 mr-3"
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
