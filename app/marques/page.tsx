import Image from 'next/image'
import Link from 'next/link'

const brands = [
  {
    name: 'Marque 1',
    description: 'Leader mondial dans la fabrication de pompes industrielles',
    category: 'Pompes industrielles',
    logo: '/images/logo-alphas.png', // À remplacer par le vrai logo
    catalogLink: '#',
  },
  {
    name: 'Marque 2',
    description: 'Spécialiste des solutions de pompage pour l\'industrie chimique',
    category: 'Pompes chimiques',
    logo: '/images/logo-alphas.png', // À remplacer par le vrai logo
    catalogLink: '#',
  },
  // Ajouter d'autres marques ici
]

export default function MarquesPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Nos Marques Partenaires
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ALPHAS POMPES collabore avec les plus grandes marques mondiales pour vous offrir des solutions de qualité supérieure.
            </p>
          </div>
        </div>
      </div>

      {/* Brands grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Partenaires de confiance</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des marques reconnues mondialement
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 p-8"
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  className="max-h-12 w-auto"
                  src={brand.logo}
                  alt={brand.name}
                  width={180}
                  height={48}
                />
              </div>
              <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {brand.name}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">{brand.description}</p>
              <p className="mt-4 text-sm font-medium text-primary">{brand.category}</p>
              <Link
                href={brand.catalogLink}
                className="mt-6 flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Voir le catalogue
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Why choose our brands section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Qualité garantie</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi choisir nos marques ?
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Qualité certifiée
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Toutes nos marques partenaires sont certifiées selon les normes internationales les plus strictes.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Support technique
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Bénéficiez d'un support technique complet et d'une expertise approfondie sur tous nos produits.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Disponibilité
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Un large stock disponible et un réseau de distribution efficace pour répondre à vos besoins.
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
              Vous ne trouvez pas la marque que vous cherchez ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Contactez-nous pour découvrir notre catalogue complet de marques partenaires.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contactez-nous
              </Link>
              <Link
                href="/produits"
                className="text-sm font-semibold leading-6 text-white"
              >
                Voir tous nos produits <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
