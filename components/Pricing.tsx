'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Başlanğıc',
    setup: '300',
    monthly: '100',
    badge: null,
    features: [
      '1 WhatsApp nömrəsi',
      'Aylıq 3,000 mesaj',
      'AI cavab + CRM',
      'Standart dəstək',
      '60 dəq. quraşdırma',
    ],
    cta: 'Başlanğıc Seçin',
    highlight: false,
  },
  {
    name: 'Biznes',
    setup: '800',
    monthly: '200',
    badge: 'Ən Populyar',
    features: [
      '3 WhatsApp nömrəsi',
      'Limitsiz mesaj',
      'AI cavab + CRM',
      'Prioritet dəstək',
      'Xüsusi AI persona',
      'Analitika paneli',
    ],
    cta: 'Biznes Seçin',
    highlight: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            QİYMƏTLƏR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-5">
            Şəffaf, sürprizsiz qiymət
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Bir dəfəlik quraşdırma haqqı + aylıq abunə. Heç bir gizli xərc yoxdur.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#0d2016] to-[#0F1629] border-2 border-[#25D366]/40 glow-green shadow-2xl'
                  : 'glass-card border border-white/8 hover:border-white/16'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Zap className="w-3 h-3" />
                  {plan.badge}
                </span>
              )}

              <div className="mb-8">
                <p className="text-slate-400 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.monthly}</span>
                  <span className="text-slate-400 text-sm mb-1.5">AZN/ay</span>
                </div>
                <p className="text-slate-500 text-sm">
                  + {plan.setup} AZN birdəfəlik quraşdırma
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#25D366]" strokeWidth={3} />
                    </span>
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/onboard"
                className={`block w-full text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-[#25D366] hover:bg-[#20c45b] text-white shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]'
                    : 'bg-white/8 hover:bg-white/14 text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 text-sm mt-8"
        >
          Ödənişi dayandırsanız, data silinmir. İstədiyiniz vaxt davam edə bilərsiniz.
        </motion.p>
      </div>
    </section>
  )
}
