import { ReactNode } from "react"
import ReactMarkdown from 'react-markdown'
import changelogText from '../../CHANGELOG.md?raw'

// Parse the raw markdown into blocks for each version
const rawBlocks = changelogText.split(/(?=\n##\s)/)
const entries = rawBlocks
  .map(block => block.trim())
  .filter(block => block.startsWith('## '))
  .map(block => {
    // Extract version and date from the heading
    const match = block.match(/^##\s+([\d\.]+)(?:\s+-\s+(.+))?/);
    const version = match ? match[1] : 'Unknown';
    const date = match && match[2] ? match[2].trim() : '';
    
    // Remove the root heading `## ` line from content
    let content = block.replace(/^##.*$/m, '');
    
    // Remove the redundant Changesets metadata headings (e.g. "### Minor Changes")
    content = content.replace(/^###\s+(Minor|Patch|Major)\s+Changes\s*/gm, '');
    content = content.trim();

    return { version, date, content };
  });

// ── Components ──

const ChangelogEntry = ({
  version,
  date,
  children,
}: {
  version: string
  date: string
  children: ReactNode
}) => (
  <div className="relative flex flex-col justify-start gap-8 border-b border-slate-200 dark:border-slate-800 py-8 md:flex-row md:py-12 last:border-none">
    <div className="mb-4 md:mb-0 md:w-48 shrink-0">
      <div className="sticky top-24 flex items-center space-x-3 md:block md:space-x-0 md:space-y-2">
        <span className="inline-flex items-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          v{version}
        </span>
        <span className="block whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
          {date}
        </span>
      </div>
    </div>
    <div className="md:flex-1 text-sm text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </div>
)

// MDX mapping wrappers matching the exact UI styling
const MDX_COMPONENTS = {
  h3: ({ node, ...props }: any) => <h3 className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100" {...props} />,
  p: ({ node, ...props }: any) => <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="mb-6 ml-5 list-disc space-y-1.5 leading-relaxed text-slate-600 dark:text-slate-400 marker:text-slate-400 dark:marker:text-slate-600" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props} />,
  code: ({ node, className, ...props }: any) => {
    const isInline = !className?.includes('language-');
    return isInline 
      ? <code className="text-[0.85em] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400" {...props} /> 
      : <code className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg block whitespace-pre-wrap text-sm font-mono overflow-x-auto" {...props} />
  }
}

// ── Page ──

export function ChangelogPage() {
  return (
    <main className="flex flex-col flex-1 items-center justify-start bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* ── Hero ── */}
      <section className="relative w-full pt-36 sm:pt-44 pb-16 px-4 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 backdrop-blur-sm animate-slide-up-fade" style={{ animationDuration: '400ms' }}>
          What's New
        </span>
        <h1 className="mt-6 mx-auto max-w-3xl text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10] animate-slide-up-fade" style={{ letterSpacing: '-0.96px', fontFeatureSettings: '"ss01"', animationDuration: '600ms' }}>
          Changelog
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-balance animate-slide-up-fade" style={{ animationDuration: '800ms' }}>
          New updates and recent improvements to InboxCraft.
        </p>
      </section>

      {/* ── Content ── */}
      <div className="w-full max-w-5xl px-4 sm:px-8 pb-32 animate-slide-up-fade" style={{ animationDuration: '1000ms' }}>
        <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/50 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
          
          {entries.map((entry, idx) => (
            <ChangelogEntry key={idx} version={entry.version} date={entry.date}>
              <ReactMarkdown components={MDX_COMPONENTS}>
                {entry.content}
              </ReactMarkdown>
            </ChangelogEntry>
          ))}

        </div>
      </div>
    </main>
  )
}
