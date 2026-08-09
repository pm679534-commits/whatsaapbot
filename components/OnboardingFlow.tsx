'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { MessageCircle, Loader2, AlertCircle, ChevronRight, SkipForward } from 'lucide-react'

// ─── Schemas ────────────────────────────────────────────────────────────────

const step1Schema = z.object({
  company_name: z.string().min(2, 'Şirkətin adı ən az 2 simvol olmalıdır'),
  owner_phone: z
    .string()
    .regex(/^\+\d{7,15}$/, 'Format: +[ölkə kodu][nömrə], nümunə: +994501234567'),
  personal_phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, 'Yalnız rəqəmlər, 10–15 simvol, nümunə: 994501234567'),
})

type Step1Data = z.infer<typeof step1Schema>

// ─── Types ───────────────────────────────────────────────────────────────────

interface SessionInfo {
  waba_id: string
  phone_number_id: string
}

declare global {
  interface Window {
    FB: {
      init: (config: { appId: string | undefined; version: string }) => void
      login: (
        callback: (response: { authResponse?: { code: string } }) => void,
        options: {
          config_id: string | undefined
          response_type: string
          override_default_response_type: boolean
          extras: { setup: object; featureType: string; sessionInfoVersion: string }
        }
      ) => void
    }
  }
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const steps = ['Biznes Məlumatları', 'WhatsApp Qoşulması', 'Məhsul Kataloqu']
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {steps.map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                i < step
                  ? 'bg-[#25D366] border-[#25D366] text-white'
                  : i === step
                  ? 'border-[#25D366] text-[#25D366] bg-[#25D366]/10'
                  : 'border-white/15 text-slate-600'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-2 text-center hidden sm:block transition-colors duration-300 ${
                i === step ? 'text-white font-medium' : 'text-slate-600'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
        {/* connector lines */}
        {steps.slice(0, -1).map((_, i) => (
          <div
            key={`c-${i}`}
            className="flex-1 h-px mx-2 mt-[-20px] sm:mt-[-32px] transition-colors duration-500"
            style={{
              background:
                i < step
                  ? 'linear-gradient(90deg,#25D366,#25D366)'
                  : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Step 1: Business Info ────────────────────────────────────────────────────

function Step1({
  onNext,
  defaultValues,
}: {
  onNext: (data: Step1Data) => void
  defaultValues: Partial<Step1Data>
}) {
  const [values, setValues] = useState<Step1Data>({
    company_name: defaultValues.company_name ?? '',
    owner_phone: defaultValues.owner_phone ?? '+',
    personal_phone: defaultValues.personal_phone ?? '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Sanitize: yalnız + və rəqəmləri saxla (boşluq, tire, mötərizə, hərfləri sil)
    const sanitized: Step1Data = {
      ...values,
      owner_phone: values.owner_phone.replace(/[^\d+]/g, ''),
      personal_phone: values.personal_phone.replace(/\D/g, ''),
    }

    const result = step1Schema.safeParse(sanitized)
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors
      setErrors({
        company_name: flat.company_name?.[0],
        owner_phone: flat.owner_phone?.[0],
        personal_phone: flat.personal_phone?.[0],
      })
      return
    }

    // Eynilik yoxlaması: hər iki nömrəni yalnız rəqəmlərə çevirib müqayisə et
    const ownerDigits = result.data.owner_phone.replace(/\D/g, '')
    if (ownerDigits === result.data.personal_phone) {
      setErrors({
        personal_phone:
          'Şəxsi bildiriş nömrəniz biznes WhatsApp nömrənizlə eyni ola bilməz.',
      })
      return
    }

    setErrors({})
    onNext(result.data)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl font-bold text-white mb-2">Biznes Məlumatları</h2>
      <p className="text-slate-400 text-sm mb-8">
        Şirkətiniz haqqında əsas məlumatları daxil edin.
      </p>

      <div className="space-y-5">
        {/* Company name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Şirkətin adı <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={values.company_name}
            onChange={(e) => setValues({ ...values, company_name: e.target.value })}
            placeholder="Misal: Əliyev Mebel"
            className={`w-full px-4 py-3 rounded-xl input-field text-sm ${
              errors.company_name ? 'error' : ''
            }`}
          />
          {errors.company_name && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.company_name}
            </p>
          )}
        </div>

        {/* Business WhatsApp phone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Biznes WhatsApp nömrəniz <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={values.owner_phone}
            onChange={(e) => setValues({ ...values, owner_phone: e.target.value })}
            placeholder="+994501234567"
            className={`w-full px-4 py-3 rounded-xl input-field text-sm ${
              errors.owner_phone ? 'error' : ''
            }`}
          />
          {errors.owner_phone && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.owner_phone}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Bu nömrə müştərilərlə bot vasitəsilə yazışacaq (2-ci addımda Meta ilə qoşulacaq).
          </p>
        </div>

        {/* Personal phone for notifications */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Sizin şəxsi WhatsApp nömrəniz (bildirişlər üçün) <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={values.personal_phone}
            onChange={(e) => setValues({ ...values, personal_phone: e.target.value })}
            placeholder="994501234567"
            className={`w-full px-4 py-3 rounded-xl input-field text-sm ${
              errors.personal_phone ? 'error' : ''
            }`}
          />
          {errors.personal_phone && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.personal_phone}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            AI müştəriyə cavab verə bilmədikdə, bu nömrəyə WhatsApp bildirişi gələcək.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20c45b] text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
      >
        Davam Et
        <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  )
}

// ─── Step 2: WhatsApp Connect ─────────────────────────────────────────────────

function Step2({
  onNext,
  formData,
}: {
  onNext: (tenantId: string) => void
  formData: Step1Data
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionInfoRef = useRef<SessionInfo | null>(null)

  // Listen for FB Embedded Signup session info
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      // Ignore non-string and non-object data early
      if (typeof e.data !== 'string' && typeof e.data !== 'object') return

      // Query-string callbacks from Facebook (e.g. "cb=...&domain=...") are not
      // WA_EMBEDDED_SIGNUP events — skip them silently without logging or throwing
      if (typeof e.data === 'string' && !e.data.trimStart().startsWith('{')) return

      let data: Record<string, unknown>
      try {
        data = typeof e.data === 'string'
          ? (JSON.parse(e.data) as Record<string, unknown>)
          : (e.data as Record<string, unknown>)
      } catch {
        // Not JSON — ignore silently
        return
      }

      // Only handle WA_EMBEDDED_SIGNUP events
      if (data?.type !== 'WA_EMBEDDED_SIGNUP') return

      console.log('[WA Signup] event received:', data)

      if (data.event === 'FINISH') {
        // sessionInfoVersion:'3' puts IDs on data.data; older versions put them on data directly
        const payload = (data.data ?? data) as Record<string, string>
        const waba_id = payload.waba_id
        const phone_number_id = payload.phone_number_id

        console.log('[WA Signup] FINISH captured —', { waba_id, phone_number_id })

        if (waba_id && phone_number_id) {
          sessionInfoRef.current = { waba_id, phone_number_id }
        } else {
          console.error('[WA Signup] FINISH missing IDs — full payload:', payload)
        }
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const connectWhatsApp = useCallback(() => {
    if (!window.FB) {
      setError('Facebook SDK yüklənmədi. Səhifəni yeniləyin.')
      return
    }
    setLoading(true)
    setError(null)

    window.FB.login(
      (response) => {
        void (async () => {
          if (!response.authResponse?.code) {
            setLoading(false)
            setError('WhatsApp qoşulması ləğv edildi. Yenidən cəhd edin.')
            return
          }

          const { code } = response.authResponse

          // Poll for session info — Meta's FINISH message can arrive
          // before or after FB.login callback, so we retry for up to 3s
          const sessionInfo = await new Promise<SessionInfo | null>((resolve) => {
            if (sessionInfoRef.current) { resolve(sessionInfoRef.current); return }
            let elapsed = 0
            const interval = setInterval(() => {
              elapsed += 100
              if (sessionInfoRef.current) {
                clearInterval(interval)
                resolve(sessionInfoRef.current)
              } else if (elapsed >= 3000) {
                clearInterval(interval)
                resolve(null)
              }
            }, 100)
          })

          console.log('[WA Signup] sessionInfo after poll:', sessionInfo)

          if (!sessionInfo) {
            setLoading(false)
            setError('WhatsApp hesabı seçilmədi. Yenidən cəhd edin.')
            return
          }

          try {
            const res = await fetch('/api/whatsapp/connect', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code,
                waba_id: sessionInfo.waba_id,
                phone_number_id: sessionInfo.phone_number_id,
                company_name: formData.company_name,
                owner_phone: formData.owner_phone,
                personal_phone: formData.personal_phone,
              }),
            })

            const json = (await res.json()) as { success?: boolean; tenant_id?: string; error?: string }

            if (!res.ok || !json.success) {
              throw new Error(json.error ?? 'Bilinməyən xəta')
            }

            onNext(json.tenant_id ?? '')
          } catch (err) {
            setLoading(false)
            setError(
              err instanceof Error
                ? err.message
                : 'Qoşulma zamanı xəta baş verdi. Yenidən cəhd edin.'
            )
          }
        })()
      },
      {
        config_id: process.env.NEXT_PUBLIC_META_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: { setup: {}, featureType: '', sessionInfoVersion: '3' },
      }
    )
  }, [formData, onNext])

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">WhatsApp Qoşulması</h2>
      <p className="text-slate-400 text-sm mb-8">
        WhatsApp Business hesabınızı platformamıza qoşun.
      </p>

      <div className="glass-card rounded-2xl p-8 border border-white/8 text-center">
        {/* WA logo */}
        <div className="w-20 h-20 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#25D366]/10">
          <MessageCircle className="w-10 h-10 text-[#25D366]" strokeWidth={1.5} />
        </div>

        <h3 className="text-white font-semibold text-lg mb-3">WhatsApp Business Hesabınızı Qoşun</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
          Aşağıdakı düyməyə basın, Facebook hesabınızla daxil olun və WhatsApp Business hesabınızı seçin.
        </p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={connectWhatsApp}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20c45b] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.45)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Qoşulur...
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              WhatsApp-ı Qoş
            </>
          )}
        </button>

        <p className="mt-4 text-xs text-slate-600 leading-relaxed">
          🔒 Bu proses 60 saniyə çəkir. Heç bir şifrəniz bizimlə paylaşılmır.
        </p>
      </div>

      {/* Trial notice */}
      <p className="mt-5 text-xs text-slate-500 leading-relaxed text-center">
        🎁 Bu, <span className="text-slate-300 font-medium">3 günlük pulsuz sınaq müddətidir</span>.
        Müddəti artırmaq üçün WhatsApp:{' '}
        <a
          href="https://wa.me/994775250891"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:underline"
        >
          0775250891
        </a>{' '}
        nömrəsi ilə əlaqə saxlayın.
      </p>
    </div>
  )
}

// ─── Step 3: Catalog ──────────────────────────────────────────────────────────

function Step3({
  tenantId,
  onDone,
}: {
  tenantId: string
  onDone: () => void
}) {
  const [catalogText, setCatalogText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (skip = false) => {
    if (!skip && !catalogText.trim()) {
      setError('Zəhmət olmasa məhsullarınızı daxil edin və ya atlayın.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      if (!skip) {
        await fetch('/api/catalog/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tenant_id: tenantId, catalog_text: catalogText }),
        })
      }
      onDone()
    } catch {
      setLoading(false)
      setError('Kataloq göndərilmədi. Lütfən yenidən cəhd edin.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Məhsul Kataloqu</h2>
      <p className="text-slate-400 text-sm mb-8">
        Məhsul və qiymətlərinizi əlavə edin. Bu addımı atlaya bilərsiniz.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Məhsullarınız və qiymətlər
          <span className="ml-2 text-slate-600 font-normal">(istənilən format)</span>
        </label>
        <textarea
          value={catalogText}
          onChange={(e) => setCatalogText(e.target.value)}
          rows={7}
          placeholder={
            'Misal:\nDivan - 850 AZN\nKünc divan - 1,200 AZN\nYataq dəsti - 650 AZN\nYemək masası - 450 AZN'
          }
          className="w-full px-4 py-3 rounded-xl input-field text-sm resize-none"
        />

        {error && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-600">
          AI kataloq məzmununu oxuyacaq və müştəri suallarına cavab verəcək
        </p>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => handleSubmit(true)}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <SkipForward className="w-4 h-4" />
          Atla
        </button>
        <button
          onClick={() => handleSubmit(false)}
          disabled={loading}
          className="flex-[2] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20c45b] disabled:opacity-60 text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Yüklənir...
            </>
          ) : (
            'Yüklə'
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<Step1Data>>({})
  const [tenantId, setTenantId] = useState('')

  const handleStep1 = (data: Step1Data) => {
    setFormData(data)
    setStep(1)
  }

  const handleStep2 = (id: string) => {
    setTenantId(id)
    setStep(2)
  }

  const handleDone = () => {
    router.push('/success')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {step === 0 && (
            <Step1 onNext={handleStep1} defaultValues={formData} />
          )}
          {step === 1 && formData.company_name && (
            <Step2 onNext={handleStep2} formData={formData as Step1Data} />
          )}
          {step === 2 && (
            <Step3 tenantId={tenantId} onDone={handleDone} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
