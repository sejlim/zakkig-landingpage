import { HeadContent, Link, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/media/icon.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/media/icon.png',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })

  const isEn = pathname.startsWith('/en')

  const validPaths = [
    '/',
    '/impressum',
    '/datenschutz',
    '/en',
    '/en/',
    '/en/legal',
    '/en/privacy',
  ]
  const showHeader = validPaths.includes(pathname)

  // Helper to determine target paths for language toggle
  let deTarget = '/'
  let enTarget = '/en'

  if (pathname === '/impressum' || pathname === '/en/legal') {
    deTarget = '/impressum'
    enTarget = '/en/legal'
  } else if (pathname === '/datenschutz' || pathname === '/en/privacy') {
    deTarget = '/datenschutz'
    enTarget = '/en/privacy'
  }

  return (
    <html lang={isEn ? 'en' : 'de'}>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased text-white bg-black selection:bg-white selection:text-black">
        {/* Transparent Non-Sticky Header */}
        {showHeader && (
          <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-10 max-w-7xl mx-auto">
            <Link to={isEn ? '/en' : '/'} className="flex items-center">
              <img
                src="/media/full.svg"
                alt="zakkig Logo"
                className="h-7 w-auto block"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <nav className="flex items-center space-x-3 text-xs md:text-sm tracking-widest font-bold">
              <Link
                to={deTarget}
                className={`transition-opacity duration-200 ${
                  !isEn
                    ? 'opacity-100 underline underline-offset-4 decoration-1'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                DE
              </Link>
              <span className="opacity-30">/</span>
              <Link
                to={enTarget}
                className={`transition-opacity duration-200 ${
                  isEn
                    ? 'opacity-100 underline underline-offset-4 decoration-1'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                EN
              </Link>
            </nav>
          </header>
        )}

        {/* Page Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
