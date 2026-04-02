import { useEffect, useState } from 'react'
import { RiCheckLine, RiDownloadLine, RiFileCopyLine, RiInformationLine, RiArrowDownSLine } from '@remixicon/react'
import { codeToHtml } from 'shiki'
import { toast } from 'sonner'
import type { ParsedEmail } from '@/lib/utils'
import type { RuleAction } from '@/lib/powershell'

interface ScriptOutputProps {
  script: string
  emails: ParsedEmail[]
  parentFolder: string
  ruleAction: RuleAction
  onCopy: () => void
  onDownload: () => void
  copyState: 'idle' | 'copied'
}

export function ScriptOutput({ script, emails, parentFolder, ruleAction, onCopy, onDownload, copyState }: ScriptOutputProps) {
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [highlighted, setHighlighted] = useState('')
  const [blockCopyState, setBlockCopyState] = useState<'idle' | 'copied'>('idle')

  useEffect(() => {
    codeToHtml(script, { lang: 'powershell', theme: 'poimandres' }).then(setHighlighted)
  }, [script])

  const lineCount = script.split('\n').length
  const sizeKb = (new Blob([script]).size / 1024).toFixed(1)
  const actionVerb = ruleAction === 'copy' ? 'copied' : 'moved'

  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400 dark:bg-amber-500" />
            <span className="h-3 w-3 rounded-full bg-emerald-400 dark:bg-emerald-500" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-200 ml-1 whitespace-nowrap">Generated Script</h2>
          <span className="hidden sm:inline rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400 font-mono truncate">outlook-rules.ps1</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 dark:text-slate-500">{lineCount} lines · {sizeKb} KB</span>
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700"
          >
            {copyState === 'copied' ? (
              <><RiCheckLine className="size-3.5 text-emerald-500 dark:text-emerald-400" /><span className="text-emerald-600 dark:text-emerald-400">Copied!</span></>
            ) : (
              <><RiFileCopyLine className="size-3.5 text-slate-500 dark:text-slate-400" />Copy <span className="opacity-50 ml-0.5 text-[10px] hidden sm:inline">(Cmd+C)</span></>
            )}
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 rounded-lg bg-[#533afd] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#4434d4] active:bg-[#2e2b8c]"
          >
            <RiDownloadLine className="size-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Expandable "What this script does" summary */}
      <div className="border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setSummaryOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 sm:px-6 py-3 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <span className="font-medium">What this script does</span>
          <RiArrowDownSLine className={`size-4 text-slate-400 dark:text-slate-500 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
        </button>
        {summaryOpen && (
          <div className="px-4 sm:px-6 pb-4 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p>1. <strong>Connects to Outlook</strong> (no sign-in needed) to create folders - or falls back to Exchange Online if Outlook is unavailable.</p>
            <p>2. <strong>Creates the <code className="rounded bg-slate-100 dark:bg-slate-800 px-1 text-slate-700 dark:text-slate-300">{parentFolder}</code> folder</strong> inside your Inbox, then creates a subfolder for each sender.</p>
            <p>3. <strong>Connects to Exchange Online</strong> (browser sign-in required) to create {emails.length} inbox rule{emails.length !== 1 ? 's' : ''}:</p>
            <ul className="ml-4 space-y-1">
              {emails.map((e) => (
                <li key={e.raw} className="flex items-center gap-1.5">
                  <span className="text-slate-400 dark:text-slate-600">→</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{e.raw}</span>
                  <span className="text-slate-400 dark:text-slate-500">emails are {actionVerb} to</span>
                  <span className="font-mono text-[#533afd] dark:text-[#b9b9f9]">Inbox/{parentFolder}/{e.alias}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Syntax-highlighted code block */}
      <div className="group relative overflow-auto max-h-[400px] min-w-0 text-xs leading-snug
        [&>pre]:overflow-x-auto [&>pre]:!bg-gray-950 dark:[&>pre]:!bg-[#0d1117] [&>pre]:py-6 [&>pre]:pl-4 [&>pre]:pr-5
        [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
      >
        <button
          onClick={() => {
            navigator.clipboard.writeText(script)
            setBlockCopyState('copied')
            toast.success('Code copied to clipboard')
            setTimeout(() => setBlockCopyState('idle'), 2000)
          }}
          className="absolute top-3 right-3 z-10 rounded bg-white/10 dark:bg-white/5 p-2 text-slate-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[rgba(83,58,253,0.3)]"
          aria-label="Copy code block"
        >
          {blockCopyState === 'copied' ? <RiCheckLine className="size-4 text-emerald-400" /> : <RiFileCopyLine className="size-4" />}
        </button>
        <div dangerouslySetInnerHTML={{ __html: highlighted || `<pre class="shiki" style="background:#1b1e28"><code>${script}</code></pre>` }} />
      </div>

      {/* Warning footer */}
      <div className="flex items-start gap-3 border-t border-slate-100 dark:border-slate-800/80 bg-amber-50 dark:bg-amber-500/10 px-4 sm:px-6 py-4">
        <RiInformationLine className="mt-0.5 size-4 shrink-0 text-amber-500" />
        <div className="text-xs text-amber-800 dark:text-amber-500">
          <span className="font-semibold">Before you run - </span>
          Close Outlook completely. Open PowerShell and run:{' '}
          <code className="rounded bg-amber-100 dark:bg-amber-500/20 px-1.5 py-0.5 font-mono text-amber-900 dark:text-amber-400">
            powershell -ExecutionPolicy Bypass -File outlook-rules.ps1
          </code>
        </div>
      </div>
    </div>
  )
}
