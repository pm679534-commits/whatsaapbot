import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import FacebookSDK from '@/components/FacebookSDK'
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

        {/* Facebook SDK — client component handles the onLoad event handler */}
        <FacebookSDK />
      </body>
    </html>
  )
}
