'use client';

import Image from 'next/image';
import Timeline from '../../components/Timeline';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ToutSurAlphas() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      {/* Section 1 - Hero */}
      <section className="relative h-[60vh] bg-primary text-white flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-tout.png"
            alt="Banner Alphas Pompes"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="mx-auto max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">TOUT SUR ALPHAS POMPES</h1>
            <p className="text-xl mb-4">Positivité / Ambition / Esprit d'équipe / Intégrité / Excellence</p>
            <p className="text-2xl font-semibold mb-2">+28 ans de succès & d'innovations</p>
            <p className="text-lg">ALPHAS POMPES célèbre plus de 28 ans de succès dans le domaine du pompage des fluides grâce à ses solutions de qualité.</p>
          </motion.div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Chaque Jour Plus Forts</h2>
            <p className="text-xl text-gray-600">Grâce à notre travail d'équipe, nous repoussons nos limites pour offrir le meilleur de nous-mêmes.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true }}
              transition={fadeIn.transition}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Une Énergie Renouvelée</h3>
                <p className="text-gray-600">Chez ALPHAS POMPES, nous proposons une vaste gamme de solutions de pompage, comprenant une variété de modèles et de technologies. Notre catalogue diversifié nous permet de répondre précisément aux besoins de chaque application à travers les solutions distribuées ou développées et fabriquées par ALPHAS, en offrant la possibilité de personnaliser les matériaux et la conception selon les exigences spécifiques du terrain.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Déploiement</h3>
                <p className="text-gray-600">Chez ALPHAS POMPES, nous sommes animés par la fierté de notre présence étendue et complète à travers le territoire national, avec des interventions rapides pour servir nos clients dans tous les coins du pays (58 wilayas). Nous aspirons à étendre notre influence et notre impact au-delà des frontières nationales, tout en restant fidèles à nos valeurs fondamentales de qualité, d'innovation et de service exceptionnel à la clientèle.</p>
              </div>
            </motion.div>

            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true }}
              transition={fadeIn.transition}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Des Objectifs Et Desambitions</h3>
              <p className="text-gray-600 mb-6">Notre objectif est de fournir au client une solution de pompage complète avec des produits de qualité dont le prix est compétitif, livrés à temps et dont le coût du cycle de vie est le plus bas, soutenus par un service après-vente impeccable.</p>
              <ul className="space-y-4">
                {[
                  'Fournir des Solutions de Pompage Complètes : Notre objectif est de proposer une gamme diversifiée de produits de pompage répondant aux besoins variés de nos clients, tout en offrant des solutions sur mesure adaptées à chaque application spécifique',
                  'Produits de Qualité à Prix Compétitif: Nous nous engageons à maintenir des normes de qualité élevées tout en veillant à ce que nos produits restent compétitifs sur le marché, offrant ainsi une valeur exceptionnelle à nos clients',
                  'Livraison à Temps : Nous visons à garantir une livraison ponctuelle de nos produits, permettant à nos clients de planifier efficacement leurs opérations sans interruption.',
                  'Coût du Cycle de Vie Réduit : Nous cherchons à réduire les coûts totaux de possession de nos produits en optimisant leur durabilité, leur fiabilité et leur efficacité opérationnelle, ce qui se traduit par des économies à long terme pour nos clients.',
                  'Service Après-Vente Impeccable : Notre objectif est de fournir un service après-vente exceptionnel, offrant un support technique et une assistance rapide pour garantir la satisfaction continue de nos clients et la performance optimale de nos produits.'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-primary">•</span>
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              viewport={{ once: true }}
              transition={fadeIn.transition}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Innover Dans Chaque Detail</h2>
              <p className="text-xl text-gray-600 mb-6">Nous avançons avec assurance et détermination, car nous savons exactement où nous voulons aller.</p>
              <div className="space-y-4 text-gray-600">
                <p>Nous aspirons à devenir le partenaire privilégié de nos clients pour toutes leurs solutions de pompage. Nous nous engageons à être reconnus comme un leader incontesté dans le domaine des pompes hydromécaniques, en offrant des produits innovants, fiables et sur mesure qui dépassent les attentes de nos clients.</p>
                <p>Notre vision est de repousser les limites de l'ingénierie et de la technologie pour créer des solutions de pompage de pointe qui répondent aux défis les plus complexes du marché. Nous visons à être à la pointe de l'innovation, en anticipant les besoins futurs de nos clients et en développant des produits et des services qui leur permettent de prospérer dans un monde en constante évolution.</p>
                <p>Chez Alphas Pompes, nous croyons fermement en la valeur de l'excellence, de l'intégrité et de l'engagement envers nos clients. Notre vision est de devenir le partenaire de confiance de nos clients, en les accompagnant à chaque étape de leur parcours et en les aidant à atteindre leurs objectifs avec succès.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px]"
            >
              <Image
                src="/images/innovation.jpg"
                alt="Innovation chez Alphas Pompes"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4 - Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Historique de notre entreprise</h2>
          </motion.div>
          <Timeline />
        </div>
      </section>
    </main>
  );
}
