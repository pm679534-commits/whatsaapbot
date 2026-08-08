'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Qeydiyyatdan keçin',
    desc: 'Şirkət məlumatlarınızı daxil edin, WhatsApp nömrənizi 60 saniyədə qoşun',
    icon: '📝',
  },
  {
    number: '02',
    title: 'Kataloqu yükləyin',
    desc: 'Məhsul və qiymətlərinizi göndərin, AI hər şeyi öyrənsin',
    icon: '📦',
  },
  {
    number: '03',
    title: 'Botunuz işə başlayır',
    desc: 'Müştəriləriniz yazar, bot cavablar, siz nəticələri izləyirsiniz',
    icon: '🚀',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      {/* Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#25D366]/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            NECƏ İŞLƏYİR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-5">
            3 addımda aktiv olun
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Texniki bilik lazım deyil. Qeydiyyatdan botun işə başlamasına qədər 60 dəqiqə.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-[#25D366]/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl glass-card border border-[#25D366]/20 flex items-center justify-center text-3xl glow-green shadow-lg">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center">
                  {step.number.replace('0', '')}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
