'use client'

import Link from 'next/link'
import Image from 'next/image'

const navigation = {
  solutions: [
    { name: 'Industrie', href: '/domaines/industrie' },
    { name: 'Pharmacies & Cosmetique', href: '/domaines/pharmacies-cosmetique' },
    { name: 'Anti-incendie', href: '/domaines/anti-incendie' },
    { name: 'Agroalimentaire', href: '/domaines/agroalimentaire' },
  ],
  produits: [
    { name: 'Pompes', href: '/produits/pompes' },
    { name: 'Vannes', href: '/produits/vannes' },
    { name: 'Accessoires', href: '/produits/accessoires' },
    { name: 'Pièces détachées', href: '/produits/pieces-detachees' },
  ],
  entreprise: [
    { name: 'À propos', href: '/tout-sur-alphas' },
    { name: 'Actualités', href: '/actualite' },
    { name: 'Marques', href: '/marques' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Image
              className="h-12 w-auto"
              src="/images/logo-alphas.png"
              alt="Alphas Pompes"
              width={180}
              height={48}
            />
            <p className="text-sm leading-6 text-gray-300">
              Votre partenaire de confiance pour tous vos besoins en pompes industrielles et solutions de pompage.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Produits</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.produits.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Entreprise</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.entreprise.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <p className="text-sm leading-6 text-gray-300">
                      Cité 112 logements, Quartier Seghir<br />
                      Bâtiment 3, BP 488 Liberté<br />
                      Béjaïa, Algérie
                    </p>
                  </li>
                  <li>
                    <p className="text-sm leading-6 text-gray-300">
                      Tél: +213 34 12 60 54<br />
                      Fax: +213 34 12 60 53
                    </p>
                  </li>
                  <li>
                    <a href="mailto:contact@alphaspompes.com" className="text-sm leading-6 text-gray-300 hover:text-white">
                      contact@alphaspompes.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} ALPHAS POMPES. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
