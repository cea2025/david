'use client'

import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Factory,
  Calendar,
  Target,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Toggle } from './ui/toggle'
import { Badge } from './ui/badge'
import { formatCurrency } from '@/lib/utils'

// Optimistic Data (Entrepreneur's Projection)
const optimisticData = [
  { year: 'שנה 1', revenue: 14700000, profit: 5800000, units: 100 },
  { year: 'שנה 2', revenue: 29400000, profit: 13200000, units: 200 },
  { year: 'שנה 3', revenue: 44100000, profit: 22543200, units: 300 },
]

// Realistic Data (Analyst's Review)
const realisticData = [
  { year: 'שנה 1', revenue: 14700000, profit: -2500000, units: 100 },
  { year: 'שנה 2', revenue: 29400000, profit: 3200000, units: 200 },
  { year: 'שנה 3', revenue: 44100000, profit: 8500000, units: 300 },
]

const optimisticKPIs = [
  {
    label: 'הכנסה ברוטו שנה 3',
    value: 44100000,
    icon: DollarSign,
    color: 'text-profit',
    bgColor: 'bg-profit-light/20',
  },
  {
    label: 'רווח נקי שנה 3',
    value: 22543200,
    icon: TrendingUp,
    color: 'text-profit-dark',
    bgColor: 'bg-profit-light/20',
  },
  {
    label: 'עלות למ"ר (חומרי גלם)',
    value: 340,
    suffix: ' ₪',
    icon: Factory,
    color: 'text-navy-600',
    bgColor: 'bg-navy-100',
  },
  {
    label: 'תפוקה יומית',
    value: 150,
    suffix: ' מ"ר/יום',
    icon: Calendar,
    color: 'text-navy-600',
    bgColor: 'bg-navy-100',
  },
]

