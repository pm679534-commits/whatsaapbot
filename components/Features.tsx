'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '🤖',
    title: 'AI Satış Assistenti',
    desc: 'Müştəri suallarını anında, Azərbaycan dilində, peşəkarcasına cavablandırır',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-500/30',
  },
  {
    icon: '📊',
    title: 'Avtomatik CRM',
    desc: 'Müştəri adını, marağını, sifarişini AI özü bazaya yazır',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: '💳',
    title: 'Aylıq Abunə',
    desc: 'Ödəniş dayananda bot avtomatik dayanır. Yenilənəndə dərhal işə düşür',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'hover:border-violet-500/30',
  },
  {
    icon: '🔗',
    title: 'Öz Nömrənlə İşlə',
    desc: 'Mövcud WhatsApp Business nömrənizi bir dəqiqədə qoşun',
    color: 'from-orange-500/20 to-amber-500/10',
    border: 'hover:border-orange-500/30',
  },
  {
    icon: '🧠',
    title: 'Məhsul Kataloqu',
    desc: 'Katalogunuzu bir dəfə yükləyin, bot qiymətləri özü bilsin',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'hover:border-pink-500/30',
  },
  {
    icon: '🔔',
    title: 'Canlı Bildirişlər',
    desc: 'İnsan müdaxiləsi lazım olanda anında sizə xəbər verir',
    color: 'from-emerald-500/20 to-green-500/10',
    border: 'hover:border-emerald-500/30',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
            XÜSUSİYYƏTLƏR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-5">
            Hər şey bir platformada
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Müştəri xidmətindən satışa, CRM-dən analitikaya — hər şey avtomatik işləyir.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-6 border border-white/8 ${feat.border} transition-all duration-300 group`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-2xl mb-5`}
              >
                {feat.icon}
              </div>

              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
