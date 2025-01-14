import Link from 'next/link'

const domains = [
  {
    name: 'Industrie',
    href: '/domaines/industrie',
    icon: '🏭',
    description: 'Solutions de pompage pour tous types d\'industries : chimique, pétrochimique, papeterie, etc.',
  },
  {
    name: 'Pharmacies & Cosmetique',
    href: '/domaines/pharmacies-cosmetique',
    icon: '💊',
    description: 'Pompes et systèmes adaptés aux exigences strictes de l\'industrie pharmaceutique et cosmétique.',
  },
  {
    name: 'Anti-incendie',
    href: '/domaines/anti-incendie',
    icon: '🧯',
    description: 'Systèmes de pompage pour la protection contre l\'incendie conformes aux normes de sécurité.',
  },
  {
    name: 'Agroalimentaire',
    href: '/domaines/agroalimentaire',
    icon: '🏭',
    description: 'Solutions pour le transfert de produits alimentaires respectant les normes d\'hygiène.',
  },
  {
    name: 'Agriculture & Irrigation',
    href: '/domaines/agriculture-irrigation',
    icon: '🌾',
    description: 'Pompes pour l\'irrigation et l\'agriculture, optimisées pour une utilisation intensive.',
  },
  {
    name: 'Eau & Environnement',
    href: '/domaines/eau-environnement',
    icon: '💧',
    description: 'Solutions pour le traitement de l\'eau et la protection de l\'environnement.',
  },
  {
    name: 'Mines & Carriere',
    href: '/domaines/mines-carriere',
    icon: '⛏️',
    description: 'Pompes robustes pour les applications minières et l\'extraction en carrière.',
  },
  {
    name: 'Batiment & TP',
    href: '/domaines/batiment-tp',
    icon: '🏗️',
    description: 'Équipements de pompage pour le secteur de la construction et des travaux publics.',
  },
  {
    name: 'Gaz & Oil',
    href: '/domaines/gaz-oil',
    icon: '⛽',
    description: 'Solutions spécialisées pour l\'industrie pétrolière et gazière.',
  },
]

export default function DomainesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Nos domaines d'expertise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Solutions adaptées à chaque secteur
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez nos solutions spécialisées pour chaque secteur d'activité. Notre expertise nous permet de répondre aux exigences spécifiques de votre industrie.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {domains.map((domain) => (
              <Link
                key={domain.name}
                href={domain.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-start">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <span className="text-3xl">{domain.icon}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-7 tracking-tight text-gray-900">
                    {domain.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {domain.description}
                  </p>
                  <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
                    En savoir plus →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
