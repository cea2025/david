'use client'

import React, { useRef } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { DualDashboard } from '@/components/DualDashboard'
import { FinancialTable } from '@/components/FinancialTable'
import { ExcelView } from '@/components/ExcelView'
import { ROICalculator } from '@/components/ROICalculator'
import { SectorOverview } from '@/components/SectorOverview'

export default function Home() {
  const financialsRef = useRef<HTMLDivElement>(null)
  const risksRef = useRef<HTMLDivElement>(null)

  const scrollToFinancials = () => {
    const financialsSection = document.getElementById('financials')
    if (financialsSection) {
      financialsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToRisks = () => {
    const risksSection = document.getElementById('risks')
    if (risksSection) {
      risksSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        onViewFinancials={scrollToFinancials}
        onAnalyzeRisks={scrollToRisks}
      />

      {/* Dual Reality Dashboard */}
      <DualDashboard id="financials" />

      {/* Financial Breakdown Table */}
      <FinancialTable />

      {/* Excel View - Business Plan Data */}
      <ExcelView />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Macro Sector Overview */}
      <SectorOverview />
    </main>
  )
}
