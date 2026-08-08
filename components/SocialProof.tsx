'use client'

import { motion } from 'framer-motion'

const businesses = [
  { icon: '🛋️', name: 'Mebel' },
  { icon: '💊', name: 'Aptek' },
  { icon: '🍽️', name: 'Restoran' },
  { icon: '👗', name: 'Geyim' },
  { icon: '🏗️', name: 'İnşaat' },
  { icon: '🚗', name: 'Avtomobil' },
]

export default function SocialProof() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-10"
        >
          BUNLARA GÜVƏNƏN BİZNESlƏR
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {businesses.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.06 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl group-hover:border-[#25D366]/30 transition-colors duration-200">
                {b.icon}
              </div>
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors font-medium">
                {b.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
