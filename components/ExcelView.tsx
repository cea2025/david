'use client'

import React, { useState, useEffect } from 'react'
import { FileSpreadsheet, Download, ZoomIn, ZoomOut, AlertTriangle, CheckCircle2, TrendingUp, Minus, TrendingDown } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

// ==================== סוג תרחיש ====================
type ScenarioType = 'optimistic' | 'realistic' | 'pessimistic'

// ==================== נתונים אופטימיים (נתוני המייסדים) ====================
const optimisticData = {
  name: 'אופטימי',
  emoji: '📈',
  description: 'נתוני המייסדים',
  color: 'green',
  unitCost: [
    { row: 1, item: 'פרופילי LGS (שלד)', quantity: '54', unit: 'מ"ר', pricePerUnit: '148', total: '8,000', notes: 'פלדה מגולוונת 1.2 מ"מ' },
    { row: 2, item: 'בטון יציקות', quantity: '12', unit: 'מ"ר', pricePerUnit: '45', total: '540', notes: 'רצפה + יסודות' },
    { row: 3, item: 'ברזל זיון', quantity: '200', unit: 'ק"ג', pricePerUnit: '10', total: '2,000', notes: 'חיזוק יסודות' },
    { row: 4, item: 'לוחות גבס פנים', quantity: '120', unit: 'מ"ר', pricePerUnit: '35', total: '4,200', notes: 'כולל שלד' },
    { row: 5, item: 'לוחות חוץ (סמנטבורד)', quantity: '80', unit: 'מ"ר', pricePerUnit: '45', total: '3,600', notes: 'עמיד מים' },
    { row: 6, item: 'בידוד תרמי', quantity: '54', unit: 'מ"ר', pricePerUnit: '25', total: '1,350', notes: 'צמר סלעים 10 ס"מ' },
    { row: 7, item: 'איטום ומסתור', quantity: '1', unit: 'יחידה', pricePerUnit: '180', total: '180', notes: 'ממברנות + טייבק' },
    { row: 8, item: 'חלונות אלומיניום', quantity: '6', unit: 'יחידות', pricePerUnit: '800', total: '4,800', notes: 'תרמי דו-כיווני' },
    { row: 9, item: 'דלתות (כניסה + פנים)', quantity: '5', unit: 'יחידות', pricePerUnit: '600', total: '3,000', notes: '' },
    { row: 10, item: 'אינסטלציה', quantity: '1', unit: 'קומפלט', pricePerUnit: '8,000', total: '8,000', notes: 'כולל חומרים' },
    { row: 11, item: 'חשמל', quantity: '1', unit: 'קומפלט', pricePerUnit: '7,000', total: '7,000', notes: 'כולל לוח' },
    { row: 12, item: 'ריצוף וחיפוי', quantity: '54', unit: 'מ"ר', pricePerUnit: '120', total: '6,480', notes: 'פורצלן' },
    { row: 13, item: 'מטבח בסיסי', quantity: '1', unit: 'יחידה', pricePerUnit: '12,000', total: '12,000', notes: 'ארונות + משטח' },
    { row: 14, item: 'סניטריה', quantity: '1', unit: 'קומפלט', pricePerUnit: '5,000', total: '5,000', notes: 'אסלה, כיור, מקלחון' },
    { row: 15, item: 'צבע ושפכטל', quantity: '200', unit: 'מ"ר', pricePerUnit: '15', total: '3,000', notes: 'פנים + חוץ' },
    { row: 16, item: 'הובלה למגרש', quantity: '1', unit: 'משלוח', pricePerUnit: '4,000', total: '4,000', notes: 'משאית + מנוף' },
  ],
  revenue: [
    { row: 1, year: 'שנה 1', sqm: '11,550', pricePerSqm: '1,400', revenue: '16,170,000', costs: '11,818,200', profit: '4,351,800', margin: '27%' },
    { row: 2, year: 'שנה 2', sqm: '23,100', pricePerSqm: '1,400', revenue: '32,340,000', costs: '17,704,500', profit: '14,635,500', margin: '45%' },
    { row: 3, year: 'שנה 3', sqm: '31,500', pricePerSqm: '1,400', revenue: '44,100,000', costs: '21,556,800', profit: '22,543,200', margin: '51%' },
  ],
  investment: [
    { row: 1, item: 'שכירות (13 חודשים)', price: '910,000', notes: '70,000₪ × 13' },
    { row: 2, item: 'הכשרת שטח', price: '160,000', notes: 'מערכות חשמל/אוויר/מידוף' },
    { row: 3, item: 'ציוד אנלוגי', price: '540,000', notes: 'מערכות ייצור/חיתוך/כיפוף' },
    { row: 4, item: 'מיכשור מתקדם', price: '950,000', notes: 'חריטה/מערכת הרמה/כרסום' },
    { row: 5, item: 'הקמת משרדים', price: '250,000', notes: 'כולל תקשורת ואביזור' },
    { row: 6, item: 'בניית קונספט', price: '200,000', notes: 'פיתוח ומידול שיטות ייצור' },
    { row: 7, item: 'ליווי ויועצים', price: '80,000', notes: 'להקמת מפעל הייצור' },
    { row: 8, item: 'הקמת מערכי שיווק', price: '50,000', notes: 'מיתוג/משפכי שיווק/דיגיטציה' },
    { row: 9, item: 'פרסום ושיווק', price: '210,000', notes: 'יח"צ/דיגיטל/שיתופי פעולה' },
    { row: 10, item: 'בלתי צפויים', price: '200,000', notes: 'רזרבה' },
    { row: 11, item: 'ניהול פרויקט הקמה', price: '480,000', notes: '80,000₪ × 6 חודשים' },
  ],
  totalProfit: 41530500,
}

