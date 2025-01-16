'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const domaines = [
  { nom: 'Hydrocarbure', icon: '/icons/hydrocarbure.svg' },
  { nom: 'Agroalimentaire', icon: '/icons/agroalimentaire.svg' },
  { nom: 'Cosmétique', icon: '/icons/cosmetique.svg' },
  { nom: 'Pharmaceutique', icon: '/icons/pharmaceutique.svg' },
  { nom: 'Eau et environnement', icon: '/icons/environnement.svg' },
  { nom: 'Industriel', icon: '/icons/industriel.svg' },
];

const produits = [
  {
    titre: 'Pompe Centrifuge Horizontal Mono-cellulaire',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/mono-cellulaire.jpg'
  },
  {
    titre: 'Pompe Centrifuge Horizontal Multi-cellulaire',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/multi-cellulaire.jpg'
  },
  {
    titre: 'Pompe Centrifuge Vertical Multi-cellulaire',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/vertical-multi.jpg'
  },
  {
    titre: 'Pompe Centrifuge à Vide',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/vide.jpg'
  },
  {
    titre: 'Pompe Centrifuge Immergée',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/immergee.jpg'
  },
  {
    titre: 'Pompe centrifuge Submersible',
    description: 'Une solution compacte et performante, idéale pour des applications industrielles variées.',
    image: '/images/pompes/submersible.jpg'
  }
];

export default function PompesCentrifuges() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      {/* Section 1 - Hero */}
      <section className="relative h-[60vh] bg-primary text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-pompes.jpg"
            alt="Pompes Centrifuges"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">Pompes Centrifuges</h1>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Caractéristiques Principales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de pompes centrifuges, alliant puissance, fiabilité et efficacité énergétique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Produits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Notre Gamme de Produits
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produits.map((produit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={produit.image}
                    alt={produit.titre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{produit.titre}</h3>
                  <p className="text-gray-600 mb-4">{produit.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {domaines.map((domaine, i) => (
                      <button
                        key={i}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Image
                          src={domaine.icon}
                          alt={domaine.nom}
                          width={16}
                          height={16}
                          className="mr-1"
                        />
                        {domaine.nom}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Service et Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Service et Support</h2>
            <p className="text-xl text-gray-600">ALPHAS POMPES s'engage à fournir un support complet</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Conseil technique personnalisé',
              'Installation et mise en service',
              'Formation des opérateurs',
              'Maintenance préventive',
              'Service après-vente réactif',
              'Stock de pièces détachées',
              'Documentation technique complète',
              'Garantie constructeur'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
