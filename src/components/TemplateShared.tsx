import { cx } from '@/lib/utils'
import type { TemplateIndex } from '@/hooks/useTemplates'

export const CATEGORIES = ['All', 'Collaboration', 'Finance', 'CRM', 'Dev Tools', 'Cloud', 'Productivity'] as const
export type Category = (typeof CATEGORIES)[number]

export const CAT_COLOR: Record<string, { chip: string; badge: string; icon: string; glow: string }> = {
  Collaboration: {
    chip:  'bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900',
    badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-200 dark:ring-blue-500/20',
    icon:  'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    glow:  'group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/20',
  },
  Finance: {
    chip:  'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900',
    badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-500/20',
    icon:  'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    glow:  'group-hover:shadow-emerald-100 dark:group-hover:shadow-emerald-900/20',
  },
  CRM: {
    chip:  'bg-violet-600 text-white shadow-violet-200 dark:shadow-violet-900',
    badge: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 ring-violet-200 dark:ring-violet-500/20',
    icon:  'bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
    glow:  'group-hover:shadow-violet-100 dark:group-hover:shadow-violet-900/20',
  },
  'Dev Tools': {
    chip:  'bg-orange-500 text-white shadow-orange-200 dark:shadow-orange-900',
    badge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-200 dark:ring-orange-500/20',
    icon:  'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
    glow:  'group-hover:shadow-orange-100 dark:group-hover:shadow-orange-900/20',
  },
  Cloud: {
    chip:  'bg-sky-600 text-white shadow-sky-200 dark:shadow-sky-900',
    badge: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 ring-sky-200 dark:ring-sky-500/20',
    icon:  'bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400',
    glow:  'group-hover:shadow-sky-100 dark:group-hover:shadow-sky-900/20',
  },
  Productivity: {
    chip:  'bg-[#533afd] text-white shadow-[rgba(83,58,253,0.15)] dark:shadow-[rgba(83,58,253,0.3)]',
    badge: 'bg-[rgba(83,58,253,0.06)] dark:bg-[rgba(83,58,253,0.06)]0/10 text-[#533afd] dark:text-[#b9b9f9] ring-[#b9b9f9] dark:ring-[#533afd]/20',
    icon:  'bg-[rgba(83,58,253,0.08)] dark:bg-[rgba(83,58,253,0.06)]0/10 text-[#533afd] dark:text-[#b9b9f9]',
    glow:  'group-hover:shadow-[rgba(83,58,253,0.08)] dark:group-hover:shadow-[rgba(83,58,253,0.3)]/20',
  },
}

export function TemplateCard({
  card,
  onOpen,
  onGetScript,
  isSelected,
}: {
  card: TemplateIndex
  onOpen: (card: TemplateIndex) => void
  onGetScript: (card: TemplateIndex, e: React.MouseEvent) => void
  isSelected?: boolean
}) {
  const colors = CAT_COLOR[card.category] ?? {
    chip: 'bg-slate-600 dark:bg-slate-500 text-white',
    badge: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-slate-200 dark:ring-slate-700',
    icon: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    glow: '',
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onOpen(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(card)
        }
      }}
      className={cx(
        'group relative flex flex-col rounded-2xl border bg-white dark:bg-slate-900',
        'shadow-sm cursor-pointer outline-none overflow-hidden',
        'transition-all duration-200 ease-out',
        isSelected
          ? 'border-[#533afd] dark:border-[#533afd] shadow-md ring-2 ring-[#b9b9f9] dark:ring-[rgba(83,58,253,0.3)] ring-offset-1'
          : 'border-slate-200/80 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 hover:border-transparent dark:hover:border-transparent',
        colors.glow,
        'focus-visible:ring-2 focus-visible:ring-[#533afd] focus-visible:ring-offset-2',
      )}
    >
      {/* Top gradient band */}
      <div className="h-1 w-full bg-gradient-to-r from-[#b9b9f9] via-[#533afd] to-[#665efd] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Card body */}
      <div className="flex items-start gap-3.5 px-4 pt-4 pb-3">
        <div
          className={cx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            'text-2xl leading-none shadow-sm transition-transform duration-200 group-hover:scale-110',
            colors.icon,
          )}
        >
          {card.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">{card.name}</p>
          <p className="mt-1 text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {card.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-100 dark:border-slate-800" />

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <span
          className={cx(
            'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
            colors.badge,
          )}
        >
          {card.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {card.senderCount} {card.senderCount === 1 ? 'address' : 'addresses'}
          </span>
          <button
            type="button"
            onClick={(e) => onGetScript(card, e)}
            className={cx(
              'rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white',
              'bg-[#533afd] hover:bg-[#4434d4] active:bg-[#2e2b8c]',
              'transition-colors shadow-sm shadow-[rgba(83,58,253,0.15)] dark:shadow-none',
            )}
          >
            Get Script
          </button>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-pulse overflow-hidden">
      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800" />
      <div className="flex items-start gap-3.5 px-4 pt-4 pb-3">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 space-y-2 pt-0.5">
          <div className="h-3.5 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-2.5 w-full rounded-md bg-slate-100 dark:bg-slate-800/50" />
          <div className="h-2.5 w-3/4 rounded-md bg-slate-100 dark:bg-slate-800/50" />
        </div>
      </div>
      <div className="mx-4 border-t border-slate-100 dark:border-slate-800" />
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="h-4 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  )
}

export function StatsBar({ cards, filtered }: { cards: TemplateIndex[]; filtered: TemplateIndex[] }) {
  const totalAddresses = cards.reduce((sum, c) => sum + c.senderCount, 0)
  const categories = new Set(cards.map((c) => c.category)).size

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 px-1 text-[12px] text-slate-400 dark:text-slate-500 font-medium">
      <span className="flex items-center gap-1.5">
        <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{filtered.length}</span>
        templates
        {filtered.length !== cards.length && (
          <span className="text-slate-400 dark:text-slate-500">/ {cards.length} total</span>
        )}
      </span>
      <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-800" />
      <span className="flex items-center gap-1.5">
        <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{totalAddresses}</span>
        sender addresses
      </span>
      <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-800" />
      <span className="flex items-center gap-1.5">
        <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{categories}</span>
        categories
      </span>
    </div>
  )
}
