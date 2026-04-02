import { RiShieldCheckLine } from "@remixicon/react";
import { Faq } from "@/components/ui/Faq";

export function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col flex-1 items-center justify-start bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* ── Hero ── */}
      <section className="relative w-full pt-36 sm:pt-44 pb-16 px-4 sm:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 backdrop-blur-sm animate-slide-up-fade" style={{ animationDuration: '400ms' }}>
          Privacy & Safety
        </span>
        <h1 className="mt-6 mx-auto max-w-3xl text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10] animate-slide-up-fade" style={{ letterSpacing: '-0.96px', fontFeatureSettings: '"ss01"', animationDuration: '600ms' }}>
          100% Local.<br className="hidden sm:block" /> Serverless execution.
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-balance animate-slide-up-fade" style={{ animationDuration: '800ms' }}>
          We take data privacy seriously. Everything you need to know about safety, keeping data local, and running the script.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-500 dark:text-slate-400 animate-slide-up-fade" style={{ animationDuration: '1000ms' }}>
          {[
            { icon: '🔒', text: '100% Local Processing' },
            { icon: '📊', text: 'Anonymous analytics only' },
            { icon: '🛡️', text: 'Enterprise compliance' },
            { icon: '💻', text: 'Standard user rights' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2"><span className="opacity-80">{icon}</span> {text}</span>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <div className="w-full max-w-5xl px-4 sm:px-8 pb-32 animate-slide-up-fade" style={{ animationDuration: '1200ms' }}>

        {/* Privacy Policy Container */}
        <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/50 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 mb-12">

          {/* Intro row */}
          <div className="flex flex-col md:flex-row md:gap-16 border-b border-slate-200 dark:border-slate-800 py-8 md:py-12">
            <div className="mb-4 md:mb-0 md:w-48 shrink-0">
              <div className="sticky top-24 flex items-center gap-2 md:block">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold ring-1 ring-inset ring-emerald-500/20">
                  <RiShieldCheckLine className="w-4 h-4" />
                  Privacy Policy
                </div>
              </div>
            </div>
            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                InboxCraft is designed with enterprise security and privacy as a fundamental principle. All script generation happens entirely in your browser - no backend, no database, no credentials shared with us.
              </p>
            </div>
          </div>

          {/* No Data Collection */}
          <div className="flex flex-col md:flex-row md:gap-16 border-b border-slate-200 dark:border-slate-800 py-8 md:py-12">
            <div className="mb-4 md:mb-0 md:w-48 shrink-0">
              <div className="sticky top-24">
                <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Script Data
                </span>
              </div>
            </div>
            <div className="md:flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">No Data Collection</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                When using InboxCraft to generate Outlook rules, <strong className="font-semibold text-slate-900 dark:text-slate-100">absolutely no data leaves your browser</strong>. All processing, script generation, and logic happens entirely client-side using JavaScript running directly on your local machine.
              </p>
            </div>
          </div>

          {/* No External Servers */}
          <div className="flex flex-col md:flex-row md:gap-16 border-b border-slate-200 dark:border-slate-800 py-8 md:py-12">
            <div className="mb-4 md:mb-0 md:w-48 shrink-0">
              <div className="sticky top-24">
                <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Infrastructure
                </span>
              </div>
            </div>
            <div className="md:flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">No External Servers</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We do not have a backend API or database. There are no servers that receive, process, or store the email addresses, folder structures, or rules you input into the tool.
              </p>
            </div>
          </div>

          {/* Anonymous Analytics */}
          <div className="flex flex-col md:flex-row md:gap-16 border-b border-slate-200 dark:border-slate-800 py-8 md:py-12">
            <div className="mb-4 md:mb-0 md:w-48 shrink-0">
              <div className="sticky top-24">
                <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Analytics
                </span>
              </div>
            </div>
            <div className="md:flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">Anonymous Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                InboxCraft uses <strong className="font-semibold text-slate-900 dark:text-slate-100">PostHog</strong> for anonymous, aggregated product analytics - page views, feature usage, and session recordings (with all inputs masked). This data contains <strong className="font-semibold text-slate-900 dark:text-slate-100">no email addresses, folder names, or any content you enter into the tool</strong>. It is used solely to understand which features are most useful and to improve the product.
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed list-disc list-inside marker:text-slate-400 dark:marker:text-slate-600">
                <li>No personal identifiers are collected or stored</li>
                <li>All form inputs are masked in session recordings</li>
                <li>No data is sold or shared with third parties</li>
                <li>Analytics are entirely separate from script generation - your rules data never leaves the browser</li>
              </ul>
            </div>
          </div>

          {/* Corporate Compliance */}
          <div className="flex flex-col md:flex-row md:gap-16 py-8 md:py-12">
            <div className="mb-4 md:mb-0 md:w-48 shrink-0">
              <div className="sticky top-24">
                <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  Compliance
                </span>
              </div>
            </div>
            <div className="md:flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">Corporate Compliance</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Because the tool operates fully locally and the resulting PowerShell script is executed by the user on their own authenticated session, InboxCraft introduces no third-party data compliance risks. You do not need to share credentials, OAuth tokens, or administrative access with our service.
              </p>
            </div>
          </div>

        </div>

        {/* ── FAQ ── */}
        <Faq />
      </div>
    </main>
  );
}
