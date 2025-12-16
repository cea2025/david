'use client'

import React, { useState } from 'react'
import { FileSpreadsheet, Download, ZoomIn, ZoomOut, Table } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

// נתוני התכנית העסקית - עלות ליחידה (54 מ"ר)
const unitCostData = [
  { row: 1, item: 'פרופילי LGS (שלד)', quantity: '54', unit: 'מ"ר', pricePerUnit: '148', total: '8,000', notes: 'פלדה מגולוונת 1.2 מ"מ' },
  { row: 2, item: 'בטון יציקות', quantity: '12', unit: 'מ"ר', pricePerUnit: '45', total: '540', notes: 'רצפה + יסודות', highlight: 'error' },
  { row: 3, item: 'ברזל זיון', quantity: '200', unit: 'ק"ג', pricePerUnit: '10', total: '2,000', notes: 'חיזוק יסודות' },
  { row: 4, item: 'לוחות גבס פנים', quantity: '120', unit: 'מ"ר', pricePerUnit: '35', total: '4,200', notes: 'כולל שלד' },
  { row: 5, item: 'לוחות חוץ (סמנטבורד)', quantity: '80', unit: 'מ"ר', pricePerUnit: '45', total: '3,600', notes: 'עמיד מים' },
  { row: 6, item: 'בידוד תרמי', quantity: '54', unit: 'מ"ר', pricePerUnit: '25', total: '1,350', notes: 'צמר סלעים 10 ס"מ' },
  { row: 7, item: 'איטום ומסתור', quantity: '1', unit: 'יחידה', pricePerUnit: '180', total: '180', notes: 'ממברנות + טייבק', highlight: 'warning' },
  { row: 8, item: 'חלונות אלומיניום', quantity: '6', unit: 'יחידות', pricePerUnit: '800', total: '4,800', notes: 'תרמי דו-כיווני' },
  { row: 9, item: 'דלתות (כניסה + פנים)', quantity: '5', unit: 'יחידות', pricePerUnit: '600', total: '3,000', notes: '' },
  { row: 10, item: 'אינסטלציה', quantity: '1', unit: 'קומפלט', pricePerUnit: '8,000', total: '8,000', notes: 'כולל חומרים' },
  { row: 11, item: 'חשמל', quantity: '1', unit: 'קומפלט', pricePerUnit: '7,000', total: '7,000', notes: 'כולל לוח' },
  { row: 12, item: 'ריצוף וחיפוי', quantity: '54', unit: 'מ"ר', pricePerUnit: '120', total: '6,480', notes: 'פורצלן' },
  { row: 13, item: 'מטבח בסיסי', quantity: '1', unit: 'יחידה', pricePerUnit: '12,000', total: '12,000', notes: 'ארונות + משטח' },
  { row: 14, item: 'סניטריה', quantity: '1', unit: 'קומפלט', pricePerUnit: '5,000', total: '5,000', notes: 'אסלה, כיור, מקלחון' },
  { row: 15, item: 'צבע ושפכטל', quantity: '200', unit: 'מ"ר', pricePerUnit: '15', total: '3,000', notes: 'פנים + חוץ' },
  { row: 16, item: 'הובלה למגרש', quantity: '1', unit: 'משלוח', pricePerUnit: '4,000', total: '4,000', notes: 'משאית + מנוף', highlight: 'warning' },
]

// נתוני תחזית הכנסות
const revenueData = [
  { row: 1, year: 'שנה 1', units: '100', pricePerUnit: '147,000', revenue: '14,700,000', costs: '8,900,000', profit: '5,800,000' },
  { row: 2, year: 'שנה 2', units: '200', pricePerUnit: '147,000', revenue: '29,400,000', costs: '16,200,000', profit: '13,200,000' },
  { row: 3, year: 'שנה 3', units: '300', pricePerUnit: '147,000', revenue: '44,100,000', costs: '21,556,800', profit: '22,543,200' },
]

// נתוני השקעה ראשונית
const investmentData = [
  { row: 1, item: 'מכונת Howick FRAMA 3200', quantity: '1', price: '1,200,000', notes: 'ייצור פרופילים' },
  { row: 2, item: 'מכונת Roll Former', quantity: '1', price: '400,000', notes: 'גימור פרופילים' },
  { row: 3, item: 'ציוד BIM + תוכנה', quantity: '1', price: '150,000', notes: 'Vertex BD' },
  { row: 4, item: 'כלי עבודה ומכשור', quantity: '1', price: '100,000', notes: 'מברגות, חותכים' },
  { row: 5, item: 'הקמת מבנה מפעל', quantity: '500', price: '750,000', notes: 'מ"ר × 1,500 ₪' },
  { row: 6, item: 'הון חוזר', quantity: '1', price: '400,000', notes: '3 חודשים ראשונים' },
]

