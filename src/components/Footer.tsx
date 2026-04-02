import { Link } from 'react-router-dom'
import { RiArrowRightUpLine, RiGithubLine } from '@remixicon/react'
import logoSvg from '@/assets/logo.svg'

const navigation = {
  tool: [
    { name: 'Generator',     to: '/',           external: false },
    { name: 'Advanced',      to: '/advanced',   external: false },
    { name: 'Templates ✨',  to: '/templates',  external: false },
    { name: 'Privacy Policy',to: '/privacy',    external: false },
    { name: 'Changelog',     to: '/changelog',  external: false },
  ],
  resources: [
    { name: 'Documentation',   href: 'https://github.com/trivedi-vatsal/InboxCraft#readme', external: true },
    { name: 'Contributing',    href: 'https://github.com/trivedi-vatsal/InboxCraft/blob/main/CONTRIBUTING.md', external: true },
    { name: 'Report an Issue', href: 'https://github.com/trivedi-vatsal/InboxCraft/issues', external: true },
    { name: 'Source Code',     href: 'https://github.com/trivedi-vatsal/InboxCraft', external: true },
    { name: 'llms.txt',        href: '/InboxCraft/llms.txt', external: true },
  ],
  powershell: [
    { name: 'Exchange Online',  href: 'https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell', external: true },
    { name: 'Outlook COM Rules', href: 'https://learn.microsoft.com/en-us/office/vba/api/outlook.rules', external: true },
    { name: 'New-InboxRule',    href: 'https://learn.microsoft.com/en-us/powershell/module/exchange/new-inboxrule', external: true },
  ],
}

function ExtIcon() {
  return (
    <div className="ml-1 aspect-square size-3 shrink-0 rounded-full bg-[#e5edf5] dark:bg-slate-800 p-px">
      <RiArrowRightUpLine aria-hidden className="size-full text-[#64748d] dark:text-slate-400" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-[#e5edf5] dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 pt-16 lg:pt-20">
        <div className="xl:grid xl:grid-cols-[280px_1fr] xl:gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <img src={logoSvg} alt="InboxCraft" className="h-8 w-8" />
              <span
                className="text-[14px] font-[400] text-[#061b31] dark:text-slate-50"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                InboxCraft
              </span>
            </div>
            <p
              className="text-[13px] font-[300] leading-[1.6] text-[#64748d] dark:text-slate-400 max-w-xs"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              Generate PowerShell scripts to automate Outlook inbox rules — no code, no server, no sign-up required.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/trivedi-vatsal/InboxCraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748d] dark:text-slate-500 hover:text-[#533afd] dark:hover:text-slate-300 transition-colors"
                aria-label="GitHub"
              >
                <RiGithubLine className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:mt-0">

            {/* Tool */}
            <div>
              <h3
                className="text-[13px] font-[400] text-[#061b31] dark:text-slate-100"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                Tool
              </h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.tool.map(({ name, to }) => (
                  <li key={to} className="w-fit">
                    <Link
                      to={to}
                      className="flex items-center text-[13px] font-[300] text-[#64748d] dark:text-slate-400 hover:text-[#533afd] dark:hover:text-slate-100 transition-colors"
                      style={{ fontFeatureSettings: '"ss01"' }}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3
                className="text-[13px] font-[400] text-[#061b31] dark:text-slate-100"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                Resources
              </h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.resources.map(({ name, href }) => (
                  <li key={href} className="w-fit">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[13px] font-[300] text-[#64748d] dark:text-slate-400 hover:text-[#533afd] dark:hover:text-slate-100 transition-colors"
                      style={{ fontFeatureSettings: '"ss01"' }}
                    >
                      {name}
                      <ExtIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PowerShell Docs */}
            <div>
              <h3
                className="text-[13px] font-[400] text-[#061b31] dark:text-slate-100"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                PowerShell
              </h3>
              <ul className="mt-5 space-y-3.5">
                {navigation.powershell.map(({ name, href }) => (
                  <li key={href} className="w-fit">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[13px] font-[300] text-[#64748d] dark:text-slate-400 hover:text-[#533afd] dark:hover:text-slate-100 transition-colors"
                      style={{ fontFeatureSettings: '"ss01"' }}
                    >
                      {name}
                      <ExtIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#e5edf5] dark:border-slate-800/80 pt-8 sm:flex-row sm:items-center lg:mt-20">
          <p
            className="text-[13px] font-[300] text-[#64748d] dark:text-slate-400"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            © {new Date().getFullYear()} InboxCraft · Built by{' '}
            <a
              href="https://vatsal.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#533afd] hover:text-[#4434d4] transition-colors"
            >
              Vatsal Trivedi
            </a>
            {' · '}
            <a
              href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#533afd] transition-colors"
            >
              v1.0.1
            </a>
            {' · '}
            <a
              href="https://github.com/trivedi-vatsal/InboxCraft/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#533afd] transition-colors"
            >
              MIT
            </a>
          </p>

          <div className="rounded-[4px] border border-[#e5edf5] dark:border-slate-800 py-1 pl-1 pr-3">
            <div className="flex items-center gap-1.5">
              <div className="relative size-4 shrink-0">
                <div className="absolute inset-[2px] rounded-full bg-[#15be53]/20" />
                <div className="absolute inset-1 rounded-full bg-[#15be53]" />
              </div>
              <span
                className="text-[12px] font-[300] text-[#64748d] dark:text-slate-400 transition-colors"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                Runs in your browser
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
