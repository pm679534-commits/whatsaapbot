'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Mövcud WhatsApp Business nömrəmi qoşa bilərəm?',
    a: 'Bəli, mövcud WhatsApp Business nömrənizi birbaşa qoşa bilərsiniz. Proses 60 saniyə çəkir — sadəcə Facebook hesabınızla giriş edib nömrənizi seçirsiniz.',
  },
  {
    q: 'Bot Azərbaycan dilindəmi danışır?',
    a: 'Bəli, bot yalnız Azərbaycan dilində danışır. Gələcəkdə Rus və İngilis dil dəstəyi də əlavə ediləcək.',
  },
  {
    q: 'Ödənişi dayandırsam nə olur?',
    a: 'Ödəniş müddəti bitdikdə bot avtomatik dayanır, lakin bütün məlumatlarınız (müştəri bazası, söhbət tarixi) silinmir. Abunəni yeniləyəndə bot dərhal aktivləşir.',
  },
  {
    q: "Meta-da ayrıca qeydiyyat lazımdırmı?",
    a: 'Xeyr, siz sadəcə mövcud Facebook/WhatsApp hesabınızla giriş edirsiniz. Onboarding prosesi zamanı icazələr avtomatik tənzimlənir.',
  },
  {
    q: 'Bot eyni anda neçə müştəriyə xidmət göstərə bilir?',
    a: 'Limitsiz — bot eyni anda yüzlərlə söhbəti paralel idarə edir. WhatsApp Cloud API infrastrukturundan istifadə etdiyimiz üçün heç bir darboğaz yoxdur.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`rounded-xl border transition-all duration-200 ${
        open
          ? 'glass-card border-[#25D366]/25 shadow-[0_0_20px_rgba(37,211,102,0.07)]'
          : 'glass-card border-white/8 hover:border-white/15'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm sm:text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-slate-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Tez-tez verilən suallar
          </h2>
          <p className="text-slate-400">
            Cavab tapa bilməsəniz,{' '}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '994775250891'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
            >
              WhatsApp üzərindən yazın
            </a>
            .
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
