// ─── Mock Terminal ────────────────────────────────────────────────────────────

export function MockTerminal() {
  return (
    <div className="w-full h-full flex flex-col rounded-xl border border-slate-700 shadow-xl overflow-hidden text-xs select-none">
      <div className="flex items-center gap-1.5 bg-[#1e1e2e] px-3 py-2 border-b border-white/5 shrink-0">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[10px] text-slate-500 font-medium">
          Windows PowerShell
        </span>
      </div>
      <div className="flex-1 bg-[#1e1e2e] p-3 font-mono space-y-0.5 text-[10px] text-left overflow-y-auto">
        <div className="text-indigo-300">
          PS C:\Users\vatsal&gt; .\outlook-rules.ps1
        </div>
        <div className="text-slate-500 pt-1">
          Connecting to Exchange Online...
        </div>
        <div className="text-emerald-400">✓ Session authenticated</div>
        <div className="text-slate-500 pt-1">Creating folders and rules...</div>
        <div className="text-emerald-400">✓ Folder: team/maria.garcia</div>
        <div className="text-emerald-400">
          ✓ Rule:&nbsp;&nbsp; From maria.garcia → Copy
        </div>
        <div className="text-emerald-400">✓ Folder: team/github</div>
        <div className="text-emerald-400">
          ✓ Rule:&nbsp;&nbsp; From @github.com → Copy
        </div>
        <div className="text-emerald-400">✓ Folder: team/slack</div>
        <div className="text-emerald-400">
          ✓ Rule:&nbsp;&nbsp; From @slack.com → Copy
        </div>
        <div className="text-white font-semibold pt-1.5">
          Done. 3 folders + 3 rules created.
        </div>
        <div className="text-slate-600">
          PS C:\Users\vatsal&gt; <span className="animate-pulse">█</span>
        </div>
      </div>
    </div>
  );
}
