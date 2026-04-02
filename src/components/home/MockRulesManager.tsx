import { cx } from "@/lib/utils";

// ─── Mock Rules Manager ───────────────────────────────────────────────────────

const MOCK_RULES = [
  { name: "maria.garcia@acme.org",      folder: "team/maria.garcia", on: true  },
  { name: "@github.com (domain)",        folder: "team/github",       on: true  },
  { name: "@slack.com (domain)",         folder: "team/slack",        on: true  },
  { name: "noreply@aws.amazon.com",      folder: "team/aws",          on: true  },
  { name: "no-reply@linkedin.com",       folder: "team/linkedin",     on: true  },
  { name: "noreply@salesforce.com",      folder: "team/salesforce",   on: true  },
];

export function MockRulesManager() {
  return (
    <div className="w-full h-full flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden text-xs select-none bg-white dark:bg-slate-900">
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 px-3 py-2 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <span className="h-2 w-2 rounded-full bg-red-400 dark:bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
        <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
        <span className="ml-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          Outlook - Rules &amp; Alerts
        </span>
      </div>
      <div className="flex-1 bg-white dark:bg-slate-900 p-2.5 overflow-y-auto">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
          Active Rules (8)
        </div>
        <div className="space-y-1">
          {MOCK_RULES.map(({ name, folder, on }) => (
            <div
              key={name}
              className={cx(
                "flex items-start gap-2 rounded-lg px-2 py-1.5",
                on ? "bg-indigo-50/60 dark:bg-indigo-500/10" : "opacity-40"
              )}
            >
              <div
                className={cx(
                  "mt-0.5 h-3 w-3 rounded shrink-0 flex items-center justify-center text-[8px] font-bold",
                  on ? "bg-indigo-600 text-white" : "border border-slate-300 dark:border-slate-700"
                )}
              >
                {on && "✓"}
              </div>
              <div className="min-w-0">
                <div className="font-medium text-[10px] text-slate-700 dark:text-slate-300 truncate">
                  {name}
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 text-left">
                  Copy → <span className="text-indigo-500 dark:text-indigo-400">{folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
