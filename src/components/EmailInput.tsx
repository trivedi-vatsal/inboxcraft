import { RiDeleteBinLine, RiDownloadLine, RiEqualizerLine, RiFlashlightLine, RiMailSendLine, RiErrorWarningLine, RiSmartphoneLine } from '@remixicon/react'
import type { RuleAction, ConditionType } from '@/lib/powershell'
import { Textarea } from './Textarea'

const EXAMPLE_EMAILS = `alex.johnson@company.com
maria.garcia@acme.org
john.doe@example.com
sarah.miller@partner.io
@startup.io`

const INVALID_FOLDER_CHARS = /[\\/:*?"<>|]/

interface EmailInputProps {
  mode: 'quick' | 'advanced'
  onModeChange: (mode: 'quick' | 'advanced') => void

  quickUserEmail: string
  onQuickUserEmailChange: (value: string) => void
  quickSenderEmail: string
  onQuickSenderEmailChange: (value: string) => void
  onQuickDownload: () => void

  value: string
  onChange: (value: string) => void
  onParse: () => void
  userEmail: string
  onUserEmailChange: (value: string) => void
  parentFolder: string
  onParentFolderChange: (value: string) => void
  ruleAction: RuleAction
  onRuleActionChange: (v: RuleAction) => void
  conditionType: ConditionType
  onConditionTypeChange: (v: ConditionType) => void
  liveCount: number
  invalidCount?: number
  onReset: () => void
}

const inputCls = 'block w-full rounded-[4px] border border-[#e5edf5] dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-[14px] font-[300] text-[#061b31] dark:text-slate-100 placeholder-[#64748d] dark:placeholder-slate-500 transition focus:border-[#533afd] dark:focus:border-[#533afd] focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgba(83,58,253,0.1)] dark:focus:ring-[rgba(83,58,253,0.2)]'

export function EmailInput({
  mode, onModeChange,
  quickUserEmail, onQuickUserEmailChange,
  quickSenderEmail, onQuickSenderEmailChange,
  onQuickDownload,
  value, onChange, onParse,
  userEmail, onUserEmailChange,
  parentFolder, onParentFolderChange,
  ruleAction, onRuleActionChange,
  conditionType, onConditionTypeChange,
  liveCount,
  invalidCount = 0,
  onReset,
}: EmailInputProps) {
  const folderError = parentFolder && INVALID_FOLDER_CHARS.test(parentFolder)
    ? 'Contains invalid characters: \\ / : * ? " < > |'
    : null

  const quickValid = quickSenderEmail.trim().length > 0 &&
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(quickSenderEmail.trim())

  return (
    <div className="rounded-[6px] bg-white dark:bg-slate-800 border border-[#e5edf5] dark:border-slate-700 shadow-[rgba(23,23,23,0.08)_0px_15px_35px_0px] overflow-hidden">

      {/* Mode toggle */}
      <div className="flex items-center px-6 py-3 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex rounded-[4px] border border-[#e5edf5] dark:border-slate-700 overflow-hidden text-[12px] font-[400]">
          <button
            type="button"
            onClick={() => onModeChange('quick')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition ${
              mode === 'quick' ? 'bg-[#533afd] text-white' : 'bg-white dark:bg-slate-800 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-700'
            }`}
          >
            <RiFlashlightLine className="size-3" />
            Quick
          </button>
          <button
            type="button"
            onClick={() => onModeChange('advanced')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition ${
              mode === 'advanced' ? 'bg-[#533afd] text-white' : 'bg-white dark:bg-slate-800 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-700'
            }`}
          >
            <RiEqualizerLine className="size-3" />
            Advanced
          </button>
        </div>
      </div>

      {mode === 'quick' ? (
        <div className="px-6 pt-5 pb-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="quick-user-email" className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">
              Your M365 Email
            </label>
            <input
              id="quick-user-email"
              type="email"
              value={quickUserEmail}
              onChange={(e) => onQuickUserEmailChange(e.target.value)}
              placeholder="you@company.com"
              className={inputCls}
            />
            <p className="text-xs text-slate-400 dark:text-slate-400">Required for correct folder paths in the script.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="quick-sender-email" className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">
              Sender Email
            </label>
            <input
              id="quick-sender-email"
              type="email"
              value={quickSenderEmail}
              onChange={(e) => onQuickSenderEmailChange(e.target.value)}
              placeholder="noreply@github.com"
              className={inputCls}
              onKeyDown={(e) => { if (e.key === 'Enter' && quickValid) onQuickDownload() }}
            />
            <p className="text-xs text-slate-400 dark:text-slate-400">The address you want to create a rule for.</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400 dark:text-slate-400">
            <span>📂 Inbox subfolder</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>📋 Copy</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>🎯 Exact match</span>
          </div>
        </div>
      ) : (
        <div className="px-6 pt-5 pb-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="user-email" className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">
                Your M365 Email
              </label>
              <input
                id="user-email"
                type="email"
                value={userEmail}
                onChange={(e) => onUserEmailChange(e.target.value)}
                placeholder="you@company.com"
                className={inputCls}
              />
              <p className="text-xs text-slate-400 dark:text-slate-400">Leave blank to auto-detect.</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="parent-folder" className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">
                Parent Folder
              </label>
              <input
                id="parent-folder"
                type="text"
                value={parentFolder}
                onChange={(e) => onParentFolderChange(e.target.value)}
                placeholder="team"
                className={`block w-full rounded-[4px] border bg-white dark:bg-slate-900 px-3 py-2 text-[14px] font-[300] text-[#061b31] dark:text-slate-100 placeholder-[#64748d] dark:placeholder-slate-500 transition focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                  folderError
                    ? 'border-[#ea2261] dark:border-red-500 focus:border-[#ea2261] dark:focus:border-red-500 focus:ring-[rgba(234,34,97,0.1)] dark:focus:ring-red-900/30'
                    : 'border-[#e5edf5] dark:border-slate-600 focus:border-[#533afd] dark:focus:border-[#533afd] focus:ring-[rgba(83,58,253,0.1)] dark:focus:ring-[rgba(83,58,253,0.2)]'
                }`}
              />
              {folderError
                ? <p className="text-xs text-red-500 dark:text-red-400">{folderError}</p>
                : <p className="text-xs text-slate-400 dark:text-slate-400">Alias folders are nested inside this.</p>
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">Rule Action</p>
              <div className="flex rounded-[4px] border border-[#e5edf5] dark:border-slate-700 overflow-hidden text-[12px] font-[400]">
                {(['copy', 'move'] as RuleAction[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => onRuleActionChange(v)}
                    className={`flex-1 py-2 transition capitalize ${
                      ruleAction === v ? 'bg-[#533afd] text-white' : 'bg-white dark:bg-slate-800 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">Match Type</p>
              <div className="flex rounded-[4px] border border-[#e5edf5] dark:border-slate-700 overflow-hidden text-[12px] font-[400]">
                <button
                  onClick={() => onConditionTypeChange('senderEmail')}
                  className={`flex-1 py-2 transition ${
                    conditionType === 'senderEmail' ? 'bg-[#533afd] text-white' : 'bg-white dark:bg-slate-800 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-700'
                  }`}
                >
                  Exact Email
                </button>
                <button
                  onClick={() => onConditionTypeChange('from')}
                  className={`flex-1 py-2 transition ${
                    conditionType === 'from' ? 'bg-[#533afd] text-white' : 'bg-white dark:bg-slate-800 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-700'
                  }`}
                >
                  Contains
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="email-input" className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300">
                Sender Addresses
              </label>
              <div className="flex items-center gap-3">
                {liveCount > 0 && (
                  <span className="flex items-center gap-1 text-[12px] text-[#108c3d] dark:text-[#15be53] font-[400]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#15be53]" />
                    {liveCount} detected
                  </span>
                )}
                {invalidCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                    <RiErrorWarningLine className="size-3.5" />
                    {invalidCount} invalid
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onChange(EXAMPLE_EMAILS)}
                  className="flex items-center gap-1 text-[12px] text-[#533afd] dark:text-[#b9b9f9] hover:text-[#4434d4] dark:hover:text-white font-[400] transition-colors"
                >
                  <RiFlashlightLine className="size-3" />
                  Try example
                </button>
                {value.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors"
                  >
                    <RiDeleteBinLine className="size-3" />
                    Clear
                  </button>
                )}
              </div>
            </div>
            <Textarea
              id="email-input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={10}
              placeholder={`alex.johnson@company.com\nmaria.garcia@acme.org\n@wholecompany.com  ← domain rule`}
              hint="One per line, or comma/semicolon separated. Use @domain.com for domain-wide rules. Drop a .txt or .csv file here."
            />
          </div>
        </div>
      )}

      {/* Warning Banner */}
      {invalidCount > 0 && mode === 'advanced' && (
        <div className="mx-6 mb-5 rounded-lg bg-amber-50 dark:bg-amber-500/10 px-4 py-3 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
          <RiErrorWarningLine className="size-4 text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
            <strong>{invalidCount} {invalidCount === 1 ? 'line was' : 'lines were'} ignored</strong> because {invalidCount === 1 ? 'it does' : 'they do'} not match a valid email or domain format.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#e5edf5] dark:border-slate-700/50 bg-[#fafbfc] dark:bg-slate-800/80 px-4 sm:px-6 py-4 gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <RiDeleteBinLine className="size-3" />
          Reset
        </button>

        {mode === 'quick' ? (
          <>
            <a
              href={`mailto:?subject=Outlook Rules Generator Tool (InboxCraft)&body=Open this link on your Desktop / PC to run PowerShell scripts:%0D%0A${encodeURIComponent(window.location.origin + window.location.pathname)}`}
              className="flex sm:hidden items-center justify-center gap-2 rounded-[4px] bg-[#15be53] px-4 py-2 text-[14px] font-[400] text-white transition hover:bg-[#12a047]"
            >
              <RiSmartphoneLine className="size-4" />
              Email Link for Desktop
            </a>
            <button
              onClick={onQuickDownload}
              disabled={!quickValid}
              className="hidden sm:flex items-center gap-2 rounded-[4px] bg-[#533afd] px-4 py-2 text-[14px] font-[400] text-white transition hover:bg-[#4434d4] active:bg-[#2e2b8c] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RiDownloadLine className="size-4" />
              Download Rules
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
              <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Ctrl+Enter</kbd>
              {' to generate'}
            </p>
            <a
              href={`mailto:?subject=Outlook Rules Generator Tool (InboxCraft)&body=Open this link on your Desktop / PC to run PowerShell scripts:%0D%0A${encodeURIComponent(window.location.origin + window.location.pathname)}`}
              className="flex sm:hidden items-center justify-center gap-2 rounded-[4px] bg-[#15be53] px-4 py-2 text-[14px] font-[400] text-white transition hover:bg-[#12a047]"
            >
              <RiSmartphoneLine className="size-4" />
              Email Link for Desktop
            </a>
            <button
              onClick={onParse}
              disabled={value.trim() === '' || !!folderError}
              className="hidden sm:flex items-center gap-2 rounded-[4px] bg-[#533afd] px-4 py-2 text-[14px] font-[400] text-white transition hover:bg-[#4434d4] active:bg-[#2e2b8c] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RiMailSendLine className="size-4" />
              Generate Script
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