// ==================== נתונים ריאליסטיים (אמצעי) ====================
const realisticData = {
  name: 'ריאליסטי',
  emoji: '🔍',
  description: '20% עיכוב, +15% עלויות',
  color: 'amber',
  unitCost: [
    { row: 1, item: 'פרופילי LGS (שלד)', quantity: '54', unit: 'מ"ר', pricePerUnit: '170', total: '9,200', notes: '⚠️ +15% מחירי שוק' },
    { row: 2, item: 'בטון יציקות', quantity: '12', unit: 'מ"ר', pricePerUnit: '52', total: '620', notes: '' },
    { row: 3, item: 'ברזל זיון', quantity: '200', unit: 'ק"ג', pricePerUnit: '11.5', total: '2,300', notes: '' },
    { row: 4, item: 'לוחות גבס פנים', quantity: '120', unit: 'מ"ר', pricePerUnit: '40', total: '4,830', notes: '' },
    { row: 5, item: 'לוחות חוץ (סמנטבורד)', quantity: '80', unit: 'מ"ר', pricePerUnit: '52', total: '4,140', notes: '' },
    { row: 6, item: 'בידוד תרמי', quantity: '54', unit: 'מ"ר', pricePerUnit: '29', total: '1,550', notes: '' },
    { row: 7, item: 'איטום ומסתור', quantity: '1', unit: 'יחידה', pricePerUnit: '207', total: '207', notes: '' },
    { row: 8, item: 'חלונות אלומיניום', quantity: '6', unit: 'יחידות', pricePerUnit: '920', total: '5,520', notes: '⚠️ מחירי אלומיניום' },
    { row: 9, item: 'דלתות (כניסה + פנים)', quantity: '5', unit: 'יחידות', pricePerUnit: '690', total: '3,450', notes: '' },
    { row: 10, item: 'אינסטלציה', quantity: '1', unit: 'קומפלט', pricePerUnit: '9,200', total: '9,200', notes: '' },
    { row: 11, item: 'חשמל', quantity: '1', unit: 'קומפלט', pricePerUnit: '8,050', total: '8,050', notes: '' },
    { row: 12, item: 'ריצוף וחיפוי', quantity: '54', unit: 'מ"ר', pricePerUnit: '138', total: '7,450', notes: '' },
    { row: 13, item: 'מטבח בסיסי', quantity: '1', unit: 'יחידה', pricePerUnit: '13,800', total: '13,800', notes: '' },
    { row: 14, item: 'סניטריה', quantity: '1', unit: 'קומפלט', pricePerUnit: '5,750', total: '5,750', notes: '' },
    { row: 15, item: 'צבע ושפכטל', quantity: '200', unit: 'מ"ר', pricePerUnit: '17', total: '3,450', notes: '' },
    { row: 16, item: 'הובלה למגרש', quantity: '1', unit: 'משלוח', pricePerUnit: '4,600', total: '4,600', notes: '' },
  ],
  revenue: [
    { row: 1, year: 'שנה 1', sqm: '9,240', pricePerSqm: '1,400', revenue: '12,936,000', costs: '15,436,000', profit: '-2,500,000', margin: '-19%', note: '⚠️ הפסד שנה ראשונה' },
    { row: 2, year: 'שנה 2', sqm: '18,480', pricePerSqm: '1,400', revenue: '25,872,000', costs: '22,672,000', profit: '3,200,000', margin: '12%', note: '' },
    { row: 3, year: 'שנה 3', sqm: '25,200', pricePerSqm: '1,400', revenue: '35,280,000', costs: '26,780,000', profit: '8,500,000', margin: '24%', note: '' },
  ],
  investment: [
    { row: 1, item: 'שכירות (13 חודשים)', price: '910,000', notes: '' },
    { row: 2, item: 'הכשרת שטח', price: '184,000', notes: '⚠️ +15% חריגות' },
    { row: 3, item: 'ציוד אנלוגי', price: '621,000', notes: '⚠️ +15%' },
    { row: 4, item: 'מיכשור מתקדם', price: '1,092,500', notes: '⚠️ +15%' },
    { row: 5, item: 'הקמת משרדים', price: '287,500', notes: '⚠️ +15%' },
    { row: 6, item: 'בניית קונספט', price: '230,000', notes: '⚠️ +15%' },
    { row: 7, item: 'ליווי ויועצים', price: '100,000', notes: '⚠️ +25%' },
    { row: 8, item: 'הקמת מערכי שיווק', price: '57,500', notes: '' },
    { row: 9, item: 'פרסום ושיווק', price: '241,500', notes: '' },
    { row: 10, item: 'בלתי צפויים', price: '300,000', notes: '⚠️ +50% רזרבה גדולה' },
    { row: 11, item: 'ניהול פרויקט הקמה', price: '552,000', notes: '⚠️ +15%' },
  ],
  totalProfit: 9200000,
}

