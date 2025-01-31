'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AlphasService() {
  const typePompes = [
    { name: 'Pompe centrifuge' },
    { name: 'Pompe a plan de joint' },
    { name: 'Pompe a vide' },
    { name: 'Pompe a engrenage' },
    { name: 'Pompe a membrane' },
    { name: 'Pompe a palette' },
    { name: 'Pompe a vis' },
    { name: 'Pompe de transfert GPL' },
    { name: 'Compresseur GPL' },
    { name: 'Motopompes' }
  ];

  const typeMoteurs = [
    { name: 'Moteurs brushless' },
    { name: 'Moteurs asynchrones' },
    { name: 'Moteurs de frein' },
    { name: 'Moteurs atex' },
    { name: 'Generatrices' },
    { name: 'Rotors a bague' },
    { name: 'Rotors bobines' }
  ];

  const typeInstallations = [
    { name: 'Montage et maintenance des installations en milieux pétroliers' },
    { name: 'Montage et maintenance des réseaux anti-incendies' },
    { name: 'Montage et maintenance des réseaux AEP' },
    { name: 'Installation et maintenance des stations d\'épuration et de relevage' }
  ];

  const autresServices = [
    { name: 'Alignement laser' },
    { name: 'Analyse vibratoire' },
    { name: 'Thermographie' },
    { name: 'Contrôle d\'isolement' },
    { name: 'Usinage' },
    { name: 'Équilibrage roues, arbres, rotors...' },
    { name: 'Assistance à la mise en service' },
    { name: 'Mise en service des installations' }
  ];

  const navigationItems = [
    { id: 'pompes', name: 'Maintenance Pompes' },
    { id: 'moteurs', name: 'Maintenance Moteurs' },
    { id: 'hydro', name: 'Installation Hydraulique' },
    { id: 'autres', name: 'Services Spécialisés' }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-service.jpg"
            alt="Alphas Services"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col items-center justify-center">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="text-center max-w-4xl"
          >
            <h1 className="text-6xl font-bold mb-6">Alphas Services</h1>
            <p className="text-xl mb-12">
              ALPHAS SERVICES est une entreprise spécialisée dans la maintenance, la réparation de pompes industrielles, ainsi que le rebobinage de moteurs. Grâce à l'expertise de ces technicien(nes), elle se propose également de piloter les installations des équipements en milieu industriel ou collectivités locale (adduction, relevage, épuration). L'expérience de nos équipes combinée avec la qualité de nos moyens matériels, nous permettent de fournir des solutions fiables.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {navigationItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer transition-colors duration-300"
                >
                  {item.name}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Maintenance et réparation pompes */}
      <section id="pompes" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90">
          <Image
            src="/image_pompe/34.jpg"
            alt="Background Maintenance"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="mb-16 text-center"
          >
            <h2 className="text-6xl font-bold text-white mb-12">
              MAINTENANCE<br />
              ET RÉPARATION<br />
              DE POMPES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 text-lg max-w-4xl mx-auto">
              {typePompes.map((pompe, index) => (
                <motion.div
                  key={pompe.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white uppercase">{pompe.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #3B82F6' }}
            >
              <Image
                src="/image_pompe/35.jpg"
                alt="Maintenance pompe 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #3B82F6' }}
            >
              <Image
                src="/image_pompe/36.jpg"
                alt="Maintenance pompe 2"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #3B82F6' }}
            >
              <Image
                src="/image_pompe/37.jpg"
                alt="Maintenance pompe 3"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Service Maintenance et réparation moteurs */}
      <section id="moteurs" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90">
          <Image
            src="/image_moteur/29.jpg"
            alt="Background Maintenance Moteurs"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="mb-16 text-center"
          >
            <h2 className="text-6xl font-bold text-white mb-12">
              MAINTENANCE<br />
              ET RÉPARATION<br />
              DE MOTEURS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 text-lg max-w-4xl mx-auto">
              {typeMoteurs.map((moteur, index) => (
                <motion.div
                  key={moteur.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="text-white uppercase">{moteur.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #F97316' }}
            >
              <Image
                src="/image_moteur/30.jpg"
                alt="Maintenance moteur 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #F97316' }}
            >
              <Image
                src="/image_moteur/31.jpg"
                alt="Maintenance moteur 2"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #F97316' }}
            >
              <Image
                src="/image_moteur/32.jpg"
                alt="Maintenance moteur 3"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Service Installation d'équipements hydromécaniques */}
      <section id="hydro" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90">
          <Image
            src="/image_hydro/25.jpg"
            alt="Background Installation Hydromécanique"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="mb-16 text-center"
          >
            <h2 className="text-6xl font-bold text-white mb-12">
              INSTALLATION D'ÉQUIPEMENTS<br />
              HYDROMÉCANIQUES ET RÉALISATION<br />
              DE TRAVAUX HYDRAULIQUES
            </h2>
            <div className="grid grid-cols-1 gap-y-4 text-lg max-w-4xl mx-auto">
              {typeInstallations.map((installation, index) => (
                <motion.div
                  key={installation.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                  <span className="text-white uppercase">{installation.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #EF4444' }}
            >
              <Image
                src="/image_hydro/25.jpg"
                alt="Installation hydromécanique 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #EF4444' }}
            >
              <Image
                src="/image_hydro/26.jpg"
                alt="Installation hydromécanique 2"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #EF4444' }}
            >
              <Image
                src="/image_hydro/27.jpg"
                alt="Installation hydromécanique 3"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Autres Services Spécialisés */}
      <section id="autres" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90">
          <Image
            src="/image_autres/18.jpg"
            alt="Background Services Spécialisés"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="mb-16 text-center"
          >
            <h2 className="text-6xl font-bold text-white mb-12">
              ALPHAS POMPES<br />
              SERVICES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 text-lg max-w-4xl mx-auto">
              {autresServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">{service.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #06B6D4' }}
            >
              <Image
                src="/image_autres/19.jpg"
                alt="Service spécialisé 1"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #06B6D4' }}
            >
              <Image
                src="/image_autres/20.jpg"
                alt="Service spécialisé 2"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
              style={{ borderRadius: '20px', border: '4px solid #06B6D4' }}
            >
              <Image
                src="/image_autres/21.jpg"
                alt="Service spécialisé 3"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Téléchargement Brochure */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">
                Téléchargez notre brochure
              </h2>
              <p className="text-blue-100 text-lg">
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
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
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
