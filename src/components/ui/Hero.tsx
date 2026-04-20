import { RiArrowRightLine, RiDownloadLine } from "@remixicon/react"
import { Link } from "react-router-dom"
import { Button } from "../Button"
import GameOfLife from "./HeroBackground"

export function Hero() {
  return (
    <section aria-label="hero" className="relative flex flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden px-4 bg-white dark:bg-slate-950">
      {/* Background Animation */}
      <GameOfLife />

      <div className="z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-[4px] border border-[#b9b9f9] bg-[rgba(83,58,253,0.06)] dark:border-[#533afd]/30 dark:bg-[rgba(83,58,253,0.1)] px-3 py-1.5 mb-8 animate-slide-up-fade"
          style={{ animationDuration: "500ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#533afd]" />
          <span
            className="text-[12px] font-[400] text-[#533afd] dark:text-[#b9b9f9]"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Free · No sign-up · Runs in your browser
          </span>
        </div>

        {/* Headline */}
        <h2
          className="max-w-4xl text-[3rem] sm:text-[3.5rem] md:text-[3.5rem] font-[300] text-[#061b31] dark:text-slate-50 leading-[1.10] animate-slide-up-fade"
          style={{
            letterSpacing: '-0.96px',
            fontFeatureSettings: '"ss01"',
            animationDuration: "700ms",
          }}
        >
          Stop sorting emails manually.
        </h2>
        <h1
          className="mt-3 text-[1.63rem] sm:text-[2rem] font-[300] text-[#273951] dark:text-slate-300 leading-[1.12] animate-slide-up-fade"
          style={{
            letterSpacing: '-0.64px',
            fontFeatureSettings: '"ss01"',
            animationDuration: "800ms",
          }}
        >
          Automate your Outlook inbox rules.
        </h1>

        {/* Sub-headline */}
        <p
          className="mt-6 max-w-xl text-[18px] font-[300] text-center text-balance text-[#64748d] dark:text-slate-400 leading-[1.40] animate-slide-up-fade"
          style={{ fontFeatureSettings: '"ss01"', animationDuration: "900ms" }}
        >
          Paste sender addresses, choose how to organise them, and InboxCraft
          generates a PowerShell script that creates folders and rules
          automatically in seconds.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full animate-slide-up-fade"
          style={{ animationDuration: "1100ms" }}
        >
          <Button
            type="button"
            onClick={() =>
              document
                .getElementById("generator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto flex items-center gap-2 h-10 px-5 rounded-[4px] bg-[#533afd] text-white hover:bg-[#4434d4] transition-colors text-[16px] font-[400]"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            <RiDownloadLine className="hidden sm:block size-4" />
            <span className="">Create Rules Free</span>
            {/* <span className="sm:hidden">Get Link for Desktop</span> */}
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto h-10 px-5 rounded-[4px] flex items-center gap-2 text-[16px] font-[400] group"
            style={{ fontFeatureSettings: '"ss01"' }}
            asChild
          >
            <Link to="/templates">
              Browse Templates
              <RiArrowRightLine className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Feature pills */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-5 text-[13px] font-[400] text-[#64748d] dark:text-slate-400 animate-slide-up-fade"
          style={{ fontFeatureSettings: '"ss01"', animationDuration: "1300ms" }}
        >
          {[
            { icon: "📂", text: "Nested folder structure" },
            { icon: "⚡", text: "Copy or Move rules" },
            { icon: "🌐", text: "Domain-wide matching" },
            { icon: "🔒", text: "Nothing leaves your browser" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <span className="opacity-70">{icon}</span> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
