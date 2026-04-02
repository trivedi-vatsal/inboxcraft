import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  'focus:ring-2',
  'focus:ring-[rgba(83,58,253,0.15)]',
  'focus:dark:ring-[rgba(83,58,253,0.25)]',
  'focus:border-[#533afd]',
  'focus:dark:border-[#533afd]',
]

export const focusRing = [
  'outline outline-offset-2 outline-0 focus-visible:outline-2',
  'outline-[#533afd] dark:outline-[#533afd]',
]

export const hasErrorInput = [
  'ring-2',
  'border-red-500 dark:border-red-700',
  'ring-red-200 dark:ring-red-700/30',
]

export interface ParsedEmail {
  raw: string
  alias: string
  domain: string
  valid: boolean
  isDomainRule: boolean
}

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
const DOMAIN_RE = /^[a-zA-Z0-9][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

export function parseEmails(raw: string): ParsedEmail[] {
  const tokens = raw
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const seen = new Set<string>()
  const result: ParsedEmail[] = []

  for (const token of tokens) {
    const lower = token.toLowerCase()
    if (seen.has(lower)) continue
    seen.add(lower)

    // Domain rule: starts with @
    if (lower.startsWith('@')) {
      const domain = lower.slice(1)
      const valid = DOMAIN_RE.test(domain)
      result.push({ raw: lower, alias: domain, domain, valid, isDomainRule: true })
      continue
    }

    const valid = EMAIL_RE.test(lower)
    const atIdx = lower.indexOf('@')
    const alias = valid ? lower.slice(0, atIdx) : lower
    const domain = valid ? lower.slice(atIdx + 1) : ''

    result.push({ raw: lower, alias, domain, valid, isDomainRule: false })
  }

  return result
}

export function parseFileContent(content: string, filename: string): string {
  if (filename.toLowerCase().endsWith('.csv')) {
    const emails: string[] = []
    for (const line of content.split('\n')) {
      for (const field of line.split(',')) {
        const trimmed = field.trim().replace(/^["']|["']$/g, '')
        if (EMAIL_RE.test(trimmed)) emails.push(trimmed)
      }
    }
    return emails.join('\n')
  }
  return content
}
