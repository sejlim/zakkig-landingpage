import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/en/legal')({
  head: () => ({
    meta: [
      { title: 'zakkig: Legal Notice' },
      { name: 'robots', content: 'noindex, follow' },
      { name: 'description', content: 'Legal Notice of zakkig.' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'zakkig: Legal Notice' },
      { property: 'og:description', content: 'Legal Notice of zakkig.' },
      { property: 'og:image', content: '/media/full.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://zakkig.de/en/legal' }],
  }),
  component: Legal,
})

function Legal() {
  return (
    <div className="bg-black text-white min-h-screen pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-8">
          <Link
            to="/en/"
            className="text-xs md:text-sm tracking-widest font-bold uppercase text-zinc-500 hover:text-white transition-colors duration-200"
          >
            Back to home
          </Link>
        </div>
        <article className="prose-sm prose-invert lg:prose lg:prose-invert max-w-3xl focus:outline-none">
          <h1>Legal Notice</h1>
          <p>Information provided according to § 5 DDG</p>
          <p>
            Selim Eser
            <br />
            Dannstadter Straße 6-8
            <br />
            68199 Mannheim
            <br />
            Germany
          </p>
          <p>
            <strong>Represented by:</strong>
            <br />
            Selim Eser
          </p>
          <p>
            <strong>Contact:</strong>
            <br />
            Phone:{' '}
            <a href="tel:+4962186037315" className="text-white hover:underline">
              +49-621 86037315
            </a>
            <br />
            Email:{' '}
            <a
              href="mailto:selim@zakkig.de"
              className="text-white hover:underline"
            >
              selim@zakkig.de
            </a>
          </p>
          <p>
            <strong>
              Consumer dispute resolution / Universal arbitration board
            </strong>
            <br />
            We do not participate in dispute resolution proceedings before a
            consumer arbitration board and are not obliged to do so.
          </p>
          <p>
            Privacy Policy:{' '}
            <a
              href="https://zakkig.de/en/privacy"
              className="text-white hover:underline"
            >
              https://www.zakkig.de/en/privacy
            </a>
          </p>
        </article>
      </div>
    </div>
  )
}
