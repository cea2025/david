'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'profit' | 'risk' | 'outline' | 'warning'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-navy-100 text-navy-700',
      profit: 'bg-profit-light/20 text-profit-dark',
      risk: 'bg-risk-light/20 text-risk-dark',
      outline: 'border border-navy-300 text-navy-600',
      warning: 'bg-amber-100 text-amber-700',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }

