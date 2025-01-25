'use client';

import { useState } from 'react';

const IndustryIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 20V4H4V20H2ZM6 20V4H8V20H6ZM10 20V4H12V20H10ZM14 20V4H16V20H14ZM18 20V4H20V20H18ZM22 20V4H24V20H22Z"/>
  </svg>
);

const BrandIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.2L19.2 8L12 11.8L4.8 8L12 4.2ZM4 15.7V9.2L11 12.8V19.3L4 15.7ZM13 19.3V12.8L20 9.2V15.7L13 19.3Z"/>
  </svg>
);

const PumpIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H17V17H7V7ZM9 9V15H15V9H9Z"/>
  </svg>
);

interface FilterProps {
  onFilterChange: (filters: {
    brand: string[];
    domain: string[];
    type: string[];
  }) => void;
}

const brands = [
  'KSB',
  'Grundfos',
  'Wilo',
  'Xylem',
  'Ebara',
  'Lowara',
  'DAB',
  'Caprari',
];

const domains = [
  'Industrie',
  'Pharmacies & Cosmetique',
  'Anti-incendie',
  'Agroalimentaire',
  'Agriculture & Irrigation',
  'Eau & Environnement',
  'Mines & Carriere',
  'Batiment & TP',
  'Gaz & Oil',
];

const types = [
  'Pompes Centrifuges',
  'Pompes Volumetriques',
  'Pompes vide-fut',
  'Anti-incendie',
  'Moto-pompes',
  'Anti-belier',
  'Station de relevage',
  'Stations d\'épuration',
];

export default function ProductFilter({ onFilterChange }: FilterProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'brand' | 'domain' | 'type'>('domain');

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange({
      brand: newBrands,
      domain: selectedDomains,
      type: selectedTypes
    });
  };

  const handleDomainChange = (domain: string) => {
    const newDomains = selectedDomains.includes(domain)
      ? selectedDomains.filter(d => d !== domain)
      : [...selectedDomains, domain];
    setSelectedDomains(newDomains);
    onFilterChange({
      brand: selectedBrands,
      domain: newDomains,
      type: selectedTypes
    });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onFilterChange({
      brand: selectedBrands,
      domain: selectedTypes,
      type: newTypes
    });
  };

  const getActiveCount = (type: 'brand' | 'domain' | 'type') => {
    switch (type) {
      case 'brand':
        return selectedBrands.length;
      case 'domain':
        return selectedDomains.length;
      case 'type':
        return selectedTypes.length;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* En-tête du filtre */}
      <div className="bg-primary p-4">
        <h2 className="text-xl font-bold text-white">Filtres</h2>
      </div>

      {/* Onglets de navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('domain')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'domain'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <IndustryIcon />
            <span>Domaines</span>
            {getActiveCount('domain') > 0 && (
              <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-xs">
                {getActiveCount('domain')}
              </span>
            )}
          </div>
        </button>

        <button
          onClick={() => setActiveTab('brand')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'brand'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <BrandIcon />
            <span>Marques</span>
            {getActiveCount('brand') > 0 && (
              <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-xs">
                {getActiveCount('brand')}
              </span>
            )}
          </div>
        </button>

        <button
          onClick={() => setActiveTab('type')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'type'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <PumpIcon />
            <span>Types</span>
            {getActiveCount('type') > 0 && (
              <span className="ml-1 bg-primary text-white rounded-full px-2 py-0.5 text-xs">
                {getActiveCount('type')}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Contenu des filtres */}
      <div className="p-4">
        {activeTab === 'brand' && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}

        {activeTab === 'domain' && (
          <div className="space-y-2">
            {domains.map((domain) => (
              <label key={domain} className="flex items-center p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => handleDomainChange(domain)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-gray-700">{domain}</span>
              </label>
            ))}
          </div>
        )}

        {activeTab === 'type' && (
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Pied du filtre avec compteurs */}
      <div className="bg-gray-50 px-4 py-3 border-t">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{selectedBrands.length + selectedDomains.length + selectedTypes.length} filtres actifs</span>
          <button
            onClick={() => {
              setSelectedBrands([]);
              setSelectedDomains([]);
              setSelectedTypes([]);
              onFilterChange({ brand: [], domain: [], type: [] });
            }}
            className="text-primary hover:text-primary-dark"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