type SheetType = 'costs' | 'revenue' | 'investment'

export function ExcelView() {
  const [activeSheet, setActiveSheet] = useState<SheetType>('costs')
  const [zoom, setZoom] = useState(100)

  const getColumnLetter = (index: number) => {
    return String.fromCharCode(65 + index)
  }

  const totalUnitCost = unitCostData.reduce((sum, row) => sum + parseInt(row.total.replace(',', '')), 0)
  const totalInvestment = investmentData.reduce((sum, row) => sum + parseInt(row.price.replace(/,/g, '')), 0)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Badge variant="default" className="mb-4">
            <FileSpreadsheet className="w-3 h-3 ml-1" />
            גיליון אקסל - תכנית עסקית
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            הנתונים המלאים מהתכנית
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            צפייה בגיליון האקסל המקורי עם כל החישובים והנתונים
          </p>
        </div>

        {/* Excel Container */}
        <div className="max-w-6xl mx-auto">
          {/* Excel Toolbar */}
          <div className="bg-[#217346] rounded-t-lg px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">פרויקט_דוד_תכנית_עסקית.xlsx</span>
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

          {/* Excel Ribbon */}
          <div className="bg-[#f3f3f3] border-b border-gray-300 px-4 py-1 flex items-center gap-4 text-xs text-gray-600">
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">קובץ</span>
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">בית</span>
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">הוספה</span>
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">פריסת עמוד</span>
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">נוסחאות</span>
            <span className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">נתונים</span>
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
              השקעה ראשונית
            </button>
          </div>

          {/* Excel Grid */}
          <div 
            className="bg-white border border-gray-300 rounded-b-lg overflow-hidden shadow-xl"
            style={{ fontSize: `${zoom}%` }}
          >
            <div className="overflow-x-auto">
              {/* Unit Costs Sheet */}
              {activeSheet === 'costs' && (
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#f8f9fa]">
                      <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs"></th>
                      <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">A</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">B</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">C</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">D</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">E</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">F</th>
                    </tr>
                    {/* Header Row */}
                    <tr className="bg-[#4472C4] text-white">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border border-[#2f5496] p-2 font-bold text-center">#</td>
                      <td className="border border-[#2f5496] p-2 font-bold">פריט</td>
                      <td className="border border-[#2f5496] p-2 font-bold text-center">כמות</td>
                      <td className="border border-[#2f5496] p-2 font-bold text-center">מחיר ליח&apos;</td>
                      <td className="border border-[#2f5496] p-2 font-bold text-center">סה&quot;כ ₪</td>
                      <td className="border border-[#2f5496] p-2 font-bold">הערות</td>
                    </tr>
                  </thead>
                  <tbody>
                    {unitCostData.map((row, index) => (
                      <tr 
                        key={row.row}
                        className={`
                          ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}
                          ${row.highlight === 'error' ? 'bg-red-100' : ''}
                          ${row.highlight === 'warning' ? 'bg-yellow-50' : ''}
                          hover:bg-blue-50 transition-colors
                        `}
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
                        <td className={`border border-gray-200 p-2 text-center font-mono font-bold ${
                          row.highlight === 'error' ? 'text-red-600' : ''
                        }`}>
                          {row.total} ₪
                          {row.highlight === 'error' && (
                            <span className="block text-xs text-red-500">⚠️ שגיאה!</span>
                          )}
                        </td>
                        <td className="border border-gray-200 p-2 text-sm text-gray-600">{row.notes}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-[#4472C4] text-white font-bold">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {unitCostData.length + 2}
                      </td>
                      <td className="border border-[#2f5496] p-2"></td>
                      <td className="border border-[#2f5496] p-2" colSpan={3}>
                        סה&quot;כ עלות יחידה (לפי התכנית)
                      </td>
                      <td className="border border-[#2f5496] p-2 text-center font-mono text-lg">
                        {totalUnitCost.toLocaleString()} ₪
                      </td>
                      <td className="border border-[#2f5496] p-2 text-sm">
                        =SUM(E2:E17)
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Revenue Sheet */}
              {activeSheet === 'revenue' && (
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#f8f9fa]">
                      <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs"></th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">A</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">B</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">C</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">D</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">E</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">F</th>
                    </tr>
                    <tr className="bg-[#70AD47] text-white">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border border-[#507e32] p-2 font-bold">תקופה</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">יחידות</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">מחיר ליח&apos;</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">הכנסות</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">עלויות</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">רווח נקי</td>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map((row, index) => (
                      <tr 
                        key={row.row}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'} hover:bg-green-50 transition-colors`}
                      >
                        <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                          {row.row + 1}
                        </td>
                        <td className="border border-gray-200 p-2 font-semibold">{row.year}</td>
                        <td className="border border-gray-200 p-2 text-center font-mono">{row.units}</td>
                        <td className="border border-gray-200 p-2 text-center font-mono">{row.pricePerUnit} ₪</td>
                        <td className="border border-gray-200 p-2 text-center font-mono font-semibold text-blue-600">
                          {parseInt(row.revenue).toLocaleString()} ₪
                        </td>
                        <td className="border border-gray-200 p-2 text-center font-mono text-red-600">
                          {parseInt(row.costs).toLocaleString()} ₪
                        </td>
                        <td className="border border-gray-200 p-2 text-center font-mono font-bold text-green-600">
                          {parseInt(row.profit).toLocaleString()} ₪
                        </td>
                      </tr>
                    ))}
                    {/* Summary Row */}
                    <tr className="bg-[#70AD47] text-white font-bold">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">5</td>
                      <td className="border border-[#507e32] p-2" colSpan={5}>
                        סה&quot;כ רווח מצטבר (3 שנים)
                      </td>
                      <td className="border border-[#507e32] p-2 text-center font-mono text-lg">
                        41,543,200 ₪
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Investment Sheet */}
              {activeSheet === 'investment' && (
                <table className="w-full border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f8f9fa]">
                      <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs"></th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">A</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">B</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">C</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">D</th>
                    </tr>
                    <tr className="bg-[#ED7D31] text-white">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border border-[#c65911] p-2 font-bold">#</td>
                      <td className="border border-[#c65911] p-2 font-bold">פריט</td>
                      <td className="border border-[#c65911] p-2 font-bold text-center">עלות ₪</td>
                      <td className="border border-[#c65911] p-2 font-bold">הערות</td>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentData.map((row, index) => (
                      <tr 
                        key={row.row}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'} hover:bg-orange-50 transition-colors`}
                      >
                        <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                          {row.row + 1}
                        </td>
                        <td className="border border-gray-200 p-2 text-center text-gray-600">{row.row}</td>
                        <td className="border border-gray-200 p-2 font-medium">{row.item}</td>
                        <td className="border border-gray-200 p-2 text-center font-mono font-semibold">
                          {parseInt(row.price.replace(/,/g, '')).toLocaleString()} ₪
                        </td>
                        <td className="border border-gray-200 p-2 text-sm text-gray-600">{row.notes}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-[#ED7D31] text-white font-bold">
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {investmentData.length + 2}
                      </td>
                      <td className="border border-[#c65911] p-2"></td>
                      <td className="border border-[#c65911] p-2">
                        סה&quot;כ השקעה נדרשת
                      </td>
                      <td className="border border-[#c65911] p-2 text-center font-mono text-lg">
                        {totalInvestment.toLocaleString()} ₪
                      </td>
                      <td className="border border-[#c65911] p-2 text-sm">
                        =SUM(C2:C7)
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Excel Status Bar */}
          <div className="bg-[#217346] px-4 py-1 flex items-center justify-between text-white text-xs rounded-b-lg mt-[-1px]">
            <div className="flex items-center gap-4">
              <span>מוכן</span>
            </div>
            <div className="flex items-center gap-4">
              <span>ממוצע: {activeSheet === 'costs' ? '4,134 ₪' : activeSheet === 'revenue' ? '13,847,733 ₪' : '500,000 ₪'}</span>
              <span>סכום: {activeSheet === 'costs' ? `${totalUnitCost.toLocaleString()} ₪` : activeSheet === 'revenue' ? '41,543,200 ₪' : `${totalInvestment.toLocaleString()} ₪`}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-navy-600">שורה עם שגיאת חישוב</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-300 rounded"></div>
              <span className="text-navy-600">נתון שדורש בדיקה</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

