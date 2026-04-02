import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailInput } from '@/components/EmailInput'
import { GeneratorOutput } from '@/components/GeneratorOutput'
import { generateScript, type RuleAction, type ConditionType } from '@/lib/powershell'
import { parseEmails, type ParsedEmail } from '@/lib/utils'
import { toast } from 'sonner'

export function AdvancedPage() {
  const navigate = useNavigate()

  const [mode, setMode] = useState<'quick' | 'advanced'>('advanced')

  // ── Quick mode state ──────────────────────────────────────────────────────
  const [quickUserEmail, setQuickUserEmail]     = useState('')
  const [quickSenderEmail, setQuickSenderEmail] = useState('')

  // ── Advanced mode state ───────────────────────────────────────────────────
  const [rawInput, setRawInput]           = useState('')
  const [userEmail, setUserEmail]         = useState('')
  const [parentFolder, setParentFolder]   = useState('team')
  const [ruleAction, setRuleAction]       = useState<RuleAction>('copy')
  const [conditionType, setConditionType] = useState<ConditionType>('senderEmail')
  const [emails, setEmails]               = useState<ParsedEmail[]>([])
  const [script, setScript]               = useState('')
  const [copyState, setCopyState]         = useState<'idle' | 'copied'>('idle')

  const liveParsed = useMemo(() => parseEmails(rawInput), [rawInput])
  const liveValid = useMemo(() => liveParsed.filter((e) => e.valid), [liveParsed])
  const liveInvalidCount = liveParsed.length - liveValid.length

  const triggerDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), { href: url, download: filename }).click()
    URL.revokeObjectURL(url)
  }

  const handleQuickDownload = useCallback(() => {
    const parsed = parseEmails(quickSenderEmail)
    const valid = parsed.filter((e) => e.valid)
    if (!valid.length) return
    const domain = valid[0].domain.split('.')[0] || valid[0].alias
    const ps1 = generateScript(valid, quickUserEmail, domain, 'copy', 'senderEmail')
    triggerDownload(ps1, 'outlook-rules.ps1')
  }, [quickSenderEmail, quickUserEmail])

  const handleParse = useCallback(() => {
    const parsed = parseEmails(rawInput)
    setEmails(parsed)
    setScript(generateScript(parsed, userEmail, parentFolder, ruleAction, conditionType))
    setCopyState('idle')
  }, [rawInput, userEmail, parentFolder, ruleAction, conditionType])

  const handleCopy = useCallback(async () => {
    if (!script) return
    await navigator.clipboard.writeText(script)
    setCopyState('copied')
    toast.success('Script copied to clipboard')
    setTimeout(() => setCopyState('idle'), 2000)
  }, [script])

  const handleDownload = useCallback(() => {
    if (!script) return
    triggerDownload(script, 'outlook-rules.ps1')
  }, [script])

  const handleReset = useCallback(() => {
    if (mode === 'quick') {
      setQuickUserEmail(''); setQuickSenderEmail('')
    } else {
      setRawInput(''); setUserEmail(''); setParentFolder('team')
      setRuleAction('copy'); setConditionType('senderEmail')
      setEmails([]); setScript(''); setCopyState('idle')
    }
  }, [mode])

  // Keyboard shortcuts (Ctrl+Enter to generate, Ctrl+C to copy script)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept 'Cmd+C' if user has text selected
      const isTextSelected = window.getSelection()?.toString().length !== 0;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !isTextSelected && script) {
        e.preventDefault();
        handleCopy();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && mode === 'advanced' && rawInput.trim()) {
        e.preventDefault();
        handleParse();
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleParse, handleCopy, rawInput, mode, script])

  return (
    <main className="flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-36 sm:pt-44 pb-12 px-4 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9b9f9] dark:border-[#533afd]/30 bg-[rgba(83,58,253,0.06)] dark:bg-[rgba(83,58,253,0.15)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#533afd] dark:text-[#d6d9fc] backdrop-blur-sm animate-slide-up-fade" style={{ animationDuration: '400ms' }}>
          Advanced Mode
        </span>
        <h1 className="mt-6 mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 dark:from-slate-50 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-[1.1] animate-slide-up-fade" style={{ animationDuration: '600ms' }}>
          Full control over<br className="hidden sm:block" /> every inbox rule.
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-balance animate-slide-up-fade" style={{ animationDuration: '800ms' }}>
          Paste multiple senders, set nested folders, choose copy or move,
          and pick your match condition - script downloads instantly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-500 dark:text-slate-400 animate-slide-up-fade" style={{ animationDuration: '1000ms' }}>
          {[
            { icon: '📂', text: 'Custom parent folder' },
            { icon: '⚡', text: 'Copy or Move' },
            { icon: '🎯', text: 'Exact or Contains match' },
            { icon: '🌐', text: '@domain.com rules' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2"><span className="opacity-80">{icon}</span> {text}</span>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 pt-10 pb-16">
        {mode === 'quick' ? (
          <div className="mx-auto max-w-[560px]">
            <EmailInput
              mode={mode}
              onModeChange={setMode}
              quickUserEmail={quickUserEmail}
              onQuickUserEmailChange={setQuickUserEmail}
              quickSenderEmail={quickSenderEmail}
              onQuickSenderEmailChange={setQuickSenderEmail}
              onQuickDownload={handleQuickDownload}
              value={rawInput}
              onChange={setRawInput}
              onParse={handleParse}
              userEmail={userEmail}
              onUserEmailChange={setUserEmail}
              parentFolder={parentFolder}
              onParentFolderChange={setParentFolder}
              ruleAction={ruleAction}
              onRuleActionChange={setRuleAction}
              conditionType={conditionType}
              onConditionTypeChange={setConditionType}
              liveCount={liveValid.length}
              invalidCount={liveInvalidCount}
              onReset={handleReset}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(420px,_480px)_1fr] gap-6 items-start">
            <div className="lg:sticky lg:top-[5.5rem] min-w-0">
              <EmailInput
                mode={mode}
                onModeChange={setMode}
                quickUserEmail={quickUserEmail}
                onQuickUserEmailChange={setQuickUserEmail}
                quickSenderEmail={quickSenderEmail}
                onQuickSenderEmailChange={setQuickSenderEmail}
                onQuickDownload={handleQuickDownload}
                value={rawInput}
                onChange={setRawInput}
                onParse={handleParse}
                userEmail={userEmail}
                onUserEmailChange={setUserEmail}
                parentFolder={parentFolder}
                onParentFolderChange={setParentFolder}
                ruleAction={ruleAction}
                onRuleActionChange={setRuleAction}
                conditionType={conditionType}
                onConditionTypeChange={setConditionType}
                liveCount={liveValid.length}
                invalidCount={liveInvalidCount}
                onReset={handleReset}
              />
            </div>
            <div className="min-w-0">
              <GeneratorOutput
                emails={emails}
                liveValid={liveValid}
                script={script}
                parentFolder={parentFolder}
                ruleAction={ruleAction}
                copyState={copyState}
                onCopy={handleCopy}
                onDownload={handleDownload}
                onBrowseTemplates={() => navigate('/templates')}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
