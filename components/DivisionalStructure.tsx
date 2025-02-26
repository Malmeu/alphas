'use client';

import { motion } from 'framer-motion';

const divisions = [
  {
    number: '01',
    title: 'Division Trading',
    description: 'Commercialisation et distribution des pompes pour divers process, le transfert, le dosage de tous les fluides avec une représentation de marques de renommée mondiale.',
  },
  {
    number: '02',
    title: 'Division Industrie',
    description: 'Production de pompes et équipements hydromécaniques pour le marché Algérien et l\'export.',
  },
  {
    number: '03',
    title: 'Division Eau & Environnement',
    description: 'Fabrication des stations de relevage, pompage et épuration, en version monobloc, pour les petites et moyennes collectivités pour le marché Algérien.',
  },
  {
    number: '04',
    title: 'Division Services',
    description: 'Maintenance et réparation des pompes, moteurs et travaux hydrauliques',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function DivisionalStructure() {
  return (
    <div className="bg-white py-0 sm:py-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Structure Divisionnelle De L'entreprise
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Découvrez quelques-uns de nos divisions
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {divisions.map((division, index) => (
            <motion.div
              key={division.number}
              variants={cardVariants}
              className="relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm group-hover:blur"></div>
              <div className="relative h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-transparent transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-bold text-primary">{division.number}</span>
                  <span className="text-sm text-gray-500">{division.number} step</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {division.title}
                </h3>
                <p className="text-gray-600">
                  {division.description}
                </p>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-blue-600 w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
