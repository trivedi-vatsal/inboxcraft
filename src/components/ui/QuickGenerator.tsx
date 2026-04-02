import { QuickGeneratorCard } from "@/components/home"

export function QuickGenerator() {
  return (
    <section
      id="generator"
      className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-8 border-y border-[#e5edf5] dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2
            className="text-[2rem] sm:text-[2.5rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10]"
            style={{ letterSpacing: '-0.64px', fontFeatureSettings: '"ss01"' }}
          >
            Create a rule in seconds
          </h2>
          <p
            className="mt-4 text-[18px] font-[300] text-[#64748d] dark:text-slate-400"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Enter an email and let InboxCraft generate your PowerShell script instantly.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <QuickGeneratorCard />
        </div>
      </div>
    </section>
  )
}
