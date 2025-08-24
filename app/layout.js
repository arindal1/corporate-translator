import './globals.css'

export const metadata = {
  title: 'Corporate Translator',
  description: 'Simple text processing system for corporate communication enhancement. Transform casual language into professional corporate correspondence.',
  keywords: 'corporate, converter, professional, business, communication, retro, terminal',
  authors: [{ name: 'arindal1' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Corporate Translator',
    description: 'Simple text processing system for corporate communication enhancement. Transform casual language into professional corporate correspondence.',
    url: 'https://mycoolapp.com',
    siteName: 'Corporate Translator',
    images: [
      {
        url: 'public/image.png',
        width: 1200,
        height: 630,
        alt: 'Corporate Translator preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Translator',
    description: 'Simple text processing system for corporate communication enhancement. Transform casual language into professional corporate correspondence.',
    images: ['public/image.png'],
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0f1a" />
        <link rel="icon" type="image/svg+xml" href="public/ct.png"/>
      </head>
      <body className="min-h-screen font-terminal antialiased">
        {/* CRT Monitor Frame Effect */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent bg-[length:100px_100%] animate-pulse opacity-10"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,255,136,0.1)] rounded-lg"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
        </div>

        {/* Background Grid Pattern */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,136,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,255,136,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Root flex layout: main grows, footer sits after it */}
        <div className="flex flex-col min-h-screen relative z-10">
          {/* Main area (grows to fill available space) */}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>

          {/* Enhanced Footer (no huge mt; sits after content) */}
          <footer className="py-6 border-t border-terminal/20 bg-gradient-to-r from-transparent via-black/10 to-transparent">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 font-terminal text-xs text-muted flex-wrap justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="status-dot status-online"></div>
                    <span>SYSTEM READY</span>
                  </div>
                  <div className="opacity-50 hidden sm:block">|</div>
                  <div>© 2025 arindal1</div>
                  <div className="opacity-50 hidden sm:block">|</div>
                  <div className="flex items-center gap-1">
                    <span>POWERED BY</span>
                    <span className="text-terminal font-semibold">GEMINI_2.0</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-terminal text-xs text-muted flex-wrap justify-center lg:justify-end">
                  <div className="retro-badge">BETA</div>
                  <div>BUILD_2025.08.24</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-terminal animate-pulse"></div>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
