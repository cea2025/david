'use client'

import React from 'react'
import { AlertTriangle, CheckCircle2, ArrowLeftRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { formatCurrency } from '@/lib/utils'

interface CostItem {
  item: string
  planCost: number
  realCost: number
  note?: string
  severity?: 'critical' | 'high' | 'medium' | 'low'
}

const costBreakdown: CostItem[] = [
  {
    item: 'בטון',
    planCost: 540,
    realCost: 5400,
    note: 'שגיאת חישוב! (12 מ"ר × 450 ₪)',
    severity: 'critical',
  },
  {
    item: 'הובלה ומנוף',
    planCost: 4000,
    realCost: 15000,
    note: 'מחיר שוק למבנה 30 טון',
    severity: 'high',
  },
  {
    item: 'ברזל/פלדה',
    planCost: 2000,
    realCost: 4000,
    note: 'חיזוק לא מספיק בתכנית',
    severity: 'medium',
  },
  {
    item: 'בידוד ואיטום',
    planCost: 180,
    realCost: 2000,
    note: 'עלות מחומרים איכותיים',
    severity: 'medium',
  },
  {
    item: 'פרופילי LGS',
    planCost: 8000,
    realCost: 10000,
    note: 'תוספת חיזוק',
    severity: 'low',
  },
  {
    item: 'עבודה ומיסים',
    planCost: 3640,
    realCost: 8600,
    note: 'עלויות עבודה ריאליות',
    severity: 'medium',
  },
]

const totalPlan = costBreakdown.reduce((sum, item) => sum + item.planCost, 0)
const totalReal = costBreakdown.reduce((sum, item) => sum + item.realCost, 0)
const difference = totalReal - totalPlan
const percentIncrease = ((difference / totalPlan) * 100).toFixed(0)

export function FinancialTable() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 via-white to-navy-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="warning" className="mb-4">
            <ArrowLeftRight className="w-3 h-3 ml-1" />
            טבלת השוואה
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            פירוט עלויות ליחידה
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            השוואת עלויות לפי התכנית העסקית מול המציאות השוקית (למבנה 54 מ&quot;ר)
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card variant="elevated" className="text-center">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-navy-500 mb-2">
                לפי התכנית
              </div>
              <div className="text-3xl font-black text-profit mb-1">
                {formatCurrency(totalPlan)}
              </div>
              <Badge variant="profit">ליחידה</Badge>
            </CardContent>
          </Card>

          <Card variant="elevated" className="text-center border-2 border-risk-light">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-navy-500 mb-2">
                פער בין התחזיות
              </div>
              <div className="text-3xl font-black text-risk mb-1">
                +{percentIncrease}%
              </div>
              <Badge variant="risk">עלייה</Badge>
            </CardContent>
          </Card>

          <Card variant="elevated" className="text-center">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-navy-500 mb-2">
                עלות ריאלית
              </div>
              <div className="text-3xl font-black text-risk mb-1">
                {formatCurrency(totalReal)}
              </div>
              <Badge variant="risk">ליחידה</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Table */}
        <Card variant="elevated" className="overflow-hidden max-w-5xl mx-auto">
          <CardHeader className="bg-navy-800 text-white">
            <CardTitle className="text-white">פירוט עלויות מלא</CardTitle>
            <CardDescription className="text-navy-200">
              השוואה בין הערכת היזם לניתוח השוק
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-50">
                    <th className="text-right p-4 font-bold text-navy-800">פריט</th>
                    <th className="text-center p-4 font-bold text-profit-dark">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        תכנית עסקית
                      </div>
                    </th>
                    <th className="text-center p-4 font-bold text-risk">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        מציאות שוקית
                      </div>
                    </th>
                    <th className="text-center p-4 font-bold text-navy-600">הפרש</th>
                    <th className="text-right p-4 font-bold text-navy-600">הערה</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((item, index) => {
                    const diff = item.realCost - item.planCost
                    const percentDiff = ((diff / item.planCost) * 100).toFixed(0)

                    return (
                      <tr
                        key={item.item}
                        className={`table-stripe border-b border-navy-100 hover:bg-navy-50/50 transition-colors ${
                          item.severity === 'critical' ? 'bg-risk-light/5' : ''
                        }`}
                      >
                        <td className="p-4 font-semibold text-navy-800">
                          <div className="flex items-center gap-2">
                            {item.severity === 'critical' && (
                              <AlertTriangle className="w-4 h-4 text-risk" />
                            )}
                            {item.item}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-mono font-bold text-profit-dark">
                            {formatCurrency(item.planCost)}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-mono font-bold text-risk">
                            {formatCurrency(item.realCost)}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={
                              item.severity === 'critical'
                                ? 'risk'
                                : item.severity === 'high'
                                ? 'warning'
                                : 'outline'
                            }
                          >
                            +{percentDiff}%
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-navy-600">
                          {item.note && (
                            <span
                              className={
                                item.severity === 'critical'
                                  ? 'text-risk font-semibold'
                                  : ''
                              }
                            >
                              {item.note}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-navy-800 text-white font-bold">
                    <td className="p-4">סה&quot;כ עלות יחידה</td>
                    <td className="p-4 text-center font-mono text-profit-light">
                      {formatCurrency(totalPlan)}
                    </td>
                    <td className="p-4 text-center font-mono text-risk-light">
                      {formatCurrency(totalReal)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="risk" className="bg-risk text-white">
                        +{formatCurrency(difference)}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-navy-200">
                      פער של {percentIncrease}% בין התחזיות
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Note */}
        <div className="mt-8 max-w-3xl mx-auto">
          <Card variant="glass" className="border border-amber-200 bg-amber-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800 mb-1">הערה חשובה</h4>
                  <p className="text-sm text-amber-700">
                    הנתונים בטור &quot;מציאות שוקית&quot; מבוססים על סקירת מחירים עדכנית
                    ובדיקת החישובים בתכנית העסקית המקורית. השגיאה המשמעותית ביותר
                    היא בחישוב עלות הבטון (540 ₪ במקום 5,400 ₪).
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

