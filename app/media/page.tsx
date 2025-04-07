'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types pour les médias
interface Photo {
  id: string;
  title: string;
  description: string;
  src: string;
  tags: string[];
}

interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  category: string;
}

// Données de démonstration pour la galerie photo
const photos: Photo[] = [
  {
    id: '1',
    title: 'Pompes centrifuges industrielles',
    description: 'Installation de pompes centrifuges pour une usine de traitement des eaux',
    src: '/images/gallery/photo1.jpg',
    tags: ['Industrie', 'Installation']
  },
  {
    id: '2',
    title: 'Système de pompage agricole',
    description: 'Système d\'irrigation avancé pour l\'agriculture moderne',
    src: '/images/gallery/photo2.jpg',
    tags: ['Agriculture', 'Irrigation']
  },
  {
    id: '3',
    title: 'Maintenance préventive',
    description: 'Équipe technique effectuant une maintenance préventive sur des pompes',
    src: '/images/gallery/photo3.jpg',
    tags: ['Maintenance', 'Service']
  },
  {
    id: '4',
    title: 'Pompes submersibles',
    description: 'Installation de pompes submersibles pour un projet municipal',
    src: '/images/gallery/photo4.jpg',
    tags: ['Municipal', 'Installation']
  },
  {
    id: '5',
    title: 'Système anti-incendie',
    description: 'Installation d\'un système de pompage anti-incendie',
    src: '/images/gallery/photo5.jpg',
    tags: ['Anti-incendie', 'Sécurité']
  },
  {
    id: '6',
    title: 'Laboratoire de test',
    description: 'Tests de performance dans notre laboratoire certifié',
    src: '/images/gallery/photo6.jpg',
    tags: ['R&D', 'Qualité']
  },
  {
    id: '7',
    title: 'Formation technique',
    description: 'Session de formation pour nos clients sur l\'utilisation optimale des pompes',
    src: '/images/gallery/photo7.jpg',
    tags: ['Formation', 'Service']
  },
  {
    id: '8',
    title: 'Pompes pour l\'industrie pétrolière',
    description: 'Solutions de pompage spécialisées pour l\'industrie pétrolière',
    src: '/images/gallery/photo8.jpg',
    tags: ['Pétrole', 'Industrie']
  }
];

// Données de démonstration pour les documents téléchargeables
const documents: Document[] = [
  {
    id: '1',
    title: 'Catalogue Général 2025',
    description: 'Catalogue complet des produits ALPHAS POMPES',
    fileUrl: '/documents/catalogue-general-2025.pdf',
    fileType: 'PDF',
    fileSize: '8.5 MB',
    category: 'Catalogues'
  },
  {
    id: '2',
    title: 'Fiche Technique - Pompes Centrifuges',
    description: 'Spécifications techniques détaillées pour notre gamme de pompes centrifuges',
    fileUrl: '/documents/fiche-technique-pompes-centrifuges.pdf',
    fileType: 'PDF',
    fileSize: '2.3 MB',
    category: 'Fiches Techniques'
  },
  {
    id: '3',
    title: 'Guide d\'Installation',
    description: 'Instructions détaillées pour l\'installation et la mise en service',
    fileUrl: '/documents/guide-installation.pdf',
    fileType: 'PDF',
    fileSize: '4.1 MB',
    category: 'Guides'
  },
  {
    id: '4',
    title: 'Manuel de Maintenance',
    description: 'Procédures de maintenance préventive et corrective',
    fileUrl: '/documents/manuel-maintenance.pdf',
    fileType: 'PDF',
    fileSize: '5.7 MB',
    category: 'Manuels'
  },
  {
    id: '5',
    title: 'Brochure Solutions Industrielles',
    description: 'Présentation de nos solutions pour le secteur industriel',
    fileUrl: '/documents/brochure-solutions-industrielles.pdf',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    category: 'Brochures'
  },
  {
    id: '6',
    title: 'Étude de Cas - Traitement des Eaux',
    description: 'Étude de cas détaillée sur un projet de traitement des eaux',
    fileUrl: '/documents/etude-cas-traitement-eaux.pdf',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    category: 'Études de Cas'
  },
  {
    id: '7',
    title: 'Certificats de Conformité',
    description: 'Ensemble des certificats de conformité de nos produits',
    fileUrl: '/documents/certificats-conformite.pdf',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    category: 'Certificats'
  },
  {
    id: '8',
    title: 'Présentation Corporate',
    description: 'Présentation détaillée d\'ALPHAS POMPES',
    fileUrl: '/documents/presentation-corporate.pptx',
    fileType: 'PPTX',
    fileSize: '6.3 MB',
    category: 'Présentations'
  }
];

