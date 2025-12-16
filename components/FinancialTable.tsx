'use client'

import React from 'react'
import { AlertTriangle, CheckCircle2, ArrowLeftRight, TrendingUp, Factory, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { formatCurrency } from '@/lib/utils'

interface YearData {
  year: string
  sqm: number
  revenue: number
  rawMaterialCost: number
  operationalCost: number
  costReduction: number
  profit: number
}

// נתוני המייסדים (אופטימיים)
const foundersData: YearData[] = [
  { year: 'שנה א', sqm: 11550, revenue: 16170000, rawMaterialCost: 3927000, operationalCost: 7891200, costReduction: 0, profit: 4351800 },
  { year: 'שנה ב', sqm: 23100, revenue: 32340000, rawMaterialCost: 7854000, operationalCost: 11637600, costReduction: 1787100, profit: 14635500 },
  { year: 'שנה ג', sqm: 31500, revenue: 44100000, rawMaterialCost: 10710000, operationalCost: 12988800, costReduction: 2142000, profit: 22543200 },
]

// סיכומים
const totalRevenue = foundersData.reduce((sum, y) => sum + y.revenue, 0)
const totalProfit = foundersData.reduce((sum, y) => sum + y.profit, 0)
const totalSqm = foundersData.reduce((sum, y) => sum + y.sqm, 0)
const avgProfitMargin = ((totalProfit / totalRevenue) * 100).toFixed(0)

export function FinancialTable() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 via-white to-navy-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4">
            <ArrowLeftRight className="w-3 h-3 ml-1" />
            פירוט פיננסי
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            תחזית פיננסית - נתוני המייסדים
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            פירוט הכנסות, עלויות ורווחים לפי התכנית העסקית המקורית
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          <Card variant="elevated" className="text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-xl bg-profit-light/20 mb-3">
                <TrendingUp className="w-6 h-6 text-profit" />
              </div>
              <div className="text-sm font-medium text-navy-500 mb-2">
                סה&quot;כ הכנסות (3 שנים)
              </div>
              <div className="text-2xl font-black text-profit mb-1">
                {formatCurrency(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-xl bg-profit-light/20 mb-3">
                <DollarSign className="w-6 h-6 text-profit" />
              </div>
              <div className="text-sm font-medium text-navy-500 mb-2">
                סה&quot;כ רווח (3 שנים)
              </div>
              <div className="text-2xl font-black text-profit mb-1">
                {formatCurrency(totalProfit)}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-xl bg-navy-100 mb-3">
                <Factory className="w-6 h-6 text-navy-600" />
              </div>
              <div className="text-sm font-medium text-navy-500 mb-2">
                סה&quot;כ מ&quot;ר (3 שנים)
              </div>
              <div className="text-2xl font-black text-navy-800 mb-1">
                {totalSqm.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="text-center border-2 border-profit-light">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-xl bg-profit-light/20 mb-3">
                <CheckCircle2 className="w-6 h-6 text-profit" />
              </div>
              <div className="text-sm font-medium text-navy-500 mb-2">
                רווחיות ממוצעת
              </div>
              <div className="text-2xl font-black text-profit mb-1">
                {avgProfitMargin}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Table */}
        <Card variant="elevated" className="overflow-hidden max-w-6xl mx-auto">
          <CardHeader className="bg-navy-800 text-white">
            <CardTitle className="text-white">פירוט שנתי מלא</CardTitle>
            <CardDescription className="text-navy-200">
              נתונים לפי התכנית העסקית של המייסדים
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-50">
                    <th className="text-right p-4 font-bold text-navy-800">תקופה</th>
                    <th className="text-center p-4 font-bold text-navy-600">מ&quot;ר שנתי</th>
                    <th className="text-center p-4 font-bold text-blue-600">הכנסות</th>
                    <th className="text-center p-4 font-bold text-orange-600">עלות גלם</th>
                    <th className="text-center p-4 font-bold text-red-600">משכורות ושוטף</th>
                    <th className="text-center p-4 font-bold text-teal-600">הוזלת עלויות</th>
                    <th className="text-center p-4 font-bold text-profit">רווח נקי</th>
                  </tr>
                </thead>
                <tbody>
                  {foundersData.map((yearData, index) => {
                    const profitMargin = ((yearData.profit / yearData.revenue) * 100).toFixed(0)
                    return (
                      <tr
                        key={yearData.year}
                        className={`border-b border-navy-100 hover:bg-navy-50/50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-navy-50/30'
                        }`}
                      >
                        <td className="p-4 font-semibold text-navy-800">{yearData.year}</td>
                        <td className="p-4 text-center font-mono text-navy-600">
                          {yearData.sqm.toLocaleString()}
                        </td>
                        <td className="p-4 text-center font-mono font-bold text-blue-600">
                          {formatCurrency(yearData.revenue)}
                        </td>
                        <td className="p-4 text-center font-mono text-orange-600">
                          {formatCurrency(yearData.rawMaterialCost)}
                        </td>
                        <td className="p-4 text-center font-mono text-red-600">
                          {formatCurrency(yearData.operationalCost)}
                        </td>
                        <td className="p-4 text-center font-mono text-teal-600">
                          {yearData.costReduction > 0 ? `+${formatCurrency(yearData.costReduction)}` : '-'}
                        </td>
                        <td className="p-4 text-center">
                          <div className="font-mono font-bold text-profit">
                            {formatCurrency(yearData.profit)}
                          </div>
                          <Badge variant="profit" className="text-xs mt-1">
                            {profitMargin}%
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-navy-800 text-white font-bold">
                    <td className="p-4">סה&quot;כ (3 שנים)</td>
                    <td className="p-4 text-center font-mono">
                      {totalSqm.toLocaleString()}
                    </td>
                    <td className="p-4 text-center font-mono text-blue-300">
                      {formatCurrency(totalRevenue)}
                    </td>
                    <td className="p-4 text-center font-mono text-orange-300">
                      {formatCurrency(foundersData.reduce((s, y) => s + y.rawMaterialCost, 0))}
                    </td>
                    <td className="p-4 text-center font-mono text-red-300">
                      {formatCurrency(foundersData.reduce((s, y) => s + y.operationalCost, 0))}
                    </td>
                    <td className="p-4 text-center font-mono text-teal-300">
                      +{formatCurrency(foundersData.reduce((s, y) => s + y.costReduction, 0))}
                    </td>
                    <td className="p-4 text-center font-mono text-profit-light">
                      {formatCurrency(totalProfit)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Investment Note */}
        <div className="mt-8 max-w-3xl mx-auto">
          <Card variant="glass" className="border border-navy-200 bg-navy-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-navy-100">
                  <DollarSign className="w-5 h-5 text-navy-600" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-800 mb-1">השקעה נדרשת</h4>
                  <p className="text-sm text-navy-600">
                    <strong>הקמה:</strong> 4,030,000₪ | 
                    <strong> שנת הקמה (תפעול):</strong> 4,121,600₪ | 
                    <strong> סה&quot;כ:</strong> 8,151,600₪
                  </p>
                  <p className="text-sm text-navy-500 mt-2">
                    * הנתונים מבוססים על התכנית העסקית המקורית של המייסדים. 
                    מחיר מכירה: 1,400₪ למ&quot;ר | עלות גלם: ~340₪ למ&quot;ר
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

