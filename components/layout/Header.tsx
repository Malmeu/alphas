'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Domaines d\'activité',
    href: '/domaines',
    submenu: [
      { name: 'Industrie', href: '/domaines/industrie' },
      { name: 'Pharmacies & Cosmetique', href: '/domaines/pharmacies-cosmetique' },
      { name: 'Anti-incendie', href: '/domaines/anti-incendie' },
      { name: 'Agroalimentaire', href: '/domaines/agroalimentaire' },
      { name: 'Agriculture & Irrigation', href: '/domaines/agriculture-irrigation' },
      { name: 'Eau & Environnement', href: '/domaines/eau-environnement' },
      { name: 'Mines & Carriere', href: '/domaines/mines-carriere' },
      { name: 'Batiment & TP', href: '/domaines/batiment-tp' },
      { name: 'Gaz & Oil', href: '/domaines/gaz-oil' },
    ]
  },
  {
    name: 'Produits',
    href: '/produits',
    submenu: [
      { name: 'Pompes', href: '/produits/pompes' },
      { name: 'Vannes', href: '/produits/vannes' },
      { name: 'Accessoires', href: '/produits/accessoires' },
    ]
  },
  { name: 'Marques', href: '/marques' },
  { name: 'Tout sur Alphas', href: '/tout-sur-alphas' },
  { name: 'Actualité', href: '/actualite' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Alphas Pompes</span>
            <Image
              className="h-12 w-auto"
              src="/images/logo-alphas.png"
              alt="Alphas Pompes"
              width={180}
              height={48}
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                {item.name}
              </Link>
              {item.submenu && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.name}
                      href={subitem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/contact" className="text-sm font-semibold leading-6 text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90">
            Contact
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Alphas Pompes</span>
              <Image
                className="h-8 w-auto"
                src="/images/logo-alphas.png"
                alt="Alphas Pompes"
                width={120}
                height={32}
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
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-1 mt-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-700 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary hover:bg-primary/90 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
