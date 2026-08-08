import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Məxfilik Siyasəti — WABot',
  description: 'WABot məxfilik siyasəti — Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-mesh">
      {/* Blob */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#25D366]/4 blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              WA<span className="text-[#25D366]">Bot</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← Ana Səhifə
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card rounded-2xl border border-white/8 p-8 sm:p-12">

          {/* AZ Section */}
          <section className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-6">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Azərbaycan dili</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
              Məxfilik Siyasəti
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Son yenilik: {new Date().toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
              <div>
                <h2 className="text-white font-semibold text-base mb-3">1. Giriş</h2>
                <p>
                  WABot olaraq, istifadəçilərimizin şəxsi məlumatlarının qorunmasına böyük əhəmiyyət veririk. Bu Məxfilik Siyasəti, platformamızı istifadə etdiyiniz zaman hansı məlumatları topladığımızı, necə istifadə etdiyimizi və qoruduğumuzu izah edir.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">2. Topladığımız Məlumatlar</h2>
                <ul className="space-y-2 list-none">
                  {[
                    'Şirkət adı və iş növü',
                    'Sahibin telefon nömrəsi (WhatsApp)',
                    'WhatsApp Business hesab məlumatları (WABA ID, phone number ID)',
                    'Müştərilərin WhatsApp mesajları (yalnız botun cavab verməsi üçün)',
                    'Məhsul kataloqu məlumatları (istifadəçi tərəfindən paylaşılan)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">3. Məlumatların İstifadəsi</h2>
                <p className="mb-3">Topladığımız məlumatlar aşağıdakı məqsədlər üçün istifadə edilir:</p>
                <ul className="space-y-2">
                  {[
                    'WhatsApp avtomatlaşdırma xidmətinin göstərilməsi',
                    'CRM sisteminin idarə edilməsi',
                    'Abunəlik statusunun izlənməsi',
                    'Texniki dəstəyin təmin edilməsi',
                    'Xidmət keyfiyyətinin yaxşılaşdırılması',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">4. Üçüncü Tərəf Xidmətləri</h2>
                <p className="mb-3">Platformamız aşağıdakı üçüncü tərəf xidmətlərindən istifadə edir:</p>
                <div className="space-y-3">
                  {[
                    { name: 'Meta (Facebook/WhatsApp)', desc: 'WhatsApp Business API vasitəsilə mesaj göndərmə/qəbul etmə. Meta\'nın məxfilik siyasəti tətbiq olunur.' },
                    { name: 'Supabase', desc: 'Məlumatların təhlükəsiz saxlanması. Bütün məlumatlar şifrələnmiş formada saxlanılır.' },
                    { name: 'Make.com', desc: 'Məhsul kataloqu emalı üçün avtomatlaşdırma platforması.' },
                  ].map((svc) => (
                    <div key={svc.name} className="px-4 py-3 rounded-xl bg-white/3 border border-white/6">
                      <p className="text-white font-medium text-sm mb-1">{svc.name}</p>
                      <p className="text-slate-400 text-xs">{svc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">5. Məlumatların Saxlanma Müddəti</h2>
                <p>
                  Məlumatlarınız abunəliyiniz aktiv olduğu müddətdə saxlanılır. Hesabınızı silmək istədikdə, bütün məlumatlarınız 30 gün ərzində silinir.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">6. Məlumatlarınızın Təhlükəsizliyi</h2>
                <p>
                  Bütün məlumatlar SSL/TLS şifrələməsi ilə qorunur. WhatsApp access token-lər şifrələnmiş formada saxlanılır. Xidmətimizin istənilən vaxt dayandırılması məlumatlarınızın silinməsinə yol açmır.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">7. Əlaqə</h2>
                <p>
                  Məxfilik ilə bağlı hər hansı sualınız varsa, bizə yazın:{' '}
                  <a href="mailto:info@wabot.az" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                    info@wabot.az
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-white/8 my-12" />

          {/* EN Section */}
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">English</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
              Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
              <div>
                <h2 className="text-white font-semibold text-base mb-3">1. Introduction</h2>
                <p>
                  WABot ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect when you use our platform, how we use it, and how we protect it.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">2. Data We Collect</h2>
                <ul className="space-y-2">
                  {[
                    'Business name and type',
                    "Owner's phone number (WhatsApp)",
                    'WhatsApp Business account details (WABA ID, phone number ID)',
                    "Customers' WhatsApp messages (solely for AI response generation)",
                    'Product catalog data (as shared by the user)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">3. How We Use Your Data</h2>
                <p className="mb-3">We use the collected data to:</p>
                <ul className="space-y-2">
                  {[
                    'Provide WhatsApp automation services',
                    'Manage the CRM system',
                    'Track subscription status',
                    'Deliver technical support',
                    'Improve service quality',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">4. Third-Party Services</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Meta (Facebook/WhatsApp)', desc: 'Used for WhatsApp Business API messaging. Meta\'s own Privacy Policy applies.' },
                    { name: 'Supabase', desc: 'Secure data storage. All data is stored in encrypted form.' },
                    { name: 'Make.com', desc: 'Automation platform used for product catalog processing.' },
                  ].map((svc) => (
                    <div key={svc.name} className="px-4 py-3 rounded-xl bg-white/3 border border-white/6">
                      <p className="text-white font-medium text-sm mb-1">{svc.name}</p>
                      <p className="text-slate-400 text-xs">{svc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">5. Data Retention</h2>
                <p>
                  Your data is retained for as long as your subscription is active. When you request account deletion, all your data is removed within 30 days.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">6. Data Security</h2>
                <p>
                  All data is protected with SSL/TLS encryption. WhatsApp access tokens are stored in encrypted form. Pausing your subscription does not result in data deletion.
                </p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">7. Contact</h2>
                <p>
                  For any privacy-related questions, please contact us at:{' '}
                  <a href="mailto:info@wabot.az" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                    info@wabot.az
                  </a>
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
