'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'EGSA Alger', image: '/images/partenaire/EGSA_Alger.png' },
  { name: 'La Belle', image: '/images/partenaire/La_Belle_logo.png' },
  { name: 'SIM', image: '/images/partenaire/Sim.jpg' },
  { name: 'ADE', image: '/images/partenaire/ade.png' },
  { name: 'Cevital', image: '/images/partenaire/cevital.png' },
  { name: 'ONA', image: '/images/partenaire/ona.jpeg' },
  { name: 'PCA', image: '/images/partenaire/pca.png' },
  { name: 'BP', image: '/images/partenaire/bp.jpeg' },
  { name: 'COCA', image: '/images/partenaire/coca.jpeg' },
  { name: 'enac', image: '/images/partenaire/enac.jpeg' },
  { name: 'enafor', image: '/images/partenaire/enafor.jpeg' },
  { name: 'enageo', image: '/images/partenaire/enageo.jpeg' },
  { name: 'encc', image: '/images/partenaire/encc.jpeg' },
  { name: 'engpt', image: '/images/partenaire/engpt.jpeg' },
  { name: 'eni', image: '/images/partenaire/eni.jpeg' },
  { name: 'entp', image: '/images/partenaire/entp.jpeg' },
  { name: 'gcb', image: '/images/partenaire/gcb.jpeg' },
  { name: 'ifri', image: '/images/partenaire/ifri.jpeg' },
  { name: 'mdn', image: '/images/partenaire/mdn.jpeg' },
  { name: 'metal', image: '/images/partenaire/metal.jpeg' },
  { name: 'naftal', image: '/images/partenaire/naftal.jpeg' },
  { name: 'pepsi', image: '/images/partenaire/pepsi.jpeg' },
  { name: 'sonalgaz', image: '/images/partenaire/sonalgaz.jpeg' },
  { name: 'sonatrach', image: '/images/partenaire/sonatrach.jpeg' },
  { name: 'soummam', image: '/images/partenaire/soummam.jpeg' },
  { name: 'tchin', image: '/images/partenaire/tchin.jpeg' },
];

export default function Partners() {
  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Découvrez quelques-uns de nos partenaires qui nous font confiance depuis des années
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-center group hover:shadow-md transition-all duration-300 w-full max-w-[140px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
