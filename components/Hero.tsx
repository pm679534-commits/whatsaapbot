'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Check } from 'lucide-react'

const chatMessages = [
  { from: 'user', text: 'Salam, L şəkilli divan qalıbmı?', time: '10:42' },
  { from: 'bot', text: 'Salam! Bəli, L şəkilli divanımız mövcuddur 🛋️', time: '10:42' },
  { from: 'bot', text: 'Qiymət: 1,200 AZN. Rəng variantları: bej, antrasit, tünd mavi. Hansı rəngi bəyənirsiniz?', time: '10:42' },
  { from: 'user', text: 'Antrasit olsa yaxşıdır. Çatdırılma varmı?', time: '10:43' },
  { from: 'bot', text: 'Bakı daxili pulsuz çatdırılma mövcuddur 🚚 Sifariş üçün ünvanınızı bölüşün, rəsmiləşdirək!', time: '10:43' },
]

function ChatBubble({
  msg,
  delay,
}: {
  msg: (typeof chatMessages)[0]
  delay: number
}) {
  const isBot = msg.from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-xs font-bold text-white mr-2 mt-auto mb-0.5 flex-shrink-0">
          AI
        </div>
      )}
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'bg-[#1e2a1e] text-slate-100 rounded-tl-sm'
            : 'bg-[#25D366] text-white rounded-tr-sm'
        }`}
      >
        {msg.text}
        <span className="block text-right text-[10px] mt-1 opacity-60">
          {msg.time} {!isBot && <Check className="inline w-3 h-3" />}
        </span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-mesh">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-[-200px] w-[600px] h-[600px] rounded-full bg-[#25D366]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-150px] w-[500px] h-[500px] rounded-full bg-[#128C7E]/6 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                SÜNİ İDRAK İLƏ GÜCLƏNDİRİLMİŞ
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Biznesnizin WhatsApp-ı{' '}
              <span className="gradient-text-green">24/7 Satış</span>{' '}
              <span className="gradient-text">Əməkdaşa Çevirin</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              Müştərilərinizin suallarını avtomatik cavablandırın, CRM-i özü dolduran AI qurun,
              abunəni bir kliklə idarə edin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/onboard"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20c45b] text-white font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.45)]"
              >
                Pulsuz Başlayın
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl border border-white/10 text-white font-medium text-base hover:bg-white/5 hover:border-white/20 transition-all duration-200">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </span>
                Demo İzlə
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-12 text-sm text-slate-500"
            >
              {['Quraşdırma 60 dəqiqə', 'Azərbaycan dilləri', 'Texniki dəstək'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — WhatsApp mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] sm:w-[360px]">
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] bg-[#111827] border-2 border-white/10 shadow-2xl overflow-hidden glow-green">
                {/* Status bar */}
                <div className="bg-[#075E54] px-5 pt-4 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-xs font-bold text-white shadow">
                      AI
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Mebel Evi Bot</p>
                      <p className="text-emerald-300 text-xs">Onlayn • Həmişə cavab verir</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div
                  className="px-3 py-4 flex flex-col gap-2 min-h-[340px]"
                  style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), linear-gradient(135deg, #0d1117 0%, #111c13 100%)" }}
                >
                  {chatMessages.map((msg, i) => (
                    <ChatBubble key={i} msg={msg} delay={0.6 + i * 0.25} />
                  ))}
                </div>

                {/* Input bar */}
                <div className="bg-[#1c2b1e] px-3 py-3 flex items-center gap-2 border-t border-white/5">
                  <div className="flex-1 bg-[#2a3b2c] rounded-full px-4 py-2.5 text-slate-500 text-sm">
                    Mesaj yazın...
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="absolute -bottom-4 -left-6 glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-lg">
                  ⚡
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Cavab vaxtı</p>
                  <p className="text-emerald-400 text-xs">&lt; 2 saniyə</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="absolute -top-4 -right-6 glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-lg">
                  🤖
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">AI Aktiv</p>
                  <p className="text-emerald-400 text-xs">24 saat / 7 gün</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
