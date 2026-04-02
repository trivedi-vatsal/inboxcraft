
import {
  MockOutlookClient,
  MockFolderStructure,
  MockRulesManager,
  MockAdvancedForm,
  MockTerminal,
  MockTemplatesUI,
} from "@/components/home";

import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { Cta } from "@/components/ui/Cta";
import { QuickGenerator } from "@/components/ui/QuickGenerator";
import { HowItWorks } from "@/components/ui/HowItWorks";

export function HomePage() {
  return (
    <main className="flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden relative">
      
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Interactive Mock Showcase ──────────────────────────────── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 z-20 animate-slide-up-fade" style={{ animationDuration: "1500ms" }}>
        {/* Glow behind the dashboard */}
        <div className="absolute inset-0 top-20 -z-10 mx-auto h-[300px] w-full max-w-3xl bg-[#533afd]/20 dark:bg-[#533afd]/30 blur-[100px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_260px] gap-4 items-stretch rounded-2xl bg-white/40 dark:bg-slate-900/40 p-3 ring-1 ring-slate-200/50 dark:ring-slate-800/50 backdrop-blur-xl shadow-2xl shadow-[rgba(83,58,253,0.05)] dark:shadow-[rgba(83,58,253,0.2)]">

          {/* Left col: Folder tree + Rules manager */}
          <div className="flex flex-col gap-4 h-full">
            <MockFolderStructure />
            <div className="flex-1 min-h-0">
              <MockRulesManager />
            </div>
          </div>

          {/* Center: Organised inbox (main visual) + Templates Demo */}
          <div className="flex flex-col gap-4">
            <MockOutlookClient />
            <MockTemplatesUI />
          </div>

          {/* Right col: Advanced form + Terminal */}
          <div className="flex flex-col gap-4 h-full">
            <MockAdvancedForm />
            <div className="flex-1 min-h-0">
              <MockTerminal />
            </div>
          </div>

        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────── */}
      <Features />

      {/* ── Quick Generator ──────────────────────────────────────── */}
      <QuickGenerator />

      {/* ── How it works ─────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Call To Action ───────────────────────────────────────── */}
      <Cta />
      
    </main>
  );
}

