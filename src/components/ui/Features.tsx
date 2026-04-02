import React from "react"
import { Badge } from "../Badge"
import { FEATURES } from "@/components/home"

export function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-8"
    >
      <div className="flex flex-col items-start">
        <Badge variant="success">Zero Setup Required</Badge>
        <h2
          id="features-title"
          className="mt-4 text-[2rem] sm:text-[3rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10] py-2"
          style={{ letterSpacing: '-0.64px', fontFeatureSettings: '"ss01"' }}
        >
          Instant automation for Outlook
        </h2>
      </div>
      <p
        className="mt-6 max-w-3xl text-[18px] font-[300] leading-[1.40] text-[#64748d] dark:text-slate-400"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        InboxCraft generates idempotent PowerShell scripts that work natively with
        Outlook COM and Exchange Online — no cloud, no accounts, and no data
        sent anywhere. Local script execution means guaranteed privacy.
      </p>
      <dl className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:border-y md:border-[#e5edf5] md:py-16 dark:md:border-slate-800">
        {FEATURES.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="border-l-2 border-[#b9b9f9] pl-6 md:border-l md:text-center lg:border-[#e5edf5] lg:first:border-none dark:border-[#533afd]/30 lg:dark:border-slate-800 transition-colors">
              <dd
                className="inline-block text-[3rem] lg:text-[3.5rem] font-[300] text-[#533afd] dark:text-[#b9b9f9] tabular-nums"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {stat.value}
              </dd>
              <dt
                className="mt-3 text-[13px] font-[400] text-[#061b31] dark:text-slate-100"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                {stat.label}
              </dt>
              <p
                className="mt-2 text-[13px] font-[300] text-[#64748d] dark:text-slate-400 max-w-[200px] md:mx-auto leading-relaxed text-balance"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                {stat.sub}
              </p>
            </div>
          </React.Fragment>
        ))}
      </dl>
    </section>
  )
}
