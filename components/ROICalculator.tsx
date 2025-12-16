'use client'

import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calculator,
  PiggyBank,
  Target,
  Clock,
  Percent,
  ArrowRight,
  AlertTriangle,
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
  emoji: '📈',
  color: '#22c55e',
  bgColor: 'bg-green-50',
  borderColor: 'border-green-400',
  headerBg: 'from-green-100 to-green-200',
  description: 'לפי התכנית העסקית',
  yearlyProfits: [4351800, 14635500, 22543200],
  totalProfit: 41530500,
}

// תרחיש ריאליסטי (אמצעי) - עיכובים ועלויות גבוהות יותר
const realisticScenario = {
  name: 'ריאליסטי',
  emoji: '🔍',
  color: '#f59e0b',
  bgColor: 'bg-amber-50',
  borderColor: 'border-amber-400',
  headerBg: 'from-amber-100 to-amber-200',
  description: '20% עיכוב, +15% עלויות',
  yearlyProfits: [-2500000, 3200000, 8500000],
  totalProfit: 9200000,
}

// תרחיש פסימי מאוד (קטסטרופה)
const pessimisticScenario = {
  name: 'פסימי מאוד',
  emoji: '💀',
  color: '#dc2626',
  bgColor: 'bg-red-50',
  borderColor: 'border-red-500',
  headerBg: 'from-red-100 to-red-200',
  description: '50% מכירות, +30% עלויות',
  yearlyProfits: [-4200000, -1800000, 1500000],
  totalProfit: -4500000,
}

const scenarios = [optimisticScenario, realisticScenario, pessimisticScenario]

// חישוב תשואה שנתית ממוצעת (CAGR)
function calculateCAGR(initialValue: number, finalValue: number, years: number): number {
  if (finalValue <= 0) return -100
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
}

// חישוב נקודת איזון בחודשים
function calculateBreakeven(scenario: typeof optimisticScenario): number | null {
  let cumulative = 0
  for (let year = 0; year < scenario.yearlyProfits.length; year++) {
    const monthlyProfit = scenario.yearlyProfits[year] / 12
    for (let month = 0; month < 12; month++) {
      cumulative += monthlyProfit
      if (cumulative >= INITIAL_INVESTMENT) {
        return year * 12 + month + 1
      }
    }
  }
  return null // לא מושגת
}

// יצירת נתונים לגרף
function generateChartData() {
  const data = []
  
  let optCumulative = INITIAL_INVESTMENT
  let realCumulative = INITIAL_INVESTMENT
  let pessCumulative = INITIAL_INVESTMENT
  
  data.push({
    year: 'השקעה',
    optimistic: INITIAL_INVESTMENT,
    realistic: INITIAL_INVESTMENT,
    pessimistic: INITIAL_INVESTMENT,
    breakeven: INITIAL_INVESTMENT,
  })
  
  for (let i = 0; i < 3; i++) {
    optCumulative += optimisticScenario.yearlyProfits[i]
    realCumulative += realisticScenario.yearlyProfits[i]
    pessCumulative += pessimisticScenario.yearlyProfits[i]
    
    data.push({
      year: `שנה ${i + 1}`,
      optimistic: optCumulative,
      realistic: realCumulative,
      pessimistic: pessCumulative,
      breakeven: INITIAL_INVESTMENT,
    })
  }
  
  // שנים 4-5 עם הנחת המשך
  const rates = [1.15, 1.10, 1.05]
  let optLastProfit = optimisticScenario.yearlyProfits[2]
  let realLastProfit = realisticScenario.yearlyProfits[2]
  let pessLastProfit = Math.max(pessimisticScenario.yearlyProfits[2], 500000)
  
  for (let i = 4; i <= 5; i++) {
    optLastProfit *= rates[0]
    realLastProfit *= rates[1]
    pessLastProfit *= rates[2]
    optCumulative += optLastProfit
    realCumulative += realLastProfit
    pessCumulative += pessLastProfit
    
    data.push({
      year: `שנה ${i}`,
      optimistic: Math.round(optCumulative),
      realistic: Math.round(realCumulative),
      pessimistic: Math.round(pessCumulative),
      breakeven: INITIAL_INVESTMENT,
    })
  }
  
  return data
}

