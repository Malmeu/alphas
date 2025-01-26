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
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex w-full items-center justify-between text-lg font-medium text-gray-900 hover:text-primary"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform ${
            openSections[section] ? 'rotate-180' : ''
          }`}
        />
      </button>
      {openSections[section] && (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => onItemChange(item)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filtres</h2>
      
      <FilterSection<Marque>
        title="Marques"
        items={MARQUES}
        selectedItems={selectedMarques}
        onItemChange={onMarqueChange}
        section="marques"
        openSections={openSections}
        toggleSection={toggleSection}
      />

      <FilterSection<TypePompe>
        title="Types de pompes"
        items={typesPompe}
        selectedItems={selectedTypes}
        onItemChange={onTypeChange}
        section="types"
        openSections={openSections}
        toggleSection={toggleSection}
      />

      <FilterSection<SecteurActivite>
        title="Secteurs d'activité"
        items={secteursActivite}
        selectedItems={selectedSecteurs}
        onItemChange={onSecteurChange}
        section="secteurs"
        openSections={openSections}
        toggleSection={toggleSection}
      />
    </div>
  );
}
