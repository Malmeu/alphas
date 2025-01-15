import Image from 'next/image'
import Link from 'next/link'
import DivisionalStructure from '../components/DivisionalStructure'
import Partners from '../components/Partners'

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

      {/* Products Navigation */}
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center divide-x divide-white/30">
            <Link href="/produits/pompes-centrifuges" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Pompes Centrifuges
            </Link>
            <Link href="/produits/pompes-volumetriques" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Pompes Volumetriques
            </Link>
            <Link href="/produits/pompes-vide-fut" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Pompes vide fût
            </Link>
            <Link href="/produits/anti-incendie" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Anti incendie
            </Link>
            <Link href="/produits/moto-pompes" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Moto pompes
            </Link>
            <Link href="/produits/anti-belier" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Anti bélier
            </Link>
            <Link href="/produits/stations-relevage" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Stations de relevage
            </Link>
            <Link href="/produits/stations-epuration" className="text-center px-4 py-4 hover:bg-white/10 flex-1 whitespace-nowrap">
              Stations d'épuration
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
          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {/* Première ligne : 5 éléments */}
              <Link href="/domaines/industrie" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M3 18H21M6 18V13M10 18V13M14 18V13M18 18V13M21 9L12 3L3 9H21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Industrie</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>
              
              <Link href="/domaines/pharmacies-cosmetique" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Pharmacies & Cosmetique</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              <Link href="/domaines/anti-incendie" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7V13M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Anti-incendie</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              <Link href="/domaines/agroalimentaire" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Agroalimentaire</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              <Link href="/domaines/agriculture-irrigation" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V21M3 12H21M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Agriculture & Irrigation</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              {/* Deuxième ligne : 3 éléments centrés */}
              <div className="lg:col-start-2">
                <Link href="/domaines/eau-environnement" className="group relative">
                  <div className="flex flex-col items-center">
                    <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V21M3 12H21M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Eau & Environnement</h3>
                    <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                  </div>
                </Link>
              </div>

              <Link href="/domaines/mines-carriere" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L3 9L12 15L21 9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 15L12 21L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Mines & Carriere</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              <Link href="/domaines/batiment-tp" className="group relative">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Batiment & TP</h3>
                  <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                </div>
              </Link>

              {/* Troisième ligne : 1 élément centré */}
              <div className="lg:col-start-3 lg:col-span-1">
                <Link href="/domaines/gaz-oil" className="group relative">
                  <div className="flex flex-col items-center">
                    <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V21M3 12H21M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-primary">Gaz & Oil</h3>
                    <div className="mt-1 h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"/>
                  </div>
                </Link>
              </div>
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

      {/* Domaines section */}
    </>
  )
}
