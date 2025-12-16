'use client'

import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  PiggyBank,
  Target,
  Clock,
  Percent,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'

// נתונים להשקעה
const INITIAL_INVESTMENT = 3000000 // השקעה ראשונית

// תרחיש אופטימי (תכנית עסקית) - נתוני המייסדים
const optimisticScenario = {
  name: 'אופטימי',
  color: '#22c55e',
  yearlyProfits: [4351800, 14635500, 22543200], // לפי נתוני המייסדים
  totalProfit: 41530500,
}

// תרחיש פסימי (קטסטרופה מבוקרת)
// הנחות: 50% מכירות, +30% עלות גלם, +25% עלות עבודה
// מבוסס על ה-Stress Test
const realisticScenario = {
  name: 'פסימי',
  color: '#ef4444',
  yearlyProfits: [-4200000, -1800000, 1500000], // הפסדים כבדים ב-2 שנים ראשונות
  totalProfit: -4500000, // הפסד מצטבר!
}

// חישוב תשואה שנתית ממוצעת (CAGR)
function calculateCAGR(initialValue: number, finalValue: number, years: number): number {
  if (finalValue <= 0) return -100
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
}

// חישוב ריבית דריבית
function calculateCompoundGrowth(principal: number, rate: number, years: number): number[] {
  const values = [principal]
  for (let i = 1; i <= years; i++) {
    values.push(values[i - 1] * (1 + rate / 100))
  }
  return values
}

// יצירת נתונים לגרף
function generateChartData() {
  const data = []
  
  // אופטימי - חישוב ערך מצטבר
  let optCumulative = INITIAL_INVESTMENT
  let realCumulative = INITIAL_INVESTMENT
  
  data.push({
    year: 'השקעה',
    optimistic: INITIAL_INVESTMENT,
    realistic: INITIAL_INVESTMENT,
    breakeven: INITIAL_INVESTMENT,
  })
  
  for (let i = 0; i < 3; i++) {
    optCumulative += optimisticScenario.yearlyProfits[i]
    realCumulative += realisticScenario.yearlyProfits[i]
    
    data.push({
      year: `שנה ${i + 1}`,
      optimistic: optCumulative,
      realistic: realCumulative,
      breakeven: INITIAL_INVESTMENT,
    })
  }
  
  // שנים 4-5 עם הנחת המשך צמיחה
  const optGrowthRate = 1.15 // 15% צמיחה שנתית
  const realGrowthRate = 1.10 // 10% צמיחה שנתית
  
  let optLastProfit = optimisticScenario.yearlyProfits[2]
  let realLastProfit = realisticScenario.yearlyProfits[2]
  
  for (let i = 4; i <= 5; i++) {
    optLastProfit *= optGrowthRate
    realLastProfit *= realGrowthRate
    optCumulative += optLastProfit
    realCumulative += realLastProfit
    
    data.push({
      year: `שנה ${i}`,
      optimistic: Math.round(optCumulative),
      realistic: Math.round(realCumulative),
      breakeven: INITIAL_INVESTMENT,
    })
  }
  
  return data
}

// חישוב ROI שנתי
const optimisticFinalValue = INITIAL_INVESTMENT + optimisticScenario.totalProfit
const realisticFinalValue = INITIAL_INVESTMENT + realisticScenario.totalProfit

const optimisticCAGR = calculateCAGR(INITIAL_INVESTMENT, optimisticFinalValue, 3)
const realisticCAGR = calculateCAGR(INITIAL_INVESTMENT, realisticFinalValue, 3)

const optimisticTotalROI = ((optimisticFinalValue - INITIAL_INVESTMENT) / INITIAL_INVESTMENT) * 100
const realisticTotalROI = ((realisticFinalValue - INITIAL_INVESTMENT) / INITIAL_INVESTMENT) * 100

// נקודת איזון (בחודשים)
const optimisticBreakeven = Math.ceil(INITIAL_INVESTMENT / (optimisticScenario.yearlyProfits[0] / 12))
// פסימי: אם יש הפסד מתמשך, אין נקודת איזון בטווח הנראה
const realisticBreakeven = realisticScenario.totalProfit < 0 ? -1 : 999 // סימן להפסד

