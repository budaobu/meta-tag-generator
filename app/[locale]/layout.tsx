import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { ShareButton } from '@/components/share-button'
import { defaultLocale, locales, ValidLocale } from '@/i18n/config'
import { DefaultSeo } from 'next-seo'
import Script from 'next/script'
import Image from 'next/image'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: ValidLocale
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params?.locale || defaultLocale
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DefaultSeo
            title="Meta Tag Generator"
            description="Generate Open Graph meta tags for your website"
            openGraph={{
              type: 'website',
              locale: locale,
              url: process.env.NEXT_PUBLIC_BASE_URL,
              siteName: 'Meta Tag Generator',
            }}
          />
          <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
              <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/logo.png"
                    alt="Website Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-semibold">Meta Tag Generator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShareButton />
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </div>
            </header>
            <main className="container py-8">{children}</main>
            <footer className="border-t">
              <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                  <Image
                    src="/logo.png"
                    alt="Meta Tag Generator Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p className="text-center text-sm leading-loose md:text-left">
                    Built by{" "}
                    <a
                      href="https://your-website.com"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      Your Name
                    </a>
                    . The source code is available on{" "}
                    <a
                      href="https://github.com/your-username/meta-tag-generator"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

