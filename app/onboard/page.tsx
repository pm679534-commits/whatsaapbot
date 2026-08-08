import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import OnboardingFlow from '@/components/OnboardingFlow'

export const metadata: Metadata = {
  title: 'Qeydiyyat — WABot',
  description: 'WhatsApp AI botunuzu qurun. 3 addımda, 60 dəqiqədə.',
}

export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* Decorative blobs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#25D366]/5 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#128C7E]/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-4 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            WA<span className="text-[#25D366]">Bot</span>
          </span>
        </Link>
        <p className="text-slate-500 text-sm hidden sm:block">
          Artıq hesabınız var?{' '}
          <a
            href="https://wa.me/994775250891"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Dəstəklə əlaqə
          </a>
        </p>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="glass-card rounded-2xl border border-white/8 p-8 sm:p-10">
            <OnboardingFlow />
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            Qeydiyyatdan keçməklə{' '}
            <Link href="/privacy" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
              Məxfilik Siyasətimizi
            </Link>{' '}
            qəbul etmiş olursunuz.
          </p>
        </div>
      </main>
    </div>
  )
}
