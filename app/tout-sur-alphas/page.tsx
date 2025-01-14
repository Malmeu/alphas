import Image from 'next/image'
import Link from 'next/link'

const values = [
  { name: 'Positivité', description: 'Une approche positive dans tous nos projets' },
  { name: 'Ambition', description: 'Repousser nos limites pour l\'excellence' },
  { name: 'Esprit d\'équipe', description: 'Travailler ensemble pour atteindre nos objectifs' },
  { name: 'Intégrité', description: 'Des valeurs éthiques fortes dans toutes nos actions' },
  { name: 'Excellence', description: 'La recherche constante de la qualité' },
]

const objectives = [
  {
    title: 'Solutions Complètes',
    description: 'Fournir des solutions de pompage complètes avec une gamme diversifiée de produits répondant aux besoins variés de nos clients.',
  },
  {
    title: 'Qualité & Prix',
    description: 'Maintenir des normes de qualité élevées tout en offrant des prix compétitifs sur le marché.',
  },
  {
    title: 'Service Client',
    description: 'Un service après-vente impeccable et des interventions rapides dans toute l\'Algérie.',
  },
  {
    title: 'Innovation',
    description: 'Développement et fabrication de solutions personnalisées selon les exigences spécifiques.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ALPHAS POMPES
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Plus de 28 ans de succès dans le domaine du pompage des fluides
            </p>
          </div>
        </div>
      </div>

      {/* History section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">Notre Histoire</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Depuis 1996
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Fondée en 1996, ALPHAS POMPES s'est positionnée comme un acteur majeur et dynamique dans le domaine des pompes et équipements hydromécaniques en Algérie. Notre expertise s'étend de la distribution à la conception et à la production de solutions de pompage innovantes.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/hero.jpeg"
                alt="ALPHAS POMPES"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Nos Valeurs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ce qui nous définit
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col items-center text-center">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Deployment section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Déploiement</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Une présence nationale
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nous sommes fiers de notre présence étendue à travers le territoire national, avec des interventions rapides pour servir nos clients dans toutes les 58 wilayas. Notre ambition est d'étendre notre influence au-delà des frontières nationales.
            </p>
          </div>
        </div>
      </div>

      {/* Objectives section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Nos Objectifs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des ambitions fortes
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {objectives.map((objective) => (
                <div key={objective.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {objective.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{objective.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Chaque Jour Plus Forts
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Grâce à notre travail d'équipe, nous repoussons nos limites pour offrir le meilleur de nous-mêmes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contactez-nous
              </Link>
              <Link
                href="/produits"
                className="text-sm font-semibold leading-6 text-white"
              >
                Découvrir nos produits <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
