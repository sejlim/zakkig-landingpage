import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../components/MainPage'
import { translations } from '../lib/i18n'

const de = translations.de

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: de.metaTitle },
      {
        name: 'description',
        content: de.metaDescription,
      },
      { property: 'og:locale', content: 'de_DE' },
      { property: 'og:locale:alternate', content: 'en_US' },
      {
        property: 'og:title',
        content: de.metaTitle,
      },
      {
        property: 'og:description',
        content: de.metaDescription,
      },
      { property: 'og:image', content: '/media/full.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://zakkig.de/' },
      { rel: 'alternate', href: 'https://zakkig.de/', hrefLang: 'de' },
      { rel: 'alternate', href: 'https://zakkig.de/en/', hrefLang: 'en' },
      { rel: 'alternate', href: 'https://zakkig.de/', hrefLang: 'x-default' },
    ],
  }),
  component: MainPage,
})
