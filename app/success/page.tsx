'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center px-4">
      {/* Blobs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#25D366]/6 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#128C7E]/5 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
          <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white text-lg">
            WA<span className="text-[#25D366]">Bot</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl border border-[#25D366]/20 p-10 glow-green shadow-2xl">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-[#25D366]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-white mb-3">
              Botunuz hazırdır! 🎉
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              WhatsApp botunuz uğurla qoşuldu. Test nömrənizdən mesaj yazaraq botu sınaya bilərsiniz.
            </p>

            {/* Steps */}
            <div className="space-y-3 mb-8 text-left">
              {[
                'WhatsApp-ı açın',
                'Biznes nömrənizə mesaj göndərin',
                'AI-ın cavabını izləyin',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#25D366]/15 flex items-center justify-center text-xs font-bold text-[#25D366] flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 text-sm">{step}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '994775250891'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20c45b] text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle className="w-4 h-4" />
                Dəstəklə Əlaqə
              </a>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
              >
                Ana Səhifəyə Qayıt
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-xs text-slate-600">
          Suallarınız üçün{' '}
          <a href="mailto:info@wabot.az" className="text-slate-500 hover:text-slate-400">
            info@wabot.az
          </a>
        </p>
      </motion.div>
    </div>
  )
}
