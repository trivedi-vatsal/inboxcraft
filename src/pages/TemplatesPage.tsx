import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  RiAddLine,
  RiGithubLine,
  RiRefreshLine,
  RiSearchLine,
  RiSparklingLine,
} from '@remixicon/react'
import { useTemplates, type TemplateIndex, type TemplateDetail } from '@/hooks/useTemplates'
import { TemplateDrawer } from '@/components/TemplateDrawer'
import { EmailModal } from '@/components/EmailModal'
import { generateScript } from '@/lib/powershell'
import { parseEmails } from '@/lib/utils'
import { cx } from '@/lib/utils'
import { CATEGORIES, CAT_COLOR, TemplateCard, CardSkeleton, StatsBar, type Category } from '@/components/TemplateShared'


// ─── Page ─────────────────────────────────────────────────────────────────────

export function TemplatesPage() {
  const { cards, loading, error, retry, fetchCard } = useTemplates()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch]               = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  // Drawer state
  const [drawerCard, setDrawerCard]       = useState<TemplateIndex | null>(null)
  const [drawerDetail, setDrawerDetail]   = useState<TemplateDetail | null>(null)
  const [drawerLoading, setDrawerLoading] = useState(false)
  const [drawerError, setDrawerError]     = useState(false)

  // Modal state
  const [modalCard, setModalCard]         = useState<TemplateIndex | null>(null)

  // Auto-open drawer from ?template= param
  useEffect(() => {
    const id = searchParams.get('template')
    if (!id || loading || cards.length === 0) return
    const match = cards.find((c) => c.id === id)
    if (match) openDrawer(match)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, loading])

  const openDrawer = useCallback(async (card: TemplateIndex) => {
    setDrawerCard(card)
    setDrawerDetail(null)
    setDrawerError(false)
    setDrawerLoading(true)
    setSearchParams({ template: card.id }, { replace: true })
    try {
      const detail = await fetchCard(card.id)
      setDrawerDetail(detail)
    } catch {
      setDrawerError(true)
    } finally {
      setDrawerLoading(false)
    }
  }, [fetchCard, setSearchParams])

  const retryDrawer = useCallback(async () => {
    if (!drawerCard) return
    setDrawerError(false)
    setDrawerLoading(true)
    try {
      const detail = await fetchCard(drawerCard.id)
      setDrawerDetail(detail)
    } catch {
      setDrawerError(true)
    } finally {
      setDrawerLoading(false)
    }
  }, [drawerCard, fetchCard])

  const closeDrawer = useCallback(() => {
    setDrawerCard(null)
    setDrawerDetail(null)
    setDrawerError(false)
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  const handleGetScript = useCallback((card: TemplateIndex, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setModalCard(card)
  }, [])

  const handleModalConfirm = useCallback(async (userEmail: string, action: 'copy' | 'move') => {
    if (!modalCard) return
    setModalCard(null)
    try {
      const detail = drawerDetail ?? await fetchCard(modalCard.id)
      const parsed = parseEmails(detail.senders.join('\n'))
      const ps1 = generateScript(parsed, userEmail, detail.folder, action, 'senderEmail')
      const blob = new Blob([ps1], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), {
        href: url,
        download: `${detail.folder}-rules.ps1`,
      })
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // silently ignore - user can retry via drawer
    }
  }, [modalCard, drawerDetail, fetchCard])

  const filtered = cards
    .filter((c) => activeCategory === 'All' || c.category === activeCategory)
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()),
    )

  return (
    <main className="flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-36 sm:pt-44 pb-12 px-4 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />
        <div className="flex items-center justify-center gap-3 mb-5 animate-slide-up-fade" style={{ animationDuration: '400ms' }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9b9f9] dark:border-[#533afd]/30 bg-[rgba(83,58,253,0.06)] dark:bg-[rgba(83,58,253,0.15)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#533afd] dark:text-[#d6d9fc] backdrop-blur-sm">
            <RiSparklingLine className="h-3.5 w-3.5" />
            Templates
          </span>
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#533afd] dark:text-slate-400 dark:hover:text-[#b9b9f9] transition-colors"
          >
            <RiGithubLine className="h-3.5 w-3.5" />
            Contribute
          </a>
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] animate-slide-up-fade" style={{ animationDuration: '600ms' }}>
          <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 dark:from-slate-50 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Pre-built rules for{' '}</span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#533afd] to-[#665efd] dark:from-[#b9b9f9] dark:to-[#d6d9fc] bg-clip-text text-transparent">
            popular services.
          </span>
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-balance animate-slide-up-fade" style={{ animationDuration: '800ms' }}>
          Pick a template, enter your M365 email, and download a ready-to-run PowerShell
          script in seconds. No configuration needed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-500 dark:text-slate-400 animate-slide-up-fade" style={{ animationDuration: '1000ms' }}>
          {[
            { icon: '✉️', text: 'GitHub, Slack, Teams' },
            { icon: '☁️', text: 'AWS, Zoom, DocuSign' },
            { icon: '⚡', text: 'One-click download' },
            { icon: '🔒', text: 'Nothing leaves your browser' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2"><span className="opacity-80">{icon}</span> {text}</span>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 pt-8 pb-12">
        {/* ── Search ── */}
        <div className="relative mb-6">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cx(
              'w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-3 pl-11 pr-4',
              'text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:border-[#533afd] dark:focus:border-[#533afd] focus:outline-none focus:ring-2 focus:ring-[rgba(83,58,253,0.1)] dark:focus:ring-[rgba(83,58,253,0.2)] focus:bg-white dark:focus:bg-slate-900',
              'transition-all shadow-sm backdrop-blur-md',
            )}
          />
        </div>

        {/* ── Category chips ── */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            const colors = CAT_COLOR[cat]
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cx(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200',
                  isActive
                    ? cat === 'All'
                      ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-sm'
                      : cx('text-white shadow-sm', colors?.chip ?? 'bg-slate-600 dark:bg-slate-400 text-white dark:text-slate-900')
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800',
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* ── Stats ── */}
        {!loading && !error && <StatsBar cards={cards} filtered={filtered} />}

        {/* ── Grid ── */}
        {error ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/60 dark:bg-red-500/10 py-24 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
              <RiRefreshLine className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">Couldn't load templates</p>
              <p className="text-xs text-red-500/70 dark:text-red-400/70 mt-1">Check your connection and try again</p>
            </div>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1.5 rounded-lg bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 px-5 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition-colors shadow-sm"
            >
              <RiRefreshLine className="h-4 w-4" />
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <div className="col-span-full py-24 text-center">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                  <RiSearchLine className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No templates match</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try a different filter or search term</p>
                <button
                  type="button"
                  onClick={() => { setSearch(''); setActiveCategory('All') }}
                  className="mt-6 rounded-lg bg-[rgba(83,58,253,0.06)] dark:bg-[rgba(83,58,253,0.06)]0/10 border border-[#b9b9f9] dark:border-[rgba(83,58,253,0.2)] px-5 py-2 text-sm font-semibold text-[#533afd] dark:text-[#b9b9f9] hover:bg-[#533afd] dark:hover:bg-[rgba(83,58,253,0.06)]0 hover:text-white dark:hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {filtered.map((card) => (
                  <TemplateCard
                    key={card.id}
                    card={card}
                    onOpen={openDrawer}
                    onGetScript={handleGetScript}
                  />
                ))}
                {/* Add template card */}
                <a
                  href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    'group flex flex-col items-center justify-center gap-2.5 rounded-2xl',
                    'border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center',
                    'transition-all duration-200 hover:border-[#533afd] dark:hover:border-[#533afd] hover:bg-[rgba(83,58,253,0.06)] dark:hover:bg-[rgba(83,58,253,0.06)]0/5 hover:shadow-sm',
                    'min-h-[160px]',
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-[rgba(83,58,253,0.1)] dark:group-hover:bg-[#533afd]/20 transition-colors">
                    <RiAddLine className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-[#533afd] dark:group-hover:text-[#b9b9f9] transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-[#533afd] dark:group-hover:text-[#b9b9f9] transition-colors">
                      Add a template
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Open a PR on GitHub</p>
                  </div>
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {/* Drawer */}
      {drawerCard && (
        <TemplateDrawer
          card={drawerCard}
          detail={drawerDetail}
          loading={drawerLoading}
          error={drawerError}
          onGetScript={() => handleGetScript(drawerCard)}
          onClose={closeDrawer}
          onRetry={retryDrawer}
        />
      )}

      {/* Email modal */}
      {modalCard && (
        <EmailModal
          templateName={modalCard.name}
          onConfirm={handleModalConfirm}
          onClose={() => setModalCard(null)}
        />
      )}
    </main>
  )
}
