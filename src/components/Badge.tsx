import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cx } from '@/lib/utils'

const badgeVariants = tv({
  base: cx(
    'inline-flex items-center gap-x-1 whitespace-nowrap rounded-[4px] font-[300]',
    '[font-feature-settings:"ss01"]',
  ),
  variants: {
    variant: {
      default: [
        'bg-[rgba(83,58,253,0.08)] text-[#533afd] border border-[#b9b9f9]',
        'px-1.5 py-0.5 text-[11px]',
        'dark:bg-[rgba(83,58,253,0.15)] dark:text-[#b9b9f9] dark:border-[#533afd]/30',
      ],
      neutral: [
        'bg-white text-black border border-[#f6f9fc]',
        'px-1.5 py-0 text-[11px]',
        'dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
      ],
      success: [
        'bg-[rgba(21,190,83,0.2)] text-[#108c3d] border border-[rgba(21,190,83,0.4)]',
        'px-1.5 py-0.5 text-[10px]',
        'dark:bg-[rgba(21,190,83,0.1)] dark:text-[#15be53] dark:border-[rgba(21,190,83,0.3)]',
      ],
      error: [
        'bg-[rgba(234,34,97,0.08)] text-[#ea2261] border border-[rgba(234,34,97,0.25)]',
        'px-1.5 py-0.5 text-[10px]',
        'dark:bg-[rgba(234,34,97,0.12)] dark:text-[#f96bee] dark:border-[rgba(234,34,97,0.2)]',
      ],
      warning: [
        'bg-[rgba(155,104,41,0.08)] text-[#9b6829] border border-[rgba(155,104,41,0.25)]',
        'px-1.5 py-0.5 text-[10px]',
        'dark:bg-[rgba(155,104,41,0.15)] dark:text-[#f5c06e] dark:border-[rgba(155,104,41,0.2)]',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
