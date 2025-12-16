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
      <div className={cn('flex items-center gap-4 flex-wrap justify-center', className)}>
        {labelLeft && (
          <button
            onClick={() => onCheckedChange(false)}
            className={cn(
              'text-sm font-bold transition-all duration-200 px-4 py-2 rounded-lg whitespace-nowrap',
              !checked 
                ? 'text-white bg-profit shadow-lg' 
                : 'text-navy-500 hover:text-navy-700 hover:bg-navy-100'
            )}
          >
            {labelLeft}
          </button>
        )}
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          onClick={() => onCheckedChange(!checked)}
          className={cn(
            'relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 flex-shrink-0',
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
          <button
            onClick={() => onCheckedChange(true)}
            className={cn(
              'text-sm font-bold transition-all duration-200 px-4 py-2 rounded-lg whitespace-nowrap',
              checked 
                ? 'text-white bg-risk shadow-lg' 
                : 'text-navy-500 hover:text-navy-700 hover:bg-navy-100'
            )}
          >
            {labelRight}
          </button>
        )}
      </div>
    )
  }
)
Toggle.displayName = 'Toggle'

export { Toggle }

