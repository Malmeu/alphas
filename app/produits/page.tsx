import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    name: 'Pompes',
    href: '/produits/pompes',
    description: 'Large gamme de pompes pour toutes applications industrielles',
    subcategories: [
      'Pompes centrifuges',
      'Pompes à engrenages',
      'Pompes à membrane',
      'Pompes doseuses',
      'Pompes submersibles',
    ],
  },
  {
    name: 'Vannes',
    href: '/produits/vannes',
    description: 'Vannes de régulation et de contrôle',
    subcategories: [
      'Vannes à papillon',
      'Vannes à boisseau',
      'Vannes de régulation',
      'Clapets anti-retour',
    ],
  },
  {
    name: 'Accessoires',
    href: '/produits/accessoires',
    description: 'Accessoires et pièces complémentaires',
    subcategories: [
      'Accouplements',
      'Garnitures mécaniques',
      'Joints',
      'Tuyauterie',
    ],
  },
]

export default function ProduitsPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Nos Produits
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez notre gamme complète de produits de haute qualité. Des solutions innovantes pour répondre à tous vos besoins en pompage et en contrôle des fluides.
            </p>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Catalogue</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Catégories de produits
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.name} className="group relative">
                <Link href={category.href}>
                  <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition-all group-hover:shadow-xl">
                    <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {category.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <li
                          key={subcategory}
                          className="text-sm text-gray-600"
                        >
                          • {subcategory}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
                      Voir les produits →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Avantages</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi choisir nos produits ?
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Qualité supérieure
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Tous nos produits sont fabriqués selon les normes les plus strictes et testés rigoureusement.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Support technique
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Une équipe d'experts à votre disposition pour vous conseiller et vous accompagner.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  Garantie étendue
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Tous nos produits sont couverts par une garantie étendue pour votre tranquillité d'esprit.
                  </p>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Nos experts sont à votre disposition pour vous guider dans le choix de vos produits.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contactez-nous
              </Link>
              <Link
                href="/documentation"
                className="text-sm font-semibold leading-6 text-white"
              >
                Documentation technique <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
