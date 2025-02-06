'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import type { Marque, TypePompe, SecteurActivite } from '@/types/product';

export type OpenSections = {
  marques: boolean;
  types: boolean;
  domaines: boolean;
};

interface FilterProps {
  marques: Marque[];
  typesPompe: TypePompe[];
  secteursActivite: SecteurActivite[];
  selectedMarques: Marque[];
  selectedTypes: TypePompe[];
  selectedSecteurs: SecteurActivite[];
  onMarqueChange: (marque: Marque) => void;
  onTypeChange: (type: TypePompe) => void;
  onSecteurChange: (secteur: SecteurActivite) => void;
  openSections: OpenSections;
  setOpenSections: (sections: OpenSections) => void;
}

interface FilterSectionProps<T extends string> {
  title: string;
  items: T[];
  selectedItems: T[];
  onItemChange: (item: T) => void;
  isOpen: boolean;
  onToggle: () => void;
}

function FilterSection<T extends string>({
  title,
  items,
  selectedItems,
  onItemChange,
  isOpen,
  onToggle,
}: FilterSectionProps<T>) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-lg font-medium text-gray-900"
        onClick={onToggle}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => onItemChange(item)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductFilters({
  marques,
  typesPompe,
  secteursActivite,
  selectedMarques,
  selectedTypes,
  selectedSecteurs,
  onMarqueChange,
  onTypeChange,
  onSecteurChange,
  openSections,
  setOpenSections,
}: FilterProps) {
  const [localOpenSections, setLocalOpenSections] = useState<OpenSections>(openSections);

  const toggleSection = (section: keyof OpenSections) => {
    setLocalOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtres</h2>

      <FilterSection
        title="Marques"
        items={marques}
        selectedItems={selectedMarques}
        onItemChange={onMarqueChange}
        isOpen={localOpenSections.marques}
        onToggle={() => toggleSection('marques')}
      />

      <FilterSection
        title="Types de Pompes"
        items={typesPompe}
        selectedItems={selectedTypes}
        onItemChange={onTypeChange}
        isOpen={localOpenSections.types}
        onToggle={() => toggleSection('types')}
      />

      <FilterSection
        title="Domaines d'activité"
        items={secteursActivite}
        selectedItems={selectedSecteurs}
        onItemChange={onSecteurChange}
        isOpen={localOpenSections.domaines}
        onToggle={() => toggleSection('domaines')}
      />

      {/* Résumé des filtres actifs */}
      {(selectedMarques.length > 0 || selectedTypes.length > 0 || selectedSecteurs.length > 0) && (
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
            {selectedSecteurs.map((secteur) => (
              <span
                key={secteur}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {secteur}
                <button
                  onClick={() => onSecteurChange(secteur)}
                  className="ml-1 hover:text-purple-600"
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