export function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(INITIAL_INVESTMENT)
  const [mounted, setMounted] = useState(false)
  const chartData = generateChartData()

  useEffect(() => {
    setMounted(true)
  }, [])

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
            השוואת תשואה בשלושה תרחישים: אופטימי, ריאליסטי ופסימי
          </p>
        </div>

        {/* Three ROI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {scenarios.map((scenario) => {
            const finalValue = INITIAL_INVESTMENT + scenario.totalProfit
            const cagr = calculateCAGR(INITIAL_INVESTMENT, finalValue, 3)
            const totalROI = ((finalValue - INITIAL_INVESTMENT) / INITIAL_INVESTMENT) * 100
            const breakeven = calculateBreakeven(scenario)
            const isLoss = scenario.totalProfit < 0
            
            return (
              <Card 
                key={scenario.name} 
                variant="elevated" 
                className={`border-2 ${scenario.borderColor} overflow-hidden`}
              >
                <CardHeader className={`bg-gradient-to-l ${scenario.headerBg}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2" style={{ color: scenario.color }}>
                        {scenario.name === 'אופטימי' ? <TrendingUp className="w-5 h-5" /> : 
                         scenario.name === 'ריאליסטי' ? <Minus className="w-5 h-5" /> : 
                         <TrendingDown className="w-5 h-5" />}
                        תרחיש {scenario.name}
                      </CardTitle>
                      <CardDescription style={{ color: scenario.color }}>
                        {scenario.description}
                      </CardDescription>
                    </div>
                    <span className="text-2xl">{scenario.emoji}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* CAGR */}
                  <div className={`text-center p-3 rounded-xl ${scenario.bgColor}`}>
                    <div className="text-xs text-navy-600 mb-1">תשואה שנתית (CAGR)</div>
                    <div className="text-3xl font-black" style={{ color: scenario.color }}>
                      {cagr > -100 ? `${cagr.toFixed(1)}%` : 'N/A'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Total ROI */}
                    <div className={`p-2 rounded-lg ${scenario.bgColor} text-center`}>
                      <div className="text-xs text-navy-500">תשואה כוללת</div>
                      <div className="font-bold" style={{ color: scenario.color }}>
                        {totalROI.toFixed(0)}%
                      </div>
                    </div>

                    {/* Break-even */}
                    <div className={`p-2 rounded-lg ${scenario.bgColor} text-center`}>
                      <div className="text-xs text-navy-500">נקודת איזון</div>
                      <div className="font-bold" style={{ color: scenario.color }}>
                        {breakeven ? `${breakeven} חודשים` : '❌'}
                      </div>
                    </div>
                  </div>

                  {/* Yearly breakdown */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-navy-600">פירוט שנתי:</div>
                    {scenario.yearlyProfits.map((profit, index) => (
                      <div key={index} className="flex justify-between items-center p-1.5 rounded bg-gray-50 text-sm">
                        <span className="text-navy-600">שנה {index + 1}</span>
                        <span className={`font-mono font-bold ${profit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {profit < 0 ? '' : '+'}{(profit / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    ))}
                    <div className={`flex justify-between items-center p-2 rounded font-bold ${
                      isLoss ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <span className="text-navy-800 text-sm">סה״כ</span>
                      <span className={`font-mono ${isLoss ? 'text-red-600' : 'text-green-600'}`}>
                        {isLoss ? '' : '+'}{(scenario.totalProfit / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>

                  {/* Final Value */}
                  <div 
                    className="p-3 rounded-xl text-white text-center"
                    style={{ backgroundColor: scenario.color }}
                  >
                    <div className="text-xs opacity-90">ערך אחרי 3 שנים</div>
                    <div className="text-xl font-black">
                      {(finalValue / 1000000).toFixed(1)}M ₪
                    </div>
                    <div className="text-xs opacity-75">
                      {isLoss ? `הפסד ${Math.abs(totalROI).toFixed(0)}%` : `רווח ${totalROI.toFixed(0)}%`}
                    </div>
                  </div>

                  {/* Warning for pessimistic */}
                  {isLoss && (
                    <div className="p-2 rounded bg-red-100 border border-red-300 text-center">
                      <p className="text-xs text-red-700 flex items-center justify-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        המשקיע מאבד {Math.abs(totalROI).toFixed(0)}% מההשקעה
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Comparison Chart */}
        <Card variant="elevated" className="max-w-5xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-navy-600" />
              גרף צמיחת השקעה - 5 שנים
            </CardTitle>
            <CardDescription>
              השוואת ערך ההשקעה בשלושת התרחישים
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
                  formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M ₪`, '']}
                />
                <Legend />
                <ReferenceLine 
                  y={INITIAL_INVESTMENT} 
                  stroke="#6b7280" 
                  strokeDasharray="5 5" 
                  label={{ value: 'נקודת איזון', position: 'right', fill: '#6b7280', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  name="אופטימי"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="realistic"
                  name="ריאליסטי"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="pessimistic"
                  name="פסימי"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ fill: '#dc2626', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Calculator */}
        <Card variant="elevated" className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-l from-indigo-100 to-purple-100">
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <PiggyBank className="w-5 h-5" />
              מחשבון השקעה אישי
            </CardTitle>
            <CardDescription className="text-indigo-600">
              הזן סכום השקעה לחישוב התשואה הצפויה בכל תרחיש
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((scenario) => {
                const multiplier = investmentAmount / INITIAL_INVESTMENT
                const finalValue = INITIAL_INVESTMENT + scenario.totalProfit
                const customReturn = multiplier * finalValue
                const profit = customReturn - investmentAmount
                const isLoss = profit < 0
                
                return (
                  <div 
                    key={scenario.name}
                    className={`p-4 rounded-xl ${scenario.bgColor} border ${scenario.borderColor}`}
                  >
                    <div className="text-sm mb-1" style={{ color: scenario.color }}>
                      {scenario.emoji} {scenario.name}
                    </div>
                    <div className="text-xl font-black" style={{ color: scenario.color }}>
                      {(customReturn / 1000000).toFixed(2)}M ₪
                    </div>
                    <div className={`flex items-center gap-1 text-sm mt-1 ${isLoss ? 'text-red-600' : 'text-green-600'}`}>
                      <ArrowRight className="w-4 h-4" />
                      {isLoss ? 'הפסד' : 'רווח'}: {(profit / 1000000).toFixed(2)}M ₪
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary Note */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-navy-500">
            * אופטימי: נתוני המייסדים | ריאליסטי: עיכוב 20%, עלויות +15% | פסימי: 50% מכירות, +30% עלויות
          </p>
        </div>
      </div>
    </section>
  )
}