const realisticKPIs = [
  {
    label: 'הכנסה ברוטו שנה 3',
    value: 44100000,
    icon: DollarSign,
    color: 'text-navy-600',
    bgColor: 'bg-navy-100',
  },
  {
    label: 'רווח נקי מתוקן שנה 3',
    value: 8500000,
    icon: TrendingDown,
    color: 'text-risk',
    bgColor: 'bg-risk-light/20',
  },
  {
    label: 'עלות יחידה אמיתית',
    value: 45000,
    suffix: ' ₪',
    icon: AlertTriangle,
    color: 'text-risk',
    bgColor: 'bg-risk-light/20',
  },
  {
    label: 'נקודת איזון',
    value: 'שנה 2+',
    icon: Target,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
]

const criticalErrors = [
  {
    title: 'שגיאת חישוב בטון',
    description: 'חושב 540 ₪ במקום 5,400 ₪ (12 מ"ר × 450 ₪)',
    severity: 'critical',
  },
  {
    title: 'הובלה ומנוף',
    description: 'תוקן מ-4,000 ₪ ל-15,000 ₪ (מחיר שוק למבנה 30 טון)',
    severity: 'high',
  },
  {
    title: 'ברזל/פלדה',
    description: 'מחיר אמיתי גבוה פי 2 - חיזוק לא מספיק',
    severity: 'medium',
  },
  {
    title: 'בידוד ואיטום',
    description: 'תוקן מ-180 ₪ ל-2,000 ₪',
    severity: 'medium',
  },
]

interface DualDashboardProps {
  id?: string
}

export function DualDashboard({ id }: DualDashboardProps) {
  const [isPessimistic, setIsPessimistic] = useState(false)

  const data = isPessimistic ? realisticData : optimisticData
  const kpis = isPessimistic ? realisticKPIs : optimisticKPIs

  return (
    <section
      id={id}
      className={`py-20 transition-all duration-500 ${
        isPessimistic
          ? 'bg-gradient-to-br from-red-50 via-white to-orange-50'
          : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant={isPessimistic ? 'risk' : 'profit'} className="mb-4">
            {isPessimistic ? 'מצב אנליטי' : 'מצב תכנית עסקית'}
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            דשבורד &quot;המציאות הכפולה&quot;
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-8">
            השווה בין התחזית האופטימית של היזם לבין הניתוח הריאליסטי של האנליסט
          </p>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white shadow-xl">
              <Toggle
                checked={isPessimistic}
                onCheckedChange={setIsPessimistic}
                labelLeft="📈 אופטימי"
                labelRight="🔍 ריאליסטי"
              />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, index) => (
            <Card
              key={kpi.label}
              variant="elevated"
              className="animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  {isPessimistic && index > 0 && (
                    <Badge variant="risk" className="text-xs">
                      מתוקן
                    </Badge>
                  )}
                </div>
                <div className={`text-3xl font-black mb-2 ${kpi.color}`}>
                  {typeof kpi.value === 'number' && !kpi.suffix
                    ? formatCurrency(kpi.value)
                    : kpi.value}
                  {kpi.suffix || ''}
                </div>
                <div className="text-sm font-medium text-navy-500">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue & Profit Chart */}
          <Card variant="elevated" className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className={isPessimistic ? 'text-risk' : 'text-profit'} />
                תחזית הכנסות ורווח
              </CardTitle>
              <CardDescription>
                {isPessimistic
                  ? 'תחזית מתוקנת לפי עלויות אמיתיות'
                  : 'תחזית לפי התכנית העסקית'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#486581" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#486581" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isPessimistic ? '#ef4444' : '#22c55e'}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={isPessimistic ? '#ef4444' : '#22c55e'}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ec" />
                  <XAxis
                    dataKey="year"
                    stroke="#627d98"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#627d98"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(0)}M`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d9e2ec',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="הכנסות"
                    stroke="#486581"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    name="רווח נקי"
                    stroke={isPessimistic ? '#ef4444' : '#22c55e'}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Units & Growth Chart */}
          <Card variant="elevated" className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <Factory className="text-navy-600" />
                ייצור יחידות
              </CardTitle>
              <CardDescription>
                תפוקת מפעל - יחידות דיור לשנה
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ec" />
                  <XAxis
                    dataKey="year"
                    stroke="#627d98"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#627d98"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d9e2ec',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number) => [`${value} יחידות`, 'תפוקה']}
                  />
                  <Line
                    type="monotone"
                    dataKey="units"
                    name="יחידות"
                    stroke="#486581"
                    strokeWidth={4}
                    dot={{ fill: '#486581', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#102a43' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Critical Errors Alert (Only in Pessimistic Mode) */}
        {isPessimistic && (
          <Card
            variant="elevated"
            className="border-2 border-risk-light animate-scale-in overflow-hidden"
          >
            <CardHeader className="bg-risk-light/10 border-b border-risk-light/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-risk-light/20 pulse-ring">
                  <AlertTriangle className="w-6 h-6 text-risk" />
                </div>
                <div>
                  <CardTitle className="text-risk">התראות קריטיות</CardTitle>
                  <CardDescription className="text-risk-dark">
                    שגיאות חישוב שזוהו בתכנית העסקית
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {criticalErrors.map((error, index) => (
                  <div
                    key={error.title}
                    className="p-4 rounded-xl bg-white border border-navy-100 hover:border-risk-light transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-1.5 rounded-full ${
                          error.severity === 'critical'
                            ? 'bg-risk-light/20'
                            : error.severity === 'high'
                            ? 'bg-amber-100'
                            : 'bg-navy-100'
                        }`}
                      >
                        <AlertTriangle
                          className={`w-4 h-4 ${
                            error.severity === 'critical'
                              ? 'text-risk'
                              : error.severity === 'high'
                              ? 'text-amber-600'
                              : 'text-navy-500'
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-900 mb-1">
                          {error.title}
                        </h4>
                        <p className="text-sm text-navy-600">{error.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Indicators (Only in Optimistic Mode) */}
        {!isPessimistic && (
          <Card variant="elevated" className="border-2 border-profit-light animate-scale-in">
            <CardHeader className="bg-profit-light/10 border-b border-profit-light/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-profit-light/20">
                  <CheckCircle2 className="w-6 h-6 text-profit" />
                </div>
                <div>
                  <CardTitle className="text-profit-dark">נקודות חוזק</CardTitle>
                  <CardDescription className="text-profit">
                    יתרונות המודל העסקי לפי התכנית
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-profit-light/10">
                  <div className="text-3xl font-black text-profit mb-2">51%</div>
                  <div className="text-sm text-navy-600">רווחיות נקייה צפויה</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-profit-light/10">
                  <div className="text-3xl font-black text-profit mb-2">147K ₪</div>
                  <div className="text-sm text-navy-600">הכנסה ליחידה</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-profit-light/10">
                  <div className="text-3xl font-black text-profit mb-2">300</div>
                  <div className="text-sm text-navy-600">יחידות בשנה 3</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

