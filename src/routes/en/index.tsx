import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../../components/MainPage'

export const Route = createFileRoute('/en/')({
  head: () => ({
    meta: [
      { title: 'zakkig: Let your customers order themselves' },
      {
        name: 'description',
        content: 'Whether for takeout or at the table, offer your customers a digital way to order and pay.',
      },
      { property: 'og:title', content: 'zakkig: Let your customers order themselves' },
      {
        property: 'og:description',
        content: 'Whether for takeout or at the table, offer your customers a digital way to order and pay.',
      },
      { property: 'og:image', content: '/media/full.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: MainPage,
})
