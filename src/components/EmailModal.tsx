import { useEffect, useRef, useState } from 'react'
import { RiCloseLine, RiDownloadLine } from '@remixicon/react'

interface EmailModalProps {
  templateName: string
  onConfirm: (userEmail: string, action: 'copy' | 'move') => void
  onClose: () => void
}

export function EmailModal({ templateName, onConfirm, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('')
  const [action, setAction] = useState<'copy' | 'move'>('copy')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(email.trim(), action)
  }

  const btnCls = (active: boolean) =>
    `flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors border ${
      active
        ? 'bg-[#533afd] text-white border-[#533afd] shadow-sm'
        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
    }`

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Download Script</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{templateName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <RiCloseLine className="size-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-5 pt-4 pb-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="modal-email" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Your M365 Email
            </label>
            <input
              ref={inputRef}
              id="modal-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="block w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition focus:border-[#533afd] dark:focus:border-[#533afd] focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgba(83,58,253,0.1)] dark:focus:ring-[rgba(83,58,253,0.2)]"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">Used for folder paths in the script. Leave blank to auto-detect.</p>
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Rule Action
            </span>
            <div className="flex gap-2">
              <button type="button" className={btnCls(action === 'copy')} onClick={() => setAction('copy')}>
                📋 Copy to folder
              </button>
              <button type="button" className={btnCls(action === 'move')} onClick={() => setAction('move')}>
                📂 Move to folder
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#533afd] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#4434d4] active:bg-[#2e2b8c] transition-colors"
            >
              <RiDownloadLine className="size-3.5" />
              Download Script
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
