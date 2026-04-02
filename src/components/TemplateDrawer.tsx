import { useEffect } from 'react'
import {
  RiCloseLine,
  RiDownloadLine,
  RiRefreshLine,
  RiMailLine,
  RiFolderLine,
  RiShieldCheckLine,
} from '@remixicon/react'
import type { TemplateDetail, TemplateIndex } from '@/hooks/useTemplates'
import { cx } from '@/lib/utils'

const CAT_COLOR: Record<string, { badge: string; icon: string; accent: string; bar: string }> = {
  Collaboration: {
    badge:  'bg-blue-50 text-blue-700 ring-blue-200',
    icon:   'bg-blue-100 text-blue-600',
    accent: 'text-blue-600',
    bar:    'from-blue-400 to-blue-600',
  },
  Finance: {
    badge:  'bg-emerald-50 text-emerald-700 ring-emerald-200',
    icon:   'bg-emerald-100 text-emerald-700',
    accent: 'text-emerald-600',
    bar:    'from-emerald-400 to-emerald-600',
  },
  CRM: {
    badge:  'bg-violet-50 text-violet-700 ring-violet-200',
    icon:   'bg-violet-100 text-violet-600',
    accent: 'text-violet-600',
    bar:    'from-violet-400 to-violet-600',
  },
  'Dev Tools': {
    badge:  'bg-orange-50 text-orange-700 ring-orange-200',
    icon:   'bg-orange-100 text-orange-600',
    accent: 'text-orange-600',
    bar:    'from-orange-400 to-orange-500',
  },
  Cloud: {
    badge:  'bg-sky-50 text-sky-700 ring-sky-200',
    icon:   'bg-sky-100 text-sky-600',
    accent: 'text-sky-600',
    bar:    'from-sky-400 to-sky-600',
  },
  Productivity: {
    badge:  'bg-[rgba(83,58,253,0.06)] text-[#533afd] ring-[#b9b9f9]',
    icon:   'bg-[rgba(83,58,253,0.08)] text-[#533afd]',
    accent: 'text-[#533afd]',
    bar:    'from-[#b9b9f9] to-[#533afd]',
  },
}

interface TemplateDrawerProps {
  card: TemplateIndex
  detail: TemplateDetail | null
  loading: boolean
  error: boolean
  onGetScript: () => void
  onClose: () => void
  onRetry: () => void
}

export function TemplateDrawer({
  card,
  detail,
  loading,
  error,
  onGetScript,
  onClose,
  onRetry,
}: TemplateDrawerProps) {
  const colors = CAT_COLOR[card.category] ?? {
    badge:  'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 ring-slate-200 dark:ring-slate-700',
    icon:   'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    accent: 'text-slate-600 dark:text-slate-400',
    bar:    'from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-700',
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[22rem] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200/60 dark:border-slate-800 animate-slide-in-right">

        {/* Accent bar */}
        <div className={cx('h-1 w-full bg-gradient-to-r shrink-0', colors.bar)} />

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={cx(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm dark:bg-opacity-20',
                colors.icon,
              )}
            >
              {card.emoji}
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-snug">{card.name}</h2>
              <span
                className={cx(
                  'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset mt-1.5 dark:bg-opacity-20 dark:ring-opacity-20',
                  colors.badge,
                )}
              >
                {card.category}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-0.5"
            aria-label="Close drawer"
          >
            <RiCloseLine className="size-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-slate-100 dark:border-slate-800/80 shrink-0" />

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Description */}
          <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{card.description}</p>

          {/* Sender addresses section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiMailLine className={cx('h-3.5 w-3.5 shrink-0', colors.accent)} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Sender Addresses
              </p>
              {detail && (
                <span className="ml-auto text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-0.5">
                  {detail.senders.length}
                </span>
              )}
            </div>

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-2">
                {Array.from({ length: card.senderCount }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 animate-pulse px-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <div className="h-2.5 flex-1 rounded-md bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex items-center justify-between rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-red-700 dark:text-red-400">Failed to load</p>
                  <p className="text-[11px] text-red-400 dark:text-red-500 mt-0.5">Couldn't fetch sender addresses</p>
                </div>
                <button
                  type="button"
                  onClick={onRetry}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-500/20 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-500/20 transition-colors"
                >
                  <RiRefreshLine className="size-3.5" />
                  Retry
                </button>
              </div>
            )}

            {/* Sender list */}
            {detail && !loading && (
              <ul className="space-y-1.5">
                {detail.senders.map((s, idx) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/80 dark:bg-slate-800/30 px-3 py-2.5 group hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-[12px] font-mono text-slate-700 dark:text-slate-300 truncate flex-1 min-w-0">{s}</span>
                    <span className="text-[10px] text-slate-300 dark:text-slate-600 font-medium shrink-0">#{idx + 1}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Folder section */}
          {detail && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RiFolderLine className={cx('h-3.5 w-3.5 shrink-0', colors.accent)} />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Target Folder
                </p>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/80 dark:bg-slate-800/30 px-3.5 py-3">
                <RiFolderLine className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                <code className="text-[12px] font-mono text-slate-700 dark:text-slate-300">
                  Inbox\{detail.folder}\…
                </code>
              </div>
            </div>
          )}

          {/* What this does section */}
          {detail && (
            <div className="rounded-xl border border-[#b9b9f9] dark:border-[rgba(83,58,253,0.2)] bg-[rgba(83,58,253,0.06)]/60 dark:bg-[rgba(83,58,253,0.06)]0/10 px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <RiShieldCheckLine className="h-3.5 w-3.5 text-[#533afd] shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#533afd] dark:text-[#b9b9f9]">
                  What this rule does
                </p>
              </div>
              <p className="text-[12.5px] text-[#533afd] dark:text-[#d6d9fc] leading-relaxed">
                Emails from the{' '}
                <span className="font-semibold">{detail.senders.length} sender{detail.senders.length !== 1 ? 's' : ''}</span>{' '}
                above will be automatically moved to{' '}
                <code className="font-mono font-semibold">Inbox\{detail.folder}</code> in your Outlook.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-5 py-4">
          <button
            onClick={onGetScript}
            disabled={!detail || loading}
            className={cx(
              'w-full flex items-center justify-center gap-2 rounded-xl',
              'bg-[#533afd] px-4 py-3 text-sm font-bold text-white',
              'shadow-sm shadow-[rgba(83,58,253,0.15)] dark:shadow-none',
              'hover:bg-[#4434d4] active:bg-[#2e2b8c]',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-all duration-150',
            )}
          >
            <RiDownloadLine className="size-4" />
            Download Script
          </button>
          <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
            Enter your M365 email to generate a ready-to-run .ps1 script
          </p>
        </div>
      </div>
    </div>
  )
}
