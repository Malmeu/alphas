'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const menuItems = [
  {
    name: 'Domaines d\'activité',
    type: 'dropdown',
    items: [
      'Industrie',
      'Gaz & Oil',
      'Agriculture',
      'Bâtiment et TP',
      'Anti-incendies',
      'Stations de relevage',
      'Stations d\'épuration',
      'Système d\'irrigation',
      'Pharmacie et Cosmétique'
    ]
  },
  {
    name: 'Produits',
    type: 'dropdown',
    items: [
      'Pompes centrifuges',
      'Pompes vide fût',
      'Anti Belier',
      'Moto pompes',
      'Stations d\'epuration',
      'Station de relevage'
    ]
  },
  {
    name: 'Marques',
    type: 'dropdown',
    items: [
      'Oflow',
      'Orex',
      'Al Demating',
      'Al fire',
    ]
  },
  {
    name: 'Tout sur Alphas',
    href: '/tout-sur-alphas',
  },
  {
    name: 'Actualité',
    href: '/actualite',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
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
        </div>
        
        <div className="flex gap-x-8">
          {menuItems.map((item) => (
            <Fragment key={item.name}>
              {item.type === 'dropdown' ? (
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="group flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                        {item.name}
                        <ChevronDownIcon 
                          className={classNames(
                            "h-5 w-5 transition-transform duration-200",
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
                        <Menu.Items className="absolute left-0 z-10 mt-3 w-72 origin-top-left rounded-xl bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="grid gap-1">
                            {item.items.map((subItem) => (
                              <Menu.Item key={subItem}>
                                {({ active }) => (
                                  <Link
                                    href={`/${item.name.toLowerCase().replace(/'/g, '').replace(/ /g, '-')}/${subItem.toLowerCase().replace(/ /g, '-').replace(/&/g, 'et')}`}
                                    className={classNames(
                                      active ? 'bg-primary/5 text-primary' : 'text-gray-700',
                                      'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary whitespace-nowrap'
                                    )}
                                  >
                                    {subItem}
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
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </Fragment>
          ))}
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
