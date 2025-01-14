import Image from 'next/image'
import Link from 'next/link'

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
]

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover"
            src="/images/hero.jpeg"
            alt="ALPHAS POMPES"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-primary mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Solutions de pompage innovantes
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-100">
            ALPHAS POMPES est votre partenaire de confiance pour tous vos besoins en pompes industrielles et solutions de pompage.
          </p>
          <div className="mt-10 flex gap-x-6">
            <Link
              href="/produits"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Nos produits
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>

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
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {domains.map((domain) => (
                <Link
                  key={domain.name}
                  href={domain.href}
                  className="group relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{domain.icon}</span>
                    <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                      {domain.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