// Catégories pour filtrer les documents
const documentCategories = [
  'Tous',
  'Catalogues',
  'Fiches Techniques',
  'Guides',
  'Manuels',
  'Brochures',
  'Études de Cas',
  'Certificats',
  'Présentations'
];

// Tags pour filtrer les photos
const photoTags = [
  'Tous',
  'Industrie',
  'Agriculture',
  'Installation',
  'Maintenance',
  'Service',
  'Municipal',
  'Anti-incendie',
  'Sécurité',
  'R&D',
  'Qualité',
  'Formation',
  'Pétrole'
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function MediaPage() {
  // États pour la gestion des filtres
  const [activePhotoTag, setActivePhotoTag] = useState('Tous');
  const [activeDocCategory, setActiveDocCategory] = useState('Tous');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filtrage des photos en fonction du tag sélectionné
  const filteredPhotos = activePhotoTag === 'Tous' 
    ? photos 
    : photos.filter(photo => photo.tags.includes(activePhotoTag));

  // Filtrage des documents en fonction de la catégorie sélectionnée
  const filteredDocuments = activeDocCategory === 'Tous' 
    ? documents 
    : documents.filter(doc => doc.category === activeDocCategory);

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (fileType: string) => {
    switch(fileType.toLowerCase()) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'pptx':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] bg-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-media.jpg"
            alt="Médiathèque ALPHAS POMPES"
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
            <span className="text-blue-400 font-semibold text-base sm:text-lg mb-2 sm:mb-4 block">Ressources multimédias</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8">
              <span className="text-white">Médiathèque</span>{' '}
              <span className="text-blue-400">ALPHAS POMPES</span>
            </h1>
            <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez notre galerie photo et accédez à nos documents techniques
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Galerie Photo */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-8 sm:mb-16"
          >
            <span className="text-blue-600 font-semibold text-base sm:text-lg mb-2 block">Nos réalisations en images</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Galerie Photo</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Explorez nos installations, projets et équipements à travers notre galerie photo
            </p>
          </motion.div>

          {/* Filtres pour la galerie */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {photoTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActivePhotoTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activePhotoTag === tag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grille de photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseInt(photo.id) * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <div className="relative h-64 w-full">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white">{photo.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{photo.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {photo.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-600/70 text-white px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Documents Téléchargeables */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="text-center mb-8 sm:mb-16"
          >
            <span className="text-blue-600 font-semibold text-base sm:text-lg mb-2 block">Documentation technique</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Espace Téléchargement</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Accédez à nos catalogues, fiches techniques, manuels et autres documents
            </p>
          </motion.div>

          {/* Filtres pour les documents */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {documentCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveDocCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeDocCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Liste des documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseInt(doc.id) * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getFileIcon(doc.fileType)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                            {doc.fileType}
                          </span>
                          <span>{doc.fileSize}</span>
                        </div>
                        <a 
                          href={doc.fileUrl} 
                          download
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Télécharger
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal pour afficher les photos en grand */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedPhoto(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-[60vh]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h3>
              <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Section Demande de Documents Spécifiques */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                Besoin d'un document spécifique ?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Contactez-nous pour obtenir des documents personnalisés ou des informations supplémentaires
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <a
                href="/contact"
                className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 text-sm sm:text-base"
              >
                Nous contacter
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
