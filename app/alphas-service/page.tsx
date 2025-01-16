'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AlphasService() {
  const services = [
    {
      title: 'Installation et Mise en Service',
      description: 'Notre équipe d\'experts assure l\'installation et la mise en service de vos équipements dans les règles de l\'art.',
      icon: '/icons/installation.svg'
    },
    {
      title: 'Maintenance Préventive',
      description: 'Programme de maintenance régulière pour garantir la performance et la longévité de vos installations.',
      icon: '/icons/maintenance.svg'
    },
    {
      title: 'Service Après-Vente',
      description: 'Support technique et intervention rapide en cas de besoin.',
      icon: '/icons/support.svg'
    },
    {
      title: 'Formation',
      description: 'Formation complète pour vos équipes sur l\'utilisation et la maintenance de base des équipements.',
      icon: '/icons/formation.svg'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-service.jpg"
            alt="Alphas Service"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">Alphas Service</h1>
            <p className="text-xl">
              Une équipe d\'experts à votre service pour l\'installation, la maintenance et le support de vos équipements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600">
              Des solutions complètes pour répondre à tous vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-16 h-16 mb-6 mx-auto">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={64}
                    height={64}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Besoin d\'assistance ?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contactez-nous
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
