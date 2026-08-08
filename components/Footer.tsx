'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Instagram, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-10 text-center mb-20 border border-[#25D366]/15 glow-green relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#25D366]/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Biznesinizi bu gün avtomatlaşdırın
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              İlk ayın abunəsi pulsuz. Kredit kartı tələb edilmir.
            </p>
            <Link
              href="/onboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20c45b] text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.45)]"
            >
              Pulsuz Başlayın
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center shadow">
                <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white text-lg">
                WA<span className="text-[#25D366]">Bot</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Azərbaycan bizneslərini süni intellektlə gücləndiririk. WhatsApp üzərindən satışı, CRM-i və müştəri xidmətini avtomatlaşdırırıq.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Məhsul</p>
            <ul className="space-y-2.5">
              {[
                { href: '#features', label: 'Xüsusiyyətlər' },
                { href: '#pricing', label: 'Qiymətlər' },
                { href: '#how-it-works', label: 'Necə İşləyir' },
                { href: '/onboard', label: 'Başlayın' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Hüquqi</p>
            <ul className="space-y-2.5">
              {[
                { href: '/privacy', label: 'Məxfilik Siyasəti' },
                { href: '#faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-white font-semibold text-sm mt-6 mb-3">Əlaqə</p>
            <div className="flex gap-3">
              <a
                href="mailto:info@wabot.az"
                className="w-8 h-8 rounded-lg glass-card border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                className="w-8 h-8 rounded-lg glass-card border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/994000000000"
                className="w-8 h-8 rounded-lg glass-card border border-white/8 flex items-center justify-center text-slate-500 hover:text-[#25D366] hover:border-[#25D366]/30 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} WABot. Bütün hüquqlar qorunur.
          </p>
          <p className="text-slate-700 text-xs">
            Meta Business Platform ilə işləyir
          </p>
        </div>
      </div>
    </footer>
  )
}