// ==================== נתונים פסימיים מאוד ====================
const pessimisticData = {
  name: 'פסימי מאוד',
  emoji: '💀',
  description: '50% מכירות, +30% עלויות',
  color: 'red',
  unitCost: [
    { row: 1, item: 'פרופילי LGS (שלד)', quantity: '54', unit: 'מ"ר', pricePerUnit: '192', total: '10,400', notes: '❌ +30% משבר פלדה' },
    { row: 2, item: 'בטון יציקות', quantity: '12', unit: 'מ"ר', pricePerUnit: '58', total: '700', notes: '' },
    { row: 3, item: 'ברזל זיון', quantity: '200', unit: 'ק"ג', pricePerUnit: '13', total: '2,600', notes: '❌ +30%' },
    { row: 4, item: 'לוחות גבס פנים', quantity: '120', unit: 'מ"ר', pricePerUnit: '46', total: '5,460', notes: '' },
    { row: 5, item: 'לוחות חוץ (סמנטבורד)', quantity: '80', unit: 'מ"ר', pricePerUnit: '58', total: '4,680', notes: '' },
    { row: 6, item: 'בידוד תרמי', quantity: '54', unit: 'מ"ר', pricePerUnit: '32', total: '1,755', notes: '' },
    { row: 7, item: 'איטום ומסתור', quantity: '1', unit: 'יחידה', pricePerUnit: '234', total: '234', notes: '' },
    { row: 8, item: 'חלונות אלומיניום', quantity: '6', unit: 'יחידות', pricePerUnit: '1,040', total: '6,240', notes: '❌ +30%' },
    { row: 9, item: 'דלתות (כניסה + פנים)', quantity: '5', unit: 'יחידות', pricePerUnit: '780', total: '3,900', notes: '' },
    { row: 10, item: 'אינסטלציה', quantity: '1', unit: 'קומפלט', pricePerUnit: '10,400', total: '10,400', notes: '' },
    { row: 11, item: 'חשמל', quantity: '1', unit: 'קומפלט', pricePerUnit: '9,100', total: '9,100', notes: '' },
    { row: 12, item: 'ריצוף וחיפוי', quantity: '54', unit: 'מ"ר', pricePerUnit: '156', total: '8,424', notes: '' },
    { row: 13, item: 'מטבח בסיסי', quantity: '1', unit: 'יחידה', pricePerUnit: '15,600', total: '15,600', notes: '' },
    { row: 14, item: 'סניטריה', quantity: '1', unit: 'קומפלט', pricePerUnit: '6,500', total: '6,500', notes: '' },
    { row: 15, item: 'צבע ושפכטל', quantity: '200', unit: 'מ"ר', pricePerUnit: '20', total: '3,900', notes: '' },
    { row: 16, item: 'הובלה למגרש', quantity: '1', unit: 'משלוח', pricePerUnit: '5,200', total: '5,200', notes: '❌ +30% דלק' },
  ],
  revenue: [
    { row: 1, year: 'שנה 1', sqm: '5,775', pricePerSqm: '1,400', revenue: '8,085,000', costs: '12,285,000', profit: '-4,200,000', margin: '-52%', note: '❌ הפסד כבד' },
    { row: 2, year: 'שנה 2', sqm: '11,550', pricePerSqm: '1,400', revenue: '16,170,000', costs: '17,970,000', profit: '-1,800,000', margin: '-11%', note: '❌ הפסד נמשך' },
    { row: 3, year: 'שנה 3', sqm: '15,750', pricePerSqm: '1,400', revenue: '22,050,000', costs: '20,550,000', profit: '1,500,000', margin: '7%', note: '⚠️ רווח מינימלי' },
  ],
  investment: [
    { row: 1, item: 'שכירות (13 חודשים)', price: '910,000', notes: '' },
    { row: 2, item: 'הכשרת שטח', price: '208,000', notes: '❌ +30%' },
    { row: 3, item: 'ציוד אנלוגי', price: '702,000', notes: '❌ +30% יבוא יקר' },
    { row: 4, item: 'מיכשור מתקדם', price: '1,235,000', notes: '❌ +30%' },
    { row: 5, item: 'הקמת משרדים', price: '325,000', notes: '❌ +30%' },
    { row: 6, item: 'בניית קונספט', price: '260,000', notes: '❌ +30%' },
    { row: 7, item: 'ליווי ויועצים', price: '160,000', notes: '❌ +100% בעיות' },
    { row: 8, item: 'הקמת מערכי שיווק', price: '65,000', notes: '' },
    { row: 9, item: 'פרסום ושיווק', price: '350,000', notes: '❌ +67% תחרות' },
    { row: 10, item: 'בלתי צפויים', price: '500,000', notes: '❌ ×2.5 רזרבה' },
    { row: 11, item: 'ניהול פרויקט הקמה', price: '720,000', notes: '❌ +50% עיכובים' },
  ],
  totalProfit: -4500000,
}

