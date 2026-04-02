import React from "react"
import { cx } from "@/lib/utils"
import { HOW_IT_WORKS } from "@/components/home/HomeData"

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-8 bg-[#1c1e54] overflow-hidden transition-colors">

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hiw-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hiw-dots)" />
        </svg>
        {/* Purple radial glow — top left */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#533afd]/25 blur-[100px]" />
        {/* Ruby accent — bottom right */}
        <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#ea2261]/15 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <h2
              className="text-[2rem] font-[300] text-white leading-[1.10]"
              style={{ letterSpacing: '-0.64px', fontFeatureSettings: '"ss01"' }}
            >
              How it works
            </h2>
            <p
              className="text-[16px] font-[300] text-white/60 mt-2"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              Four simple steps to a cleaner inbox.
            </p>
          </div>
          <span
            className="mt-4 sm:mt-0 flex items-center gap-1.5 rounded-[4px] bg-[rgba(21,190,83,0.15)] border border-[rgba(21,190,83,0.3)] px-3 py-1 text-[12px] font-[400] text-[#15be53]"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#15be53] animate-pulse" />
            Takes under 2 minutes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_28px_1fr_28px_1fr] items-stretch gap-4 sm:gap-0">
          {HOW_IT_WORKS.map(
            (
              { step, title, desc, Icon },
              i
            ) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center px-6 py-8 rounded-[6px] bg-white/[0.06] border border-white/10 hover:bg-white/[0.09] hover:border-white/20 transition-all duration-200 h-full group relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#533afd]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative mb-6 shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[6px] bg-white/10 transition-transform group-hover:scale-105">
                      <Icon className="h-8 w-8 text-white/80" />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#533afd] text-[12px] font-[400] text-white"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {step}
                    </span>
                  </div>
                  <h3
                    className="text-[16px] font-[300] text-white leading-tight"
                    style={{ fontFeatureSettings: '"ss01"' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] font-[300] text-white/60 leading-relaxed text-balance"
                    style={{ fontFeatureSettings: '"ss01"' }}
                  >
                    {desc}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:flex items-center justify-center self-center pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </section>
  )
}
