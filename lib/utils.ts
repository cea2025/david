import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = 'NIS'): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + ' ₪'
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('he-IL').format(value)
}

export function formatPercent(value: number): string {
  return value.toFixed(1) + '%'
}

