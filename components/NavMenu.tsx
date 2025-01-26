'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos Produits', href: '/produits' },
  { name: 'À Propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const products = [
  {
    name: 'Pompes Centrifuges',
    href: '/produits?type=Pompes Centrifuges'
  },
  {
    name: 'Pompes Volumetriques',
    href: '/produits?type=Pompes-volumetriques'
  },
  {
    name: 'Pompes vide-fut',
    href: '/produits?type=Pompes vide-fut'
  },
  {
    name: 'Anti-incendie',
    href: '/produits?type=anti-incendie'
  },
  {
    name: 'Moto-pompes',
    href: '/produits?type=Moto-pompes'
  },
  {
    name: 'Anti-belier',
    href: '/produits?type=Anti-belier'
  },
  {
    name: 'Station de relevage',
    href: '/produits?type=Station-de-relevage'
  },
  {
    name: 'Stations d\'épuration',
    href: '/produits?type=Stations-d-epuration'
  }
];

export default function NavMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <img
                className="h-12 w-auto"
                src="/images/logo.png"
                alt="Alphas Pompes"
              />
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden sm:flex sm:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === item.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative inline-block text-left">
              <Link
                href="/produits"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === '/produits'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary'
                }`}
              >
                Nos Produits
              </Link>
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex sm:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <img
                  className="h-8 w-auto"
                  src="/images/logo.png"
                  alt="Alphas Pompes"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === item.href
                          ? 'text-primary bg-gray-50'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/produits"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === '/produits'
                        ? 'text-primary bg-gray-50'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nos Produits
                  </Link>
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === product.href
                          ? 'text-primary bg-gray-50'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
