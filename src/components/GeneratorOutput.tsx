
import { FolderTree } from './FolderTree'
import { RulesPreview } from './RulesPreview'
import { ScriptOutput } from './ScriptOutput'
import type { ParsedEmail } from '@/lib/utils'
import type { RuleAction } from '@/lib/powershell'

interface GeneratorOutputProps {
  emails: ParsedEmail[]
  liveValid: ParsedEmail[]
  script: string
  parentFolder: string
  ruleAction: RuleAction
  copyState: 'idle' | 'copied'
  onCopy: () => void
  onDownload: () => void
  onBrowseTemplates: () => void
}

export function GeneratorOutput({
  emails,
  liveValid,
  script,
  parentFolder,
  ruleAction,
  copyState,
  onCopy,
  onDownload,
  onBrowseTemplates,
}: GeneratorOutputProps) {
  const hasOutput    = emails.length > 0 || !!script
  const validEmails  = hasOutput ? emails.filter((e) => e.valid) : liveValid
  const folder       = parentFolder || 'team'

  return (
    <div className="space-y-5">
      {validEmails.length > 0 && (
        <FolderTree aliases={validEmails.map((e) => e.alias)} parentFolder={folder} />
      )}

      {hasOutput ? (
        <>
          {emails.length > 0 && <RulesPreview emails={emails} />}
          {script && (
            <ScriptOutput
              script={script}
              emails={emails.filter((e) => e.valid)}
              parentFolder={folder}
              ruleAction={ruleAction}
              onCopy={onCopy}
              onDownload={onDownload}
              copyState={copyState}
            />
          )}
        </>
      ) : liveValid.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 dark:bg-[#0d1117] shadow-sm min-h-[400px] lg:min-h-[630px] flex flex-col overflow-hidden relative group">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
     	    <div className="flex gap-1.5 shrink-0">
              <span className="h-3 w-3 rounded-full bg-slate-700/50 dark:bg-slate-800" />
              <span className="h-3 w-3 rounded-full bg-slate-700/50 dark:bg-slate-800" />
              <span className="h-3 w-3 rounded-full bg-slate-700/50 dark:bg-slate-800" />
            </div>
            <span className="text-xs font-mono text-slate-500 ml-2">powershell</span>
          </div>
          <div className="p-6 font-mono text-xs leading-relaxed text-slate-400">
            <p className="text-[#b9b9f9]"># Welcome to InboxCraft CLI</p>
            <p className="mt-2 text-slate-500">1. Paste sender email addresses on the left</p>
            <p className="text-slate-500">2. Configure your target parent folder</p>
            <p className="text-slate-500">3. Press <span className="text-slate-300 bg-white/10 px-1 py-0.5 rounded">Ctrl+Enter</span> to generate the script</p>
            
            <p className="mt-6 flex items-center">
              <span className="text-emerald-400 mr-2">➜</span>
              <span className="text-cyan-400">~/inbox</span>
              <span className="text-slate-600 mx-2">_</span>
              <span className="animate-pulse w-2 h-4 bg-slate-400 block" />
            </p>
            
            <div className="absolute bottom-6 left-6 animate-fade-in opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-xs text-slate-500 font-sans">Or pick a{' '}</span>
               <button onClick={onBrowseTemplates} className="text-[#b9b9f9] hover:text-[#d6d9fc] underline underline-offset-2 font-sans">template ✨</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
