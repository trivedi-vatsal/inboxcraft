import { Link } from "react-router-dom"
import { RiArrowRightLine } from "@remixicon/react"

export function Cta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative w-full bg-[#1c1e54] border-t border-white/10 py-24 sm:py-32 px-4 overflow-hidden"
    >

      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Large central purple bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#533afd]/20 blur-[120px]" />
        {/* Ruby streak — top left */}
        <div className="absolute -top-16 -left-16 w-[320px] h-[320px] rounded-full bg-[#ea2261]/20 blur-[80px]" />
        {/* Magenta streak — bottom right */}
        <div className="absolute -bottom-16 -right-16 w-[320px] h-[320px] rounded-full bg-[#f96bee]/12 blur-[90px]" />
        {/* Horizontal gradient line accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#533afd]/50 to-transparent" />
        {/* Faint diagonal rule lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-lines)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Ruby–magenta decorative pill above heading */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 bg-gradient-to-r from-[#ea2261]/20 to-[#f96bee]/20 border border-[#ea2261]/25">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#ea2261] to-[#f96bee]" />
          <span className="text-[12px] font-[400] text-white/60" style={{ fontFeatureSettings: '"ss01"' }}>
            Free forever · No account needed
          </span>
        </div>

        <h3
          id="cta-title"
          className="text-[2rem] sm:text-[3rem] font-[300] text-white leading-[1.10]"
          style={{ letterSpacing: '-0.64px', fontFeatureSettings: '"ss01"' }}
        >
          Ready to get organised?
        </h3>
        <p
          className="mx-auto mt-5 max-w-2xl text-[18px] font-[300] text-white/60 leading-[1.40]"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          Pick a pre-built template for your favourite service, or go advanced
          to configure every detail.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            to="/templates"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-[#533afd] px-6 py-2.5 text-[16px] font-[400] text-white hover:bg-[#4434d4] transition-colors"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Browse Templates ✨
          </Link>
          <Link
            to="/advanced"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-transparent border border-white/20 px-6 py-2.5 text-[16px] font-[400] text-white/80 hover:bg-white/5 hover:border-white/30 transition-colors"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Advanced Mode
            <RiArrowRightLine className="size-4" />
          </Link>
        </div>

        <p
          className="mt-8 text-[13px] font-[300] text-white/40"
          style={{ fontFeatureSettings: '"ss01"' }}
        >
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b9b9f9] hover:text-white transition-colors"
          >
            MIT licensed
          </a>
          {" · Open source · "}
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b9b9f9] hover:text-white transition-colors"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </section>
  )
}
