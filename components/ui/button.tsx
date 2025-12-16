'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'profit' | 'risk'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary:
        'bg-navy-800 text-white hover:bg-navy-700 shadow-lg shadow-navy-900/20',
      secondary:
        'bg-navy-100 text-navy-800 hover:bg-navy-200',
      outline:
        'border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-400',
      ghost:
        'text-navy-700 hover:bg-navy-100',
      profit:
        'bg-profit text-white hover:bg-profit-dark shadow-lg shadow-profit/30',
      risk:
        'bg-risk text-white hover:bg-risk-dark shadow-lg shadow-risk/30',
    }

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-lg',
      md: 'h-11 px-6 text-base rounded-xl',
      lg: 'h-14 px-8 text-lg rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-navy-400 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

