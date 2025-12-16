'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  labelLeft?: string
  labelRight?: string
  className?: string
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onCheckedChange, labelLeft, labelRight, className }, ref) => {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        {labelLeft && (
          <span
            className={cn(
              'text-sm font-semibold transition-colors duration-200',
              !checked ? 'text-profit-dark' : 'text-navy-400'
            )}
          >
            {labelLeft}
          </span>
        )}
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          onClick={() => onCheckedChange(!checked)}
          className={cn(
            'relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            checked
              ? 'bg-risk focus:ring-risk'
              : 'bg-profit focus:ring-profit'
          )}
        >
          <span
            className={cn(
              'inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300',
              checked ? 'translate-x-2' : 'translate-x-8'
            )}
          />
        </button>
        {labelRight && (
          <span
            className={cn(
              'text-sm font-semibold transition-colors duration-200',
              checked ? 'text-risk-dark' : 'text-navy-400'
            )}
          >
            {labelRight}
          </span>
        )}
      </div>
    )
  }
)
Toggle.displayName = 'Toggle'

export { Toggle }

