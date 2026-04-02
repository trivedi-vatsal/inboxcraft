import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'
import { cx, focusRing } from '@/lib/utils'

const buttonVariants = tv({
  base: [
    'relative inline-flex items-center justify-center whitespace-nowrap font-[400]',
    '[font-feature-settings:"ss01"]',
    'transition-all duration-100 ease-in-out',
    'disabled:pointer-events-none disabled:opacity-50',
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        'bg-[#533afd] text-white rounded-[4px]',
        'hover:bg-[#4434d4] active:bg-[#2e2b8c]',
        'dark:bg-[#533afd] dark:text-white',
        'dark:hover:bg-[#4434d4]',
      ],
      secondary: [
        'bg-transparent text-[#533afd] rounded-[4px]',
        'border border-[#b9b9f9]',
        'hover:bg-[rgba(83,58,253,0.05)]',
        'dark:text-[#b9b9f9] dark:border-[#533afd]/40',
        'dark:hover:bg-[rgba(83,58,253,0.1)]',
      ],
      ghost: [
        'bg-transparent text-[#273951] rounded-[4px]',
        'hover:bg-[rgba(83,58,253,0.05)] hover:text-[#533afd]',
        'dark:text-slate-300 dark:hover:bg-[rgba(83,58,253,0.1)] dark:hover:text-[#b9b9f9]',
      ],
      destructive: [
        'bg-[#ea2261] text-white rounded-[4px]',
        'hover:bg-[#c41e52] active:bg-[#a01940]',
        'dark:bg-[#ea2261] dark:text-white',
        'dark:hover:bg-[#c41e52]',
      ],
    },
    size: {
      sm: 'h-8 px-3 text-[14px]',
      md: 'h-9 px-4 text-[16px]',
      lg: 'h-10 px-6 text-[16px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cx(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
