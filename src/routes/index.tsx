import { createFileRoute } from '@tanstack/react-router'
import { MainPage } from '../components/MainPage'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'zakkig: Lass deine Kunden selbst bestellen' },
      {
        name: 'description',
        content: 'Egal ob zum Mitnehmen oder am Tisch, biete deinen Kunden eine digitale Möglichkeit zum Bestellen und Bezahlen.',
      },
      { property: 'og:title', content: 'zakkig: Lass deine Kunden selbst bestellen' },
      {
        property: 'og:description',
        content: 'Egal ob zum Mitnehmen oder am Tisch, biete deinen Kunden eine digitale Möglichkeit zum Bestellen und Bezahlen.',
      },
      { property: 'og:image', content: '/media/full.jpg' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: MainPage,
})