const allData = {
  optimistic: optimisticData,
  realistic: realisticData,
  pessimistic: pessimisticData,
}

type SheetType = 'costs' | 'revenue' | 'investment'

export function ExcelView() {
  const [activeSheet, setActiveSheet] = useState<SheetType>('costs')
  const [zoom, setZoom] = useState(100)
  const [mounted, setMounted] = useState(false)
  const [scenario, setScenario] = useState<ScenarioType>('optimistic')

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = allData[scenario]
  const totalUnitCost = data.unitCost.reduce((sum, row) => sum + parseInt(row.total.replace(',', '')), 0)
  const totalInvestment = data.investment.reduce((sum, row) => sum + parseInt(row.price.replace(/,/g, '')), 0)
  const totalProfit = data.revenue.reduce((sum, row) => sum + parseInt(row.profit.replace(/,/g, '')), 0)

  const getScenarioColors = () => {
    switch (scenario) {
      case 'optimistic':
        return { bg: 'bg-green-600', headerBg: 'from-green-50 via-white to-emerald-50', text: 'text-green-700', border: 'border-green-400' }
      case 'realistic':
        return { bg: 'bg-amber-500', headerBg: 'from-amber-50 via-white to-orange-50', text: 'text-amber-700', border: 'border-amber-400' }
      case 'pessimistic':
        return { bg: 'bg-red-600', headerBg: 'from-red-50 via-white to-rose-50', text: 'text-red-700', border: 'border-red-500' }
    }
  }
  
  const colors = getScenarioColors()

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
              <div className="h-64 bg-gray-200 rounded max-w-4xl mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 transition-all duration-500 bg-gradient-to-br ${colors.headerBg}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Badge variant="default" className={`mb-4 ${colors.text}`}>
            <FileSpreadsheet className="w-3 h-3 ml-1" />
            גיליון אקסל - {data.name}
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            {data.emoji} תרחיש {data.name}
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-8">
            {data.description}
          </p>

          {/* Scenario Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setScenario('optimistic')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                scenario === 'optimistic'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-green-700 border-2 border-green-300 hover:bg-green-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              📈 אופטימי
            </button>
            <button
              onClick={() => setScenario('realistic')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                scenario === 'realistic'
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50'
              }`}
            >
              <Minus className="w-5 h-5" />
              🔍 ריאליסטי
            </button>
            <button
              onClick={() => setScenario('pessimistic')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                scenario === 'pessimistic'
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-white text-red-700 border-2 border-red-300 hover:bg-red-50'
              }`}
            >
              <TrendingDown className="w-5 h-5" />
              💀 פסימי
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={`px-4 py-2 rounded-xl ${totalProfit >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <span className="font-bold">רווח כולל (3 שנים):</span> {totalProfit.toLocaleString()} ₪
            </div>
            <div className={`px-4 py-2 rounded-xl ${scenario === 'pessimistic' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
              <span className="font-bold">השקעה נדרשת:</span> {totalInvestment.toLocaleString()} ₪
            </div>
            <div className={`px-4 py-2 rounded-xl ${scenario === 'pessimistic' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
              <span className="font-bold">עלות גלם/יחידה:</span> {totalUnitCost.toLocaleString()} ₪
            </div>
          </div>
        </div>

        {/* Excel Container */}
        <div className="max-w-6xl mx-auto">
          {/* Excel Toolbar */}
          <div className={`rounded-t-lg px-4 py-2 flex items-center justify-between ${colors.bg}`}>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                פרויקט_דוד_{data.name}.xlsx
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-white text-sm">{zoom}%</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setZoom(Math.min(150, zoom + 10))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sheet Tabs */}
          <div className="bg-[#f3f3f3] border-b border-gray-300 px-2 py-1 flex items-center gap-1">
            <button
              onClick={() => setActiveSheet('costs')}
              className={`px-4 py-1.5 text-sm rounded-t border border-b-0 transition-colors ${
                activeSheet === 'costs'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              עלות ליחידה
            </button>
            <button
              onClick={() => setActiveSheet('revenue')}
              className={`px-4 py-1.5 text-sm rounded-t border border-b-0 transition-colors ${
                activeSheet === 'revenue'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              תחזית הכנסות
            </button>
            <button
              onClick={() => setActiveSheet('investment')}
              className={`px-4 py-1.5 text-sm rounded-t border border-b-0 transition-colors ${
                activeSheet === 'investment'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              השקעת הקמה
            </button>
          </div>

          {/* Excel Grid */}
          <div 
            className="bg-white border border-gray-300 overflow-hidden shadow-xl"
            style={{ fontSize: `${zoom}%` }}
          >
            <div className="overflow-x-auto">
              {/* Unit Costs Sheet */}
              {activeSheet === 'costs' && (
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr className={`${colors.bg} text-white`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border p-2 font-bold text-center">#</td>
                      <td className="border p-2 font-bold">פריט</td>
                      <td className="border p-2 font-bold text-center">כמות</td>
                      <td className="border p-2 font-bold text-center">מחיר ליח&apos;</td>
                      <td className="border p-2 font-bold text-center">סה&quot;כ ₪</td>
                      <td className="border p-2 font-bold">הערות</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.unitCost.map((row, index) => (
                      <tr 
                        key={row.row}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                      >
                        <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                          {row.row + 1}
                        </td>
                        <td className="border border-gray-200 p-2 text-center text-gray-600">{row.row}</td>
                        <td className="border border-gray-200 p-2 font-medium">{row.item}</td>
                        <td className="border border-gray-200 p-2 text-center font-mono">
                          {row.quantity} {row.unit}
                        </td>
                        <td className="border border-gray-200 p-2 text-center font-mono">{row.pricePerUnit} ₪</td>
                        <td className={`border border-gray-200 p-2 text-center font-mono font-bold ${colors.text}`}>
                          {row.total} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-sm ${
                          row.notes.includes('❌') ? 'text-red-600 font-medium' :
                          row.notes.includes('⚠️') ? 'text-amber-600 font-medium' : 'text-gray-600'
                        }`}>{row.notes}</td>
                      </tr>
                    ))}
                    <tr className={`${colors.bg} text-white font-bold`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {data.unitCost.length + 2}
                      </td>
                      <td className="border p-2"></td>
                      <td className="border p-2" colSpan={3}>
                        סה&quot;כ עלות יחידה (54 מ&quot;ר)
                      </td>
                      <td className="border p-2 text-center font-mono text-lg">
                        {totalUnitCost.toLocaleString()} ₪
                      </td>
                      <td className="border p-2 text-sm">
                        ≈{Math.round(totalUnitCost/54)} ₪/מ&quot;ר
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Revenue Sheet */}
              {activeSheet === 'revenue' && (
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className={`${colors.bg} text-white`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border p-2 font-bold">תקופה</td>
                      <td className="border p-2 font-bold text-center">מ&quot;ר שנתי</td>
                      <td className="border p-2 font-bold text-center">מחיר למ&quot;ר</td>
                      <td className="border p-2 font-bold text-center">הכנסות</td>
                      <td className="border p-2 font-bold text-center">עלויות</td>
                      <td className="border p-2 font-bold text-center">רווח/הפסד</td>
                      <td className="border p-2 font-bold text-center">רווחיות</td>
                      {'note' in data.revenue[0] && <td className="border p-2 font-bold text-center">הערה</td>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.revenue.map((row, index) => {
                      const profit = parseInt(row.profit.replace(/,/g, ''))
                      const isLoss = profit < 0
                      return (
                        <tr 
                          key={row.row}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                        >
                          <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                            {row.row + 1}
                          </td>
                          <td className="border border-gray-200 p-2 font-semibold">{row.year}</td>
                          <td className="border border-gray-200 p-2 text-center font-mono">{row.sqm}</td>
                          <td className="border border-gray-200 p-2 text-center font-mono">{row.pricePerSqm} ₪</td>
                          <td className="border border-gray-200 p-2 text-center font-mono font-semibold text-blue-600">
                            {parseInt(row.revenue).toLocaleString()} ₪
                          </td>
                          <td className="border border-gray-200 p-2 text-center font-mono text-orange-600">
                            {parseInt(row.costs).toLocaleString()} ₪
                          </td>
                          <td className={`border border-gray-200 p-2 text-center font-mono font-bold ${isLoss ? 'text-red-600 bg-red-50' : 'text-green-600'}`}>
                            {profit.toLocaleString()} ₪
                          </td>
                          <td className={`border border-gray-200 p-2 text-center font-bold ${
                            parseInt(row.margin) < 0 ? 'text-red-600' : 
                            parseInt(row.margin) < 20 ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {row.margin}
                          </td>
                          {'note' in row && row.note && (
                            <td className={`border border-gray-200 p-2 text-sm font-medium ${
                              row.note.includes('❌') ? 'text-red-600' : 'text-amber-600'
                            }`}>
                              {row.note}
                            </td>
                          )}
                        </tr>
                      )
                    })}
                    <tr className={`${colors.bg} text-white font-bold`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">5</td>
                      <td className="border p-2" colSpan={5}>
                        סה&quot;כ (3 שנים)
                      </td>
                      <td className={`border p-2 text-center font-mono text-lg ${totalProfit < 0 ? 'bg-red-700' : ''}`}>
                        {totalProfit.toLocaleString()} ₪
                      </td>
                      <td className="border p-2"></td>
                      {'note' in data.revenue[0] && <td className="border p-2"></td>}
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Investment Sheet */}
              {activeSheet === 'investment' && (
                <table className="w-full border-collapse min-w-[600px]">
                  <thead>
                    <tr className={`${colors.bg} text-white`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border p-2 font-bold">#</td>
                      <td className="border p-2 font-bold">פריט</td>
                      <td className="border p-2 font-bold text-center">עלות ₪</td>
                      <td className="border p-2 font-bold">הערות</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.investment.map((row, index) => (
                      <tr 
                        key={row.row}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                      >
                        <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                          {row.row + 1}
                        </td>
                        <td className="border border-gray-200 p-2 text-center text-gray-600">{row.row}</td>
                        <td className="border border-gray-200 p-2 font-medium">{row.item}</td>
                        <td className={`border border-gray-200 p-2 text-center font-mono font-semibold ${colors.text}`}>
                          {parseInt(row.price.replace(/,/g, '')).toLocaleString()} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-sm ${
                          row.notes.includes('❌') ? 'text-red-600 font-medium' :
                          row.notes.includes('⚠️') ? 'text-amber-600 font-medium' : 'text-gray-600'
                        }`}>{row.notes}</td>
                      </tr>
                    ))}
                    <tr className={`${colors.bg} text-white font-bold`}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {data.investment.length + 2}
                      </td>
                      <td className="border p-2"></td>
                      <td className="border p-2">
                        סה&quot;כ השקעת הקמה
                      </td>
                      <td className="border p-2 text-center font-mono text-lg">
                        {totalInvestment.toLocaleString()} ₪
                      </td>
                      <td className="border p-2"></td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Excel Status Bar */}
          <div className={`px-4 py-1 flex items-center justify-between text-white text-xs rounded-b-lg ${colors.bg}`}>
            <div className="flex items-center gap-4">
              <span>מוכן</span>
              <span className="flex items-center gap-1">
                {data.emoji} {data.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>רווח כולל: {totalProfit.toLocaleString()} ₪</span>
              <span>השקעה: {totalInvestment.toLocaleString()} ₪</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 max-w-4xl mx-auto">
            {scenario === 'pessimistic' ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-800 mb-2">הנחות התרחיש הפסימי:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• <strong>מכירות:</strong> 50% מהתכנית בלבד</li>
                      <li>• <strong>עלויות גלם:</strong> +30% (משבר פלדה/יבוא)</li>
                      <li>• <strong>עלויות עבודה:</strong> +25%</li>
                      <li>• <strong>השקעה:</strong> חריגות משמעותיות בכל הסעיפים</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : scenario === 'realistic' ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">הנחות התרחיש הריאליסטי:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• <strong>מכירות:</strong> 80% מהתכנית (עיכוב 20%)</li>
                      <li>• <strong>עלויות גלם:</strong> +15% מהתכנית</li>
                      <li>• <strong>ללא הוזלת עלויות</strong> בשנים ב&apos;-ג&apos;</li>
                      <li>• <strong>הפסד בשנה ראשונה</strong> עקב עלויות הקמה</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-800 mb-2">הנחות נתוני המייסדים:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>מחיר מכירה:</strong> 1,400₪ למ&quot;ר</li>
                      <li>• <strong>עלות גלם:</strong> ~340₪ למ&quot;ר</li>
                      <li>• <strong>הוזלת עלויות:</strong> 20% בשנים ב&apos;-ג&apos;</li>
                      <li>• <strong>קצב ייצור:</strong> 55 → 110 → 150 יח&apos;/שנה</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
