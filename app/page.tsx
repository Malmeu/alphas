import Image from 'next/image'
import Link from 'next/link'
import DivisionalStructure from '../components/DivisionalStructure'
import Partners from '../components/Partners'
import NavMenu from '../components/NavMenu'
import { Fragment } from 'react'

const domains = [
  {
    name: 'Industrie',
    href: '/domaines/industrie',
    icon: '🏭',
  },
  {
    name: 'Pharmacies & Cosmetique',
    href: '/domaines/pharmacies-cosmetique',
    icon: '💊',
  },
  {
    name: 'Anti-incendie',
    href: '/domaines/anti-incendie',
    icon: '🧯',
  },
  {
    name: 'Agroalimentaire',
    href: '/domaines/agroalimentaire',
    icon: '🏭',
  },
  {
    name: 'Agriculture & Irrigation',
    href: '/domaines/agriculture-irrigation',
    icon: '🌾',
  },
  {
    name: 'Eau & Environnement',
    href: '/domaines/eau-environnement',
    icon: '💧',
  },
  {
    name: 'Mines & Carriere',
    href: '/domaines/mines-carriere',
    icon: '⛏️',
  },
  {
    name: 'Batiment & TP',
    href: '/domaines/batiment-tp',
    icon: '🏗️',
  },
  {
    name: 'Gaz & Oil',
    href: '/domaines/gaz-oil',
    icon: '⛽',
  },
  {
    name: 'Service Après-Vente',
    href: '/alphas-service',
    icon: '🔧',
  }
]

const products = [
  'Pompes Centrifuges',
  'Pompes Volumetriques',
  'Pompes vide fût',
  'Anti incendie',
  'Moto pompes',
  'Anti bélier',
  'Stations de relevage',
  'Stations d\'épuration',
]

export default function Home() {
  return (
    <>
      {/* Banner section */}
      <div className="relative h-screen">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero2.jpeg"
            alt="ALPHAS POMPES"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full"
            style={{ objectPosition: '50% 50%' }}
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 flex items-center justify-center h-full pb-32">
          <div className="flex justify-center space-x-4">
            <Link
              href="/contact"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Contactez-nous
            </Link>
            <Link
              href="/tout-sur-alphas"
              className="rounded-md bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>

      {/* Products navigation */}
      <NavMenu />

      {/* Domaines section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Expertise multisectorielle</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choisissez votre domaine d'activité
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ALPHAS POMPES est fier de ses solides racines dans la fabrication et l'ingénierie. Notre usine de fabrication sophistiquée nous permet de fournir des solutions innovantes dans de multiples secteurs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {domains.map((domain, index) => (
                <Link key={domain.name} href={domain.href} className="group relative">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 text-primary flex items-center justify-center">
                      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {domain.name === 'Industrie' && (
                          <path d="M3 21H21M3 18H21M6 18V13M10 18V13M14 18V13M18 18V13M21 9L12 3L3 9H21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Pharmacies & Cosmetique' && (
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Anti-incendie' && (
                          <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z M12 7V13M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        )}
                        {domain.name === 'Agroalimentaire' && (
                          <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        )}
                        {domain.name === 'Agriculture & Irrigation' && (
                          <path d="M12 3V21M3 12H21M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Eau & Environnement' && (
                          <path d="M12 3L20 18H4L12 3Z M12 12L16 20H8L12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Mines & Carriere' && (
                          <path d="M12 3L3 9L12 15L21 9L12 3Z M3 15L12 21L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Batiment & TP' && (
                          <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Gaz & Oil' && (
                          <path d="M12 3L19 8V16L12 21L5 16V8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                        {domain.name === 'Service Après-Vente' && (
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                      </svg>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">{domain.name}</h3>
                    <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Histoire section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-6xl font-bold tracking-tight text-primary mb-4">
                Depuis 1996
              </h2>
              <p className="text-2xl font-semibold text-gray-900 mb-6">
                +28 ans de succès & d'innovations
              </p>
              <p className="text-lg leading-8 text-gray-600 mb-8">
                ALPHAS POMPES célèbre plus de 28 ans de succès dans le domaine du pompage des fluides grâce à ses solutions de qualité.
              </p>
              <p className="text-lg leading-8 text-gray-600">
                Fondée en 1996, ALPHAS POMPES se positionne comme un acteur majeur et dynamique dans le domaine des pompes et équipements hydromécaniques en Algérie. Notre expertise s'étend de la distribution à la conception et à la production de solutions de pompage innovantes. Nous offrons également des services de maintenance et de réparation de premier plan pour les pompes et moteurs électriques, ainsi que la réalisation de travaux hydrauliques.
              </p>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/pompe.png"
                alt="ALPHAS POMPES depuis 1996"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Structure Divisionnelle section */}
      <DivisionalStructure />

      {/* Partners section */}
      <Partners />
    </>
  )
}
