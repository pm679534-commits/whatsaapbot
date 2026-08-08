import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'WhatsApp AI Bot — Biznesiniz üçün 24/7 Satış Assistenti',
  description:
    'Müştərilərinizin suallarını avtomatik cavablandırın, CRM-i özü dolduran AI qurun, abunəni bir kliklə idarə edin.',
  keywords: ['whatsapp bot', 'ai chatbot', 'azerbaycan', 'biznes avtomatlaşdırma', 'crm'],
  openGraph: {
    title: 'WhatsApp AI Bot — Biznesiniz üçün 24/7 Satış Assistenti',
    description: 'Müştərilərinizin suallarını avtomatik cavablandırın, CRM-i özü dolduran AI qurun.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${geistSans.variable}`}>
      <body className="font-[family-name:var(--font-geist-sans)] antialiased">
        {children}

        {/* Facebook SDK — loaded after page is interactive */}
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined' && window.FB) {
              window.FB.init({
                appId: process.env.NEXT_PUBLIC_META_APP_ID,
                version: 'v23.0',
              })
            }
          }}
        />
      </body>
    </html>
  )
}
