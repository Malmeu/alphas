import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    name: 'Pompes centrifuges',
    description: 'Idéales pour le transfert de liquides dans les processus industriels.',
  },
  {
    name: 'Pompes à engrenages',
    description: 'Pour les fluides visqueux et les applications à haute pression.',
  },
  {
    name: 'Pompes à membrane',
    description: 'Parfaites pour les fluides corrosifs et les produits chimiques.',
  },
  {
    name: 'Pompes doseuses',
    description: 'Pour un dosage précis des produits chimiques et additifs.',
  },
]

const applications = [
  'Industrie chimique',
  'Industrie pétrochimique',
  'Papeteries',
  'Sidérurgie',
  'Textile',
  'Traitement de surface',
]

export default function IndustriePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Solutions pour l'Industrie
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ALPHAS POMPES propose une large gamme de solutions de pompage adaptées aux besoins spécifiques de l'industrie. 
              Nos équipements répondent aux exigences les plus strictes en matière de performance, de fiabilité et de sécurité.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/produits"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Voir nos produits
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Contactez-nous <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Image
                src="/images/hero.jpeg"
                alt="Solutions industrielles"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Solutions complètes</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nos équipements pour l'industrie
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez notre gamme complète de pompes et équipements spécialement conçus pour répondre aux besoins de l'industrie.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Applications section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Applications</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Secteurs d'application
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nos solutions sont utilisées dans de nombreux secteurs industriels
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <div
                key={application}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{application}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 mb-24">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Besoin d'une solution sur mesure ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Nos experts sont à votre disposition pour vous aider à choisir la solution la plus adaptée à vos besoins.
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
              Voir nos produits <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
