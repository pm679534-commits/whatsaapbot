'use client'

import { useEffect, useRef, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import type { ContactWithMeta } from './page'
import { MessageCircle, Search } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string
  contact_id: string
  direction: 'inbound' | 'outbound'
  body: string
  ai_handled: boolean | null
  created_at: string
}

type Props = {
  initialContacts: ContactWithMeta[]
  tenantId: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  if (isToday) {
    return d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit' })
}

function displayName(c: ContactWithMeta): string {
  return c.full_name?.trim() || c.wa_id
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InboxClient({ initialContacts, tenantId }: Props) {
  const supabase = createSupabaseClient()

  // Contact list state — mutable (Realtime yeni mesaj gəldikdə sıralama yenilənir)
  const [contacts, setContacts] = useState<ContactWithMeta[]>(initialContacts)
  const [search, setSearch] = useState('')

  // Seçilmiş kontakt
  const [selectedId, setSelectedId] = useState<string | null>(
    initialContacts[0]?.id ?? null
  )

  // Mesajlar
  const [messages, setMessages] = useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  // Mesajları yüklə — seçilmiş kontakt dəyişdikdə
  useEffect(() => {
    if (!selectedId) return

    let cancelled = false
    setMessagesLoading(true)

    supabase
      .from('messages')
      .select('id, contact_id, direction, body, ai_handled, created_at')
      .eq('tenant_id', tenantId)
      .eq('contact_id', selectedId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (cancelled) return
        setMessages((data as Message[]) ?? [])
        setMessagesLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  // Mesajlar yüklənəndə/yeni mesaj gəldikdə aşağı scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Supabase Realtime — yeni mesajlara subscribe
  useEffect(() => {
    const channel = supabase
      .channel('inbox-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `tenant_id=eq.${tenantId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message

          // Seçilmiş kontaktın söhbətinə əlavə et
          if (newMsg.contact_id === selectedId) {
            setMessages((prev) => [...prev, newMsg])
          }

          // Contact siyahısında son mesajı yenilə və sırala
          setContacts((prev) => {
            const updated = prev.map((c) =>
              c.id === newMsg.contact_id
                ? {
                    ...c,
                    last_message_body: newMsg.body,
                    last_message_at: newMsg.created_at,
                    last_message_direction: newMsg.direction,
                  }
                : c
            )
            return updated.sort((a, b) => {
              if (!a.last_message_at) return 1
              if (!b.last_message_at) return -1
              return (
                new Date(b.last_message_at).getTime() -
                new Date(a.last_message_at).getTime()
              )
            })
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, tenantId])

  // Axtarış filtri
  const filteredContacts = contacts.filter((c) => {
    const q = search.toLowerCase()
    return (
      displayName(c).toLowerCase().includes(q) || c.wa_id.includes(q)
    )
  })

  const selectedContact = contacts.find((c) => c.id === selectedId) ?? null

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-[#080B1A] text-white overflow-hidden">
      {/* ── Sol panel: contact siyahısı ── */}
      <aside className="w-80 shrink-0 flex flex-col border-r border-white/[0.06] bg-[#0F1629]">
        {/* Başlıq */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-lg font-semibold tracking-tight gradient-text-green flex items-center gap-2">
            <MessageCircle size={20} className="text-[#25D366]" />
            Inbox
          </h1>
        </div>

        {/* Axtarış */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Ad və ya nömrə axtar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm input-field"
            />
          </div>
        </div>

        {/* Kontakt siyahısı */}
        <ul className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-slate-500">
              Kontakt tapılmadı
            </li>
          )}
          {filteredContacts.map((contact) => {
            const isActive = contact.id === selectedId
            return (
              <li key={contact.id}>
                <button
                  onClick={() => setSelectedId(contact.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] ${
                    isActive
                      ? 'bg-[#25D366]/10 border-r-2 border-[#25D366]'
                      : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] font-semibold text-sm uppercase">
                    {displayName(contact).charAt(0)}
                  </div>

                  {/* Mətn */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-medium truncate">
                        {displayName(contact)}
                      </span>
                      <span className="text-[11px] text-slate-500 shrink-0">
                        {formatTime(contact.last_message_at)}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 truncate mt-0.5">
                      {contact.last_message_direction === 'outbound' && (
                        <span className="text-[#25D366] mr-1">↑</span>
                      )}
                      {contact.last_message_body ?? (
                        <span className="italic">mesaj yoxdur</span>
                      )}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* ── Sağ panel: söhbət ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {selectedContact ? (
          <>
            {/* Söhbət başlığı */}
            <header className="px-5 py-4 flex items-center gap-3 border-b border-white/[0.06] bg-[#0F1629] glass-nav shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] font-semibold text-sm uppercase shrink-0">
                {displayName(selectedContact).charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {displayName(selectedContact)}
                </p>
                <p className="text-xs text-slate-500">+{selectedContact.wa_id}</p>
              </div>
            </header>

            {/* Mesajlar */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 space-y-2"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(37,211,102,0.04) 0%, transparent 60%)',
              }}
            >
              {messagesLoading && (
                <div className="flex justify-center pt-10">
                  <span className="text-sm text-slate-500 animate-pulse">
                    Yüklənir…
                  </span>
                </div>
              )}

              {!messagesLoading && messages.length === 0 && (
                <div className="flex justify-center pt-10">
                  <span className="text-sm text-slate-500">
                    Bu kontaktla mesaj yoxdur
                  </span>
                </div>
              )}

              {!messagesLoading &&
                messages.map((msg) => {
                  const isOutbound = msg.direction === 'outbound'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          relative max-w-[72%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                          ${
                            isOutbound
                              ? 'bg-[#005C4B] text-white rounded-tr-sm'
                              : 'bg-[#1F2C34] text-white rounded-tl-sm'
                          }
                        `}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {msg.body}
                        </p>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            isOutbound ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="text-[10px] text-white/40">
                            {formatTime(msg.created_at)}
                          </span>
                          {msg.ai_handled && (
                            <span className="text-[10px] text-[#25D366]/60">
                              · AI
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

              {/* Scroll anchor */}
              <div ref={bottomRef} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-slate-600">
              <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sol tərəfdən kontakt seçin</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
