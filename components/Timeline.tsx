'use client';

import { motion } from 'framer-motion';

const timelineEvents = [
  {
    year: '1982',
    title: 'Creation de la societe',
  },
  {
    year: '1995',
    title: 'vente de pompes',
  },
  {
    year: '2005',
    title: 'premiere certification ISO 9001',
  },
  {
    year: '2017',
    title: 'creation de la division industrie',
  },
];

export default function Timeline() {
  return (
    <div className="w-full overflow-x-auto py-12">
      <div className="container mx-auto px-6">
        <div className="relative min-w-max">
          {/* Ligne horizontale */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/30 -translate-y-1/2"></div>
          
          {/* Timeline events */}
          <div className="flex justify-between items-center gap-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center"
              >
                {/* Point sur la timeline */}
                <motion.div
                  className="w-4 h-4 bg-primary rounded-full mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
                
                {/* Contenu */}
                <motion.div
                  className="bg-white p-4 rounded-lg shadow-lg w-48"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <span className="text-primary font-bold text-2xl block mb-2">{event.year}</span>
                  <p className="text-gray-700">{event.title}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