export function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(INITIAL_INVESTMENT)
  const [mounted, setMounted] = useState(false)
  const chartData = generateChartData()

  useEffect(() => {
    setMounted(true)
  }, [])

  // חישוב תשואה על השקעה מותאמת אישית
  const customOptimisticReturn = (investmentAmount / INITIAL_INVESTMENT) * optimisticFinalValue
  const customRealisticReturn = (investmentAmount / INITIAL_INVESTMENT) * realisticFinalValue

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4 bg-indigo-100 text-indigo-700">
            <Calculator className="w-3 h-3 ml-1" />
            מחשבון תשואה
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            ניתוח תשואה על ההשקעה (ROI)
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            השוואת תשואה שנתית בריבית דריבית - תרחיש אופטימי מול ריאליסטי
          </p>
        </div>

        {/* ROI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Optimistic ROI */}
          <Card variant="elevated" className="border-2 border-profit-light overflow-hidden">
            <CardHeader className="bg-gradient-to-l from-profit-light/20 to-profit/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-profit-dark flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    תרחיש אופטימי
                  </CardTitle>
                  <CardDescription className="text-profit">
                    לפי התכנית העסקית
                  </CardDescription>
                </div>
                <Badge variant="profit" className="text-lg px-3 py-1">
                  📈
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Annual ROI */}
              <div className="text-center p-4 rounded-xl bg-profit-light/10">
                <div className="text-sm text-navy-600 mb-1">תשואה שנתית ממוצעת (CAGR)</div>
                <div className="text-5xl font-black text-profit">
                  {optimisticCAGR.toFixed(1)}%
                </div>
                <div className="text-xs text-navy-500 mt-1">בריבית דריבית</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Total ROI */}
                <div className="p-4 rounded-xl bg-white border border-profit-light/30">
                  <div className="flex items-center gap-2 text-navy-500 text-sm mb-1">
                    <Percent className="w-4 h-4" />
                    תשואה כוללת (3 שנים)
                  </div>
                  <div className="text-2xl font-bold text-profit-dark">
                    {optimisticTotalROI.toFixed(0)}%
                  </div>
                </div>

                {/* Break-even */}
                <div className="p-4 rounded-xl bg-white border border-profit-light/30">
                  <div className="flex items-center gap-2 text-navy-500 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    נקודת איזון
                  </div>
                  <div className="text-2xl font-bold text-profit-dark">
                    {optimisticBreakeven} חודשים
                  </div>
                </div>
              </div>

              {/* Yearly breakdown */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-navy-700">פירוט רווח שנתי:</div>
                {optimisticScenario.yearlyProfits.map((profit, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-50">
                    <span className="text-navy-600">שנה {index + 1}</span>
                    <span className="font-mono font-bold text-profit-dark">
                      +{profit.toLocaleString()} ₪
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 rounded bg-profit-light/20 font-bold">
                  <span className="text-navy-800">סה״כ רווח</span>
                  <span className="font-mono text-profit-dark text-lg">
                    {optimisticScenario.totalProfit.toLocaleString()} ₪
                  </span>
                </div>
              </div>

              {/* Final Value */}
              <div className="p-4 rounded-xl bg-profit text-white text-center">
                <div className="text-sm opacity-90">ערך השקעה אחרי 3 שנים</div>
                <div className="text-3xl font-black">
                  {optimisticFinalValue.toLocaleString()} ₪
                </div>
                <div className="text-sm opacity-75">
                  (על השקעה של {INITIAL_INVESTMENT.toLocaleString()} ₪)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pessimistic ROI - תרחיש הפסד */}
          <Card variant="elevated" className="border-2 border-red-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-l from-red-100 to-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <TrendingDown className="w-6 h-6" />
                    תרחיש פסימי (הפסד)
                  </CardTitle>
                  <CardDescription className="text-red-600">
                    50% מכירות, +30% עלויות גלם, +25% עבודה
                  </CardDescription>
                </div>
                <Badge variant="risk" className="text-lg px-3 py-1 bg-red-600">
                  💀
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Annual ROI - הפסד */}
              <div className="text-center p-4 rounded-xl bg-red-100 border-2 border-red-300">
                <div className="text-sm text-red-700 mb-1">תשואה שנתית ממוצעת (CAGR)</div>
                <div className="text-5xl font-black text-red-600">
                  {realisticCAGR.toFixed(1)}%
                </div>
                <div className="text-xs text-red-500 mt-1 font-bold">⚠️ תשואה שלילית - הפסד!</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Total ROI */}
                <div className="p-4 rounded-xl bg-red-50 border border-red-300">
                  <div className="flex items-center gap-2 text-red-600 text-sm mb-1">
                    <Percent className="w-4 h-4" />
                    תשואה כוללת (3 שנים)
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {realisticTotalROI.toFixed(0)}%
                  </div>
                </div>

                {/* Break-even */}
                <div className="p-4 rounded-xl bg-red-50 border border-red-300">
                  <div className="flex items-center gap-2 text-red-600 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    נקודת איזון
                  </div>
                  <div className="text-xl font-bold text-red-600">
                    {realisticBreakeven < 0 ? '❌ לא מושגת' : `${realisticBreakeven}+ חודשים`}
                  </div>
                </div>
              </div>

              {/* Yearly breakdown */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-red-700">פירוט הפסד שנתי:</div>
                {realisticScenario.yearlyProfits.map((profit, index) => (
                  <div key={index} className={`flex justify-between items-center p-2 rounded ${profit < 0 ? 'bg-red-100' : 'bg-green-50'}`}>
                    <span className="text-navy-600">שנה {index + 1}</span>
                    <span className={`font-mono font-bold ${profit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {profit < 0 ? '' : '+'}{profit.toLocaleString()} ₪
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 rounded bg-red-200 font-bold border border-red-400">
                  <span className="text-red-800">סה״כ הפסד מצטבר</span>
                  <span className="font-mono text-red-700 text-lg">
                    {realisticScenario.totalProfit.toLocaleString()} ₪
                  </span>
                </div>
              </div>

              {/* Final Value - Loss */}
              <div className="p-4 rounded-xl bg-red-600 text-white text-center">
                <div className="text-sm opacity-90">ערך השקעה אחרי 3 שנים</div>
                <div className="text-3xl font-black">
                  {realisticFinalValue.toLocaleString()} ₪
                </div>
                <div className="text-sm opacity-90 mt-1">
                  💸 הפסד של {Math.abs(realisticFinalValue - INITIAL_INVESTMENT).toLocaleString()} ₪
                </div>
                <div className="text-xs opacity-75">
                  (מתוך השקעה של {INITIAL_INVESTMENT.toLocaleString()} ₪)
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 rounded-lg bg-red-900/10 border border-red-400 text-center">
                <p className="text-sm text-red-700 font-medium">
                  ⚠️ בתרחיש זה המשקיע מאבד {((1 - realisticFinalValue/INITIAL_INVESTMENT) * 100).toFixed(0)}% מההשקעה
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card variant="elevated" className="max-w-5xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-navy-600" />
              גרף צמיחת השקעה - 5 שנים
            </CardTitle>
            <CardDescription>
              השוואת ערך ההשקעה בין שני התרחישים (כולל תחזית שנים 4-5)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ec" />
                <XAxis 
                  dataKey="year" 
                  stroke="#627d98"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#627d98"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d9e2ec',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} ₪`, '']}
                />
                <Legend />
                <ReferenceLine 
                  y={INITIAL_INVESTMENT} 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  label={{ value: 'נקודת איזון', position: 'right', fill: '#ef4444', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  name="תרחיש אופטימי"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: '#16a34a' }}
                />
                <Line
                  type="monotone"
                  dataKey="realistic"
                  name="תרחיש פסימי (הפסד)"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ fill: '#dc2626', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: '#b91c1c' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Calculator */}
        <Card variant="elevated" className="max-w-3xl mx-auto">
          <CardHeader className="bg-gradient-to-l from-indigo-100 to-purple-100">
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <PiggyBank className="w-5 h-5" />
              מחשבון השקעה אישי
            </CardTitle>
            <CardDescription className="text-indigo-600">
              הזן סכום השקעה לחישוב התשואה הצפויה
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-navy-700 mb-2">
                סכום השקעה (₪)
              </label>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="text-center mt-2">
                <span className="text-3xl font-black text-indigo-600">
                  {investmentAmount.toLocaleString()} ₪
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Optimistic Result */}
              <div className="p-4 rounded-xl bg-profit-light/10 border border-profit-light">
                <div className="text-sm text-navy-600 mb-1">תרחיש אופטימי - אחרי 3 שנים</div>
                <div className="text-2xl font-black text-profit">
                  {Math.round(customOptimisticReturn).toLocaleString()} ₪
                </div>
                <div className="flex items-center gap-1 text-sm text-profit-dark mt-1">
                  <ArrowRight className="w-4 h-4" />
                  רווח: {Math.round(customOptimisticReturn - investmentAmount).toLocaleString()} ₪
                </div>
              </div>

              {/* Pessimistic Result - Loss */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-300">
                <div className="text-sm text-red-700 mb-1">תרחיש פסימי - אחרי 3 שנים</div>
                <div className="text-2xl font-black text-red-600">
                  {Math.round(customRealisticReturn).toLocaleString()} ₪
                </div>
                <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                  <ArrowRight className="w-4 h-4" />
                  הפסד: {Math.round(customRealisticReturn - investmentAmount).toLocaleString()} ₪
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Note */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <p className="text-sm text-navy-500">
            * חישוב CAGR (Compound Annual Growth Rate) = תשואה שנתית ממוצעת בריבית דריבית.
            הנוסחה: (ערך סופי / ערך התחלתי)^(1/שנים) - 1
          </p>
        </div>
      </div>
    </section>
  )
}

