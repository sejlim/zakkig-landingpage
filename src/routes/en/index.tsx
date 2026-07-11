import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../../components/MainPage'
import { translations } from '../../lib/i18n'

const en = translations.en

export const Route = createFileRoute('/en/')({
  head: () => ({
    meta: [
      { title: en.metaTitle },
      {
        name: 'description',
        content: en.metaDescription,
      },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:locale:alternate', content: 'de_DE' },
      {
        property: 'og:title',
        content: en.metaTitle,
      },
      {
        property: 'og:description',
        content: en.metaDescription,
      },
      { property: 'og:image', content: '/media/full.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: 'https://zakkig.de/en/' },
      { rel: 'alternate', href: 'https://zakkig.de/', hrefLang: 'de' },
      { rel: 'alternate', href: 'https://zakkig.de/en/', hrefLang: 'en' },
      {
        rel: 'alternate',
        href: 'https://zakkig.de/en/',
        hrefLang: 'x-default',
      },
    ],
  }),
  component: MainPage,
})
