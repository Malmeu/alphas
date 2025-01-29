'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { Marque, TypePompe, SecteurActivite } from '@/types/product';

type OpenSections = {
  marques: boolean;
  types: boolean;
  secteurs: boolean;
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
}

interface FilterSectionProps<T extends string> {
  title: string;
  items: T[];
  selectedItems: T[];
  onItemChange: (item: T) => void;
  section: keyof OpenSections;
  openSections: OpenSections;
  toggleSection: (section: keyof OpenSections) => void;
}

const MARQUES: Marque[] = [
  'OFLOW',
  'AL DEWATERING',
  'AL FIRE',
  'FLUX',
  'VERDER',
  'SOMEFLU',
  'FLOWSERVE',
  'PCM'
];

export default function ProductFilters({
  typesPompe,
  secteursActivite,
  selectedMarques,
  selectedTypes,
  selectedSecteurs,
  onMarqueChange,
  onTypeChange,
  onSecteurChange
}: FilterProps) {
  const [openSections, setOpenSections] = useState<OpenSections>({
    marques: true,
    types: true,
    secteurs: true
  });

  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = <T extends string>({ 
    title, 
    items, 
    selectedItems, 
    onItemChange, 
    section,
    openSections,
    toggleSection
  }: FilterSectionProps<T>) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="flex w-full items-center justify-between px-4 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
            openSections[section] ? 'rotate-180' : ''
          }`}
        />
      </button>
      {openSections[section] && (
        <div className="px-4 pb-4 space-y-3">
          {items.map((item) => (
            <label 
              key={item} 
              className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => onItemChange(item)}
                  className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30 transition-colors duration-200"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {item}
                </span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
      </div>

      <div className="divide-y divide-gray-100">
        <FilterSection
          title="Marques"
          items={MARQUES}
          selectedItems={selectedMarques}
          onItemChange={onMarqueChange}
          section="marques"
          openSections={openSections}
          toggleSection={toggleSection}
        />
        <FilterSection
          title="Types de pompe"
          items={typesPompe}
          selectedItems={selectedTypes}
          onItemChange={onTypeChange}
          section="types"
          openSections={openSections}
          toggleSection={toggleSection}
        />
        <FilterSection
          title="Secteurs d'activité"
          items={secteursActivite}
          selectedItems={selectedSecteurs}
          onItemChange={onSecteurChange}
          section="secteurs"
          openSections={openSections}
          toggleSection={toggleSection}
        />
      </div>
    </div>
  );
}
