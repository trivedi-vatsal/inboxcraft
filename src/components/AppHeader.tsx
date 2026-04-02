import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { RiCloseLine, RiGithubLine, RiMenuLine, RiMoonLine, RiSunLine } from '@remixicon/react'
import { useTheme } from 'next-themes'
import { cx } from '@/lib/utils'
import logoSvg from '@/assets/logo.svg'

const NAV_LINKS = [
  { to: '/',          label: 'Generator',    end: true  },
  { to: '/advanced',  label: 'Advanced',     end: false },
  { to: '/templates', label: 'Templates ✨', end: false },
]

export function AppHeader() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = () => { if (mq.matches) setMenuOpen(false) }
    mq.addEventListener('change', handler)
    handler()
    return () => mq.removeEventListener('change', handler)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cx(
        'fixed inset-x-3 sm:inset-x-6 top-4 z-50 mx-auto flex max-w-5xl flex-col animate-slide-down-fade overflow-hidden rounded-[6px] border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)]',
        menuOpen ? 'max-h-[400px]' : 'max-h-[58px]',
        solid
          ? 'backdrop-blur-nav border-[#e5edf5] dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 shadow-[rgba(50,50,93,0.1)_0px_8px_24px_-8px,rgba(0,0,0,0.06)_0px_4px_12px_-4px]'
          : 'border-transparent bg-white/0 dark:bg-slate-900/0',
      )}
      style={{ animationDuration: '400ms' }}
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0 h-[56px] w-full">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0 z-10">
          <img src={logoSvg} alt="InboxCraft" className="h-7 w-7" />
          <span
            className="text-[14px] font-[400] text-[#061b31] dark:text-slate-100 tracking-tight transition-colors"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            InboxCraft
          </span>
        </NavLink>

        {/* Desktop nav - absolute centered */}
        <nav className="hidden md:absolute md:left-1/2 md:top-[28px] md:block md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                style={{ fontFeatureSettings: '"ss01"' }}
                className={({ isActive }) => cx(
                  'rounded-[4px] px-3 py-1.5 text-[14px] font-[400] transition-colors',
                  isActive
                    ? 'bg-[rgba(83,58,253,0.08)] text-[#533afd] dark:bg-[rgba(83,58,253,0.15)] dark:text-[#b9b9f9]'
                    : 'text-[#061b31] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-800/50 dark:hover:text-slate-100',
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2 shrink-0 z-10">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center rounded-[4px] p-2 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-800/50 dark:hover:text-slate-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
            </button>
          )}
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-[4px] p-2 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-800/50 dark:hover:text-slate-100 transition-colors"
            aria-label="GitHub"
          >
            <RiGithubLine className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/trivedi-vatsal/InboxCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-[4px] bg-[#533afd] px-3 py-1.5 text-[14px] font-[400] text-white hover:bg-[#4434d4] transition-colors"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            Star on GitHub
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1 z-10">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-[4px] p-1.5 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <RiSunLine className="h-5 w-5" /> : <RiMoonLine className="h-5 w-5" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-[4px] p-1.5 text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] transition-colors"
          >
            {menuOpen ? <RiCloseLine className="h-5 w-5" /> : <RiMenuLine className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile expanded menu */}
      <div
        className={cx(
          "w-full px-4 pb-4 md:hidden flex-col transition-opacity duration-300",
          menuOpen ? "opacity-100 flex" : "opacity-0 hidden"
        )}
      >
        <div className="h-px w-full bg-[#e5edf5] dark:bg-slate-800/60 mb-3" />
        <nav>
          <ul className="space-y-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  style={{ fontFeatureSettings: '"ss01"' }}
                  className={({ isActive }) => cx(
                    'block rounded-[4px] px-3 py-2.5 text-[14px] font-[400] transition-colors',
                    isActive
                      ? 'bg-[rgba(83,58,253,0.08)] text-[#533afd] dark:bg-[rgba(83,58,253,0.15)] dark:text-[#b9b9f9]'
                      : 'text-[#061b31] dark:text-slate-300 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-800/50',
                  )}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-[#e5edf5] dark:border-slate-800/60">
              <a
                href="https://github.com/trivedi-vatsal/InboxCraft"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFeatureSettings: '"ss01"' }}
                className="flex items-center gap-2 rounded-[4px] px-3 py-2.5 text-[14px] font-[400] text-[#64748d] dark:text-slate-400 hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd] dark:hover:bg-slate-800/50 transition-colors"
              >
                <RiGithubLine className="h-4 w-4" />
                GitHub Repository
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
