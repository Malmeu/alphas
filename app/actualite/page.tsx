import Image from 'next/image'
import Link from 'next/link'

// Ces données devraient venir de Supabase dans une implémentation réelle
const news = [
  {
    id: 1,
    title: 'Nouveau partenariat stratégique',
    description: 'ALPHAS POMPES annonce un nouveau partenariat stratégique pour étendre sa gamme de solutions.',
    date: '2024-01-14',
    category: 'Entreprise',
    image: '/images/hero.jpeg',
  },
  {
    id: 2,
    title: 'Innovation dans le pompage industriel',
    description: 'Découvrez notre nouvelle gamme de pompes à haut rendement énergétique.',
    date: '2024-01-10',
    category: 'Produits',
    image: '/images/hero.jpeg',
  },
  {
    id: 3,
    title: 'Expansion régionale',
    description: 'ALPHAS POMPES renforce sa présence dans le sud du pays avec un nouveau centre de service.',
    date: '2024-01-05',
    category: 'Développement',
    image: '/images/hero.jpeg',
  },
]

const categories = [
  { name: 'Tous', count: 12 },
  { name: 'Entreprise', count: 4 },
  { name: 'Produits', count: 3 },
  { name: 'Développement', count: 2 },
  { name: 'Événements', count: 3 },
]

export default function ActualitePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Actualités
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Restez informé des dernières nouvelles et développements d'ALPHAS POMPES
            </p>
          </div>
        </div>
      </div>

      {/* News section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Categories filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary hover:text-white"
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-x-4">
                    <time dateTime={item.date} className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-6 text-gray-900">
                    <Link href={`/actualite/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/actualite/${item.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-16 flex items-center justify-center">
            <ul className="flex items-center gap-2">
              <li>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Précédent
                </button>
              </li>
              <li>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  1
                </button>
              </li>
              <li>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
              </li>
              <li>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
              </li>
              <li>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Restez informé
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-gray-300">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et mises à jour.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Entrez votre email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
