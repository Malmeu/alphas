'use client';

import { useState } from 'react';
import { Marque, TypePompe } from '@/types/product';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface DomainFiltersProps {
  marques: Marque[];
  typesPompe: TypePompe[];
  selectedMarques: Marque[];
  selectedTypes: TypePompe[];
  onMarqueChange: (marque: Marque) => void;
  onTypeChange: (type: TypePompe) => void;
}

export default function DomainFilters({
  marques,
  typesPompe,
  selectedMarques,
  selectedTypes,
  onMarqueChange,
  onTypeChange,
}: DomainFiltersProps) {
  const [isMarquesOpen, setIsMarquesOpen] = useState(false);
  const [isTypesOpen, setIsTypesOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Filtres par Marque */}
      <div className="mb-6">
        <button
          onClick={() => setIsMarquesOpen(!isMarquesOpen)}
          className="w-full flex items-center justify-between text-lg font-medium text-gray-900 mb-2"
        >
          <span>Marques</span>
          <motion.span
            animate={{ rotate: isMarquesOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDownIcon className="h-5 w-5" />
          </motion.span>
        </button>
        <AnimatePresence>
          {isMarquesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {marques.map((marque) => (
                  <label key={marque} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMarques.includes(marque)}
                      onChange={() => onMarqueChange(marque)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{marque}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filtres par Type */}
      <div>
        <button
          onClick={() => setIsTypesOpen(!isTypesOpen)}
          className="w-full flex items-center justify-between text-lg font-medium text-gray-900 mb-2"
        >
          <span>Types de Pompes</span>
          <motion.span
            animate={{ rotate: isTypesOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDownIcon className="h-5 w-5" />
          </motion.span>
        </button>
        <AnimatePresence>
          {isTypesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {typesPompe.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => onTypeChange(type)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Résumé des filtres sélectionnés */}
      {(selectedMarques.length > 0 || selectedTypes.length > 0) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Filtres actifs :</h3>
          <div className="flex flex-wrap gap-2">
            {selectedMarques.map((marque) => (
              <span
                key={marque}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {marque}
                <button
                  onClick={() => onMarqueChange(marque)}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
            {selectedTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {type}
                <button
                  onClick={() => onTypeChange(type)}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
