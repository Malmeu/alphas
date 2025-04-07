'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Transition, Dialog, Disclosure } from '@headlessui/react';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

interface MenuItem {
  name: string;
  href?: string;
  type: 'link' | 'dropdown';
  items?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Accueil',
    href: '/',
    type: 'link'
  },
  {
    name: 'Produits',
    href: '/produits',
    type: 'link'
  },
  {
    name: 'Marques',
    type: 'dropdown',
    items: [
      { name: 'Oflow', href: '/marques/oflow' },
      { name: 'Al dewatering', href: '/marques/al-dewatering' },
      { name: 'Al fire', href: '/marques/al-fire' },
      { name: 'Flux', href: '/marques/flux' },
      { name: 'Verder', href: '/marques/verder' },
      { name: 'Someflu', href: '/marques/someflu' },
      { name: 'Flowserve', href: '/marques/flowserve' },
      { name: 'PCM', href: '/marques/pcm' },
      { name: 'Orex', href: '/marques/orex' }
    ]
  },
  {
    name: "Domaines d'activités",
    type: 'dropdown',
    items: [
      { name: 'Mine et carriere', href: '/domaines/mine-et-carriere' },
      { name: 'Batiement et TP', href: '/domaines/batiment-et-tp' },
      { name: 'Gaz et oil', href: '/domaines/gaz-et-oil' },
      { name: 'Anti incendie', href: '/domaines/anti-incendie' },
      { name: 'Agroalimentaire', href: '/domaines/agroalimentaire' },
      { name: 'Pharmacies & Cosmetique', href: '/domaines/pharmacie-cosmetique' },
      { name: 'Eau et environnement', href: '/domaines/eau-et-environnement' },
      { name: 'Industrie', href: '/domaines/industrie' },
      { name: 'Agriculture & Irrigation', href: '/domaines/agriculture-et-irrigation' }
    ]
  },
  {
    name: 'Alphas Service',
    href: '/alphas-service',
    type: 'link'
  },
  {
    name: 'Tout sur Alphas',
    href: '/tout-sur-alphas',
    type: 'link'
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Alphas</span>
            <div className="relative w-[180px] h-[60px]">
              <Image
                src="/images/logo-alphas.png"
                alt="ALPHAS POMPES"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>
          <div className="relative w-10 h-8 ml-2">
            <Image
              src="/algeria_flag.png"
              alt="Drapeau Algérien"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex items-center gap-x-1">
          {menuItems.map((item) => (
            <Fragment key={item.name}>
              {item.type === 'dropdown' ? (
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="group flex items-center gap-x-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all">
                        {item.name}
                        <ChevronDownIcon 
                          className={classNames(
                            "h-5 w-5 text-gray-400 group-hover:text-primary transition-all duration-200",
                            open ? "rotate-180" : ""
                          )} 
                          aria-hidden="true" 
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-72 origin-top-left rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="grid gap-1">
                            {item.items?.map((subItem) => (
                              <Menu.Item key={subItem.name}>
                                {({ active }) => (
                                  <Link
                                    href={subItem.href}
                                    className={classNames(
                                      active ? 'bg-gray-50 text-primary' : 'text-gray-700',
                                      'flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary'
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ) : null}
            </Fragment>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Menu mobile */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black/10 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Alphas</span>
              <div className="relative w-[140px] h-[45px]">
                <Image
                  src="/images/logo-alphas.png"
                  alt="ALPHAS POMPES"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-1 py-6">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.type === 'dropdown' ? (
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                              {item.name}
                              <ChevronDownIcon
                                className={classNames(
                                  open ? 'rotate-180 text-primary' : 'text-gray-400',
                                  'h-5 w-5 flex-none transition-all duration-200'
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-1 space-y-1">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg py-2 pl-8 pr-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
                        href={item.href || '/'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
