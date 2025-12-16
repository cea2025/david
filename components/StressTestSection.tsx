'use client'

import React, { useState, useEffect } from 'react'
import { 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Factory,
  FileWarning,
  Building2,
  Truck,
  ChevronDown,
  ChevronUp,
  Skull,
  AlertOctagon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'

// נתוני בסיס מהתכנית (שנה 3 - השנה ה"טובה")
const BASE_DATA = {
  sqmYear3: 31500,
  pricePerSqm: 1400,
  rawMaterialCostPerSqm: 340,
  operationalCostYear3: 12988800, // משכורות + שוטף
  fixedCosts: 5000000, // עלויות קבועות שנתיות (שכירות, ליסינג, צוות ליבה)
}

// חישוב רווח בהתאם לפרמטרים
function calculateProfit(salesPercent: number, costIncrease: number, laborIncrease: number) {
  const actualSqm = BASE_DATA.sqmYear3 * (salesPercent / 100)
  const revenue = actualSqm * BASE_DATA.pricePerSqm
  
  // עלות גלם מותאמת
  const adjustedRawCost = BASE_DATA.rawMaterialCostPerSqm * (1 + costIncrease / 100)
  const totalRawMaterialCost = actualSqm * adjustedRawCost
  
  // עלויות תפעול מותאמות (משתנות לפי היקף + קבועות)
  const variableOperational = (BASE_DATA.operationalCostYear3 - BASE_DATA.fixedCosts) * (salesPercent / 100) * (1 + laborIncrease / 100)
  const fixedOperational = BASE_DATA.fixedCosts * (1 + laborIncrease / 100)
  const totalOperational = variableOperational + fixedOperational
  
  const totalCosts = totalRawMaterialCost + totalOperational
  const profit = revenue - totalCosts
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0
  
  return { revenue, totalCosts, profit, margin, actualSqm }
}

// גורמי סיכון
const riskFactors = [
  {
    id: 'steel',
    title: 'תלות במחירי הפלדה',
    icon: Factory,
    severity: 'critical',
    description: 'התוכנית רגישה לתנודות במחירי הקומודיטיס בעולם.',
    details: [
      'מחירי פלדה עלו ב-40% בשנת 2021 וב-25% נוספים ב-2022',
      'המפעל כבול בחוזים מול לקוחות - לא יכול להעביר עליות מחיר',
      'אין גידור (Hedging) מול עליות מחירי חומרי גלם',
      'תלות ביבוא - שערי מטבע משפיעים'
    ]
  },
  {
    id: 'market',
    title: 'חדירה לשוק',
    icon: Building2,
    severity: 'high',
    description: 'הנחת העבודה מתבססת על מעבר מהיר של השוק הישראלי מבטון לפלדה.',
    details: [
      'השוק הישראלי שמרני ומעדיף בטון (80% מהבנייה)',
      'קבלנים חוששים לעבוד עם שיטה/ספק חדשים',
      '115 דירות בשנה ראשונה - יעד אגרסיבי למפעל ללא תיק עבודות',
      'האטה באימוץ = תזרים שלילי לאורך זמן'
    ]
  },
  {
    id: 'regulation',
    title: 'רגולציה ורישוי',
    icon: FileWarning,
    severity: 'high',
    description: 'עיכובים בהיתרי בנייה (שאינם בשליטת המפעל) עלולים ליצור צווארי בקבוק.',
    details: [
      'היתר בנייה בישראל: 1-3 שנים',
      'טופס 4: חודשים נוספים',
      'המפעל יכול לייצר מהר, אבל לקוחות תקועים בהיתרים',
      'שלדים מוכנים = הון מת במחסן'
    ]
  },
  {
    id: 'labor',
    title: 'עלויות כוח אדם',
    icon: Users,
    severity: 'medium',
    description: 'שוק העבודה בישראל יקר ותחרותי. שכר מינימום עולה, עובדים מיומנים נדירים.',
    details: [
      'רתכים ומפעילי CNC - מחסור כרוני בישראל',
      'שכר ממוצע בתעשייה עלה 15% ב-3 שנים אחרונות',
      'עובדים זרים - תלות באישורים ממשלתיים',
      'הכשרת עובד חדש: 3-6 חודשים ועלות'
    ]
  },
  {
    id: 'execution',
    title: 'סיכון ביצועי',
    icon: Truck,
    severity: 'critical',
    description: '"מפתח תוך 6 חודשים" - הבטחה שתלויה בגורמים לא בשליטת המפעל.',
    details: [
      'פער בין "שלד" (1,400₪/מ"ר) ל"עד מפתח" (5,000-8,000₪/מ"ר)',
      'קבלני משנה לגמרים - סיכון לפשיטת רגל/בריחה',
      'אחריות מול הדייר נשארת על היזם',
      'תיקון ליקויים באתר - עלות לא מתוקצבת'
    ]
  }
]

export function StressTestSection() {
  const [mounted, setMounted] = useState(false)
  const [salesPercent, setSalesPercent] = useState(100)
  const [costIncrease, setCostIncrease] = useState(0)
  const [laborIncrease, setLaborIncrease] = useState(0)
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const results = calculateProfit(salesPercent, costIncrease, laborIncrease)
  const baseResults = calculateProfit(100, 0, 0)
  
  // רמת הסיכון
  const getRiskLevel = () => {
    if (results.profit < 0) return { level: 'catastrophic', label: 'הפסד!', color: 'text-red-600', bg: 'bg-red-100' }
    if (results.margin < 10) return { level: 'critical', label: 'סיכון קריטי', color: 'text-red-500', bg: 'bg-red-50' }
    if (results.margin < 20) return { level: 'high', label: 'סיכון גבוה', color: 'text-orange-500', bg: 'bg-orange-50' }
    if (results.margin < 35) return { level: 'medium', label: 'סיכון בינוני', color: 'text-amber-500', bg: 'bg-amber-50' }
    return { level: 'low', label: 'סיכון נמוך', color: 'text-green-500', bg: 'bg-green-50' }
  }
  
  const riskLevel = getRiskLevel()

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-red-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-700 rounded max-w-4xl mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="risk" className="mb-4 bg-red-900/50 text-red-300 border-red-700">
            <AlertTriangle className="w-3 h-3 ml-1" />
            ניתוח רגישות וגורמי סיכון
          </Badge>
          <h2 className="text-4xl font-black text-white mb-4">
            🔥 Stress Test - מה קורה כשהכל משתבש?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            משקיע חכם בודק את התרחיש הגרוע ביותר. הנה הכלים לבדוק מה קורה כשמכירות יורדות, 
            עלויות עולות, ועובדים דורשים יותר. <strong className="text-red-400">כולל תרחישי הפסד.</strong>
          </p>
        </div>

        {/* Main Calculator */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="bg-slate-900/80 border-red-900/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="border-b border-red-900/30">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertOctagon className="w-6 h-6 text-red-500" />
                מחשבון &quot;מה אם&quot; - תרחישים קיצוניים
              </CardTitle>
              <CardDescription className="text-gray-400">
                הזז את הסליידרים לראות איך המספרים משתנים בתרחישים שונים
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sliders */}
                <div className="space-y-8">
                  {/* Sales Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-white font-semibold flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        היקף מכירות
                      </label>
                      <span className={`font-mono font-bold text-lg ${
                        salesPercent < 50 ? 'text-red-400' : salesPercent < 80 ? 'text-amber-400' : 'text-green-400'
                      }`}>
                        {salesPercent}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={salesPercent}
                      onChange={(e) => setSalesPercent(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-red"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>קטסטרופה (20%)</span>
                      <span>תכנית (100%)</span>
                    </div>
                  </div>

                  {/* Cost Increase Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-white font-semibold flex items-center gap-2">
                        <Factory className="w-4 h-4 text-orange-400" />
                        עליית מחירי חומרי גלם
                      </label>
                      <span className={`font-mono font-bold text-lg ${
                        costIncrease > 30 ? 'text-red-400' : costIncrease > 15 ? 'text-amber-400' : 'text-green-400'
                      }`}>
                        +{costIncrease}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={costIncrease}
                      onChange={(e) => setCostIncrease(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>תכנית (0%)</span>
                      <span>משבר פלדה (+60%)</span>
                    </div>
                  </div>

                  {/* Labor Cost Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-white font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        עליית עלויות כוח אדם
                      </label>
                      <span className={`font-mono font-bold text-lg ${
                        laborIncrease > 30 ? 'text-red-400' : laborIncrease > 15 ? 'text-amber-400' : 'text-green-400'
                      }`}>
                        +{laborIncrease}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={laborIncrease}
                      onChange={(e) => setLaborIncrease(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>תכנית (0%)</span>
                      <span>אינפלציה גבוהה (+50%)</span>
                    </div>
                  </div>

                  {/* Preset Scenarios */}
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-gray-400 mb-3">תרחישים מוכנים:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => { setSalesPercent(100); setCostIncrease(0); setLaborIncrease(0) }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-green-900/50 text-green-300 hover:bg-green-800/50 transition-colors"
                      >
                        🌟 אופטימי
                      </button>
                      <button
                        onClick={() => { setSalesPercent(80); setCostIncrease(15); setLaborIncrease(10) }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-amber-900/50 text-amber-300 hover:bg-amber-800/50 transition-colors"
                      >
                        ⚠️ מציאותי
                      </button>
                      <button
                        onClick={() => { setSalesPercent(50); setCostIncrease(30); setLaborIncrease(20) }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-orange-900/50 text-orange-300 hover:bg-orange-800/50 transition-colors"
                      >
                        🔶 פסימי
                      </button>
                      <button
                        onClick={() => { setSalesPercent(30); setCostIncrease(50); setLaborIncrease(40) }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-red-900/50 text-red-300 hover:bg-red-800/50 transition-colors"
                      >
                        💀 קטסטרופה
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  {/* Risk Level Indicator */}
                  <div className={`p-4 rounded-xl ${riskLevel.bg} border-2 ${
                    results.profit < 0 ? 'border-red-500 animate-pulse' : 'border-transparent'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">רמת סיכון:</span>
                      <span className={`font-bold text-lg ${riskLevel.color}`}>
                        {results.profit < 0 && <Skull className="w-5 h-5 inline ml-1" />}
                        {riskLevel.label}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          results.profit < 0 ? 'bg-red-600' :
                          results.margin < 10 ? 'bg-red-500' :
                          results.margin < 20 ? 'bg-orange-500' :
                          results.margin < 35 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, results.margin * 2))}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">מ&quot;ר שנתי</div>
                      <div className="text-white font-bold text-xl">
                        {results.actualSqm.toLocaleString()}
                      </div>
                      <div className={`text-xs ${results.actualSqm < baseResults.actualSqm ? 'text-red-400' : 'text-gray-500'}`}>
                        {results.actualSqm < baseResults.actualSqm && '↓ '}
                        {((results.actualSqm / baseResults.actualSqm - 1) * 100).toFixed(0)}% מהתכנית
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">הכנסות</div>
                      <div className="text-blue-400 font-bold text-xl">
                        {(results.revenue / 1000000).toFixed(1)}M ₪
                      </div>
                      <div className={`text-xs ${results.revenue < baseResults.revenue ? 'text-red-400' : 'text-gray-500'}`}>
                        {results.revenue < baseResults.revenue && '↓ '}
                        {((results.revenue / baseResults.revenue - 1) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">עלויות</div>
                      <div className="text-orange-400 font-bold text-xl">
                        {(results.totalCosts / 1000000).toFixed(1)}M ₪
                      </div>
                      <div className={`text-xs ${results.totalCosts > baseResults.totalCosts ? 'text-red-400' : 'text-gray-500'}`}>
                        {results.totalCosts > baseResults.totalCosts && '↑ '}
                        +{((results.totalCosts / baseResults.totalCosts - 1) * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className={`rounded-xl p-4 ${results.profit < 0 ? 'bg-red-900/50 border-2 border-red-500' : 'bg-slate-800'}`}>
                      <div className="text-gray-400 text-sm mb-1">רווח נקי</div>
                      <div className={`font-bold text-xl ${results.profit < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {results.profit < 0 ? '-' : ''}{(Math.abs(results.profit) / 1000000).toFixed(1)}M ₪
                      </div>
                      <div className={`text-xs ${results.profit < baseResults.profit ? 'text-red-400' : 'text-green-400'}`}>
                        {results.profit < 0 ? '❌ הפסד!' : `${results.margin.toFixed(0)}% רווחיות`}
                      </div>
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3">השוואה לתכנית המקורית:</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="text-right py-1">מדד</th>
                          <th className="text-center py-1">תכנית</th>
                          <th className="text-center py-1">תרחיש</th>
                          <th className="text-center py-1">הפרש</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-t border-slate-700">
                          <td className="py-2">רווח שנתי</td>
                          <td className="text-center text-green-400">{(baseResults.profit / 1000000).toFixed(1)}M</td>
                          <td className={`text-center ${results.profit < 0 ? 'text-red-400' : 'text-amber-400'}`}>
                            {results.profit < 0 ? '-' : ''}{(Math.abs(results.profit) / 1000000).toFixed(1)}M
                          </td>
                          <td className={`text-center ${results.profit < baseResults.profit ? 'text-red-400' : 'text-green-400'}`}>
                            {((results.profit - baseResults.profit) / 1000000).toFixed(1)}M
                          </td>
                        </tr>
                        <tr className="border-t border-slate-700">
                          <td className="py-2">רווחיות</td>
                          <td className="text-center text-green-400">{baseResults.margin.toFixed(0)}%</td>
                          <td className={`text-center ${results.margin < 20 ? 'text-red-400' : 'text-amber-400'}`}>
                            {results.margin.toFixed(0)}%
                          </td>
                          <td className={`text-center ${results.margin < baseResults.margin ? 'text-red-400' : 'text-green-400'}`}>
                            {(results.margin - baseResults.margin).toFixed(0)}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Warning Message */}
                  {results.profit < 0 && (
                    <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 animate-pulse">
                      <div className="flex items-start gap-3">
                        <Skull className="w-6 h-6 text-red-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-red-300 font-bold mb-1">⚠️ תרחיש הפסד!</h4>
                          <p className="text-red-200 text-sm">
                            בתרחיש זה המפעל מפסיד {(Math.abs(results.profit) / 1000000).toFixed(1)} מיליון ₪ בשנה. 
                            ההשקעה של 8.15M₪ תאבד תוך {(8150000 / Math.abs(results.profit)).toFixed(1)} שנים.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Factors */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            📋 גורמי סיכון - גילוי נאות למשקיע
          </h3>
          
          <div className="space-y-4">
            {riskFactors.map((risk) => (
              <div 
                key={risk.id}
                className={`bg-slate-900/80 border rounded-xl overflow-hidden transition-all ${
                  risk.severity === 'critical' ? 'border-red-700/50' :
                  risk.severity === 'high' ? 'border-orange-700/50' : 'border-amber-700/50'
                }`}
              >
                <button
                  onClick={() => setExpandedRisk(expandedRisk === risk.id ? null : risk.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      risk.severity === 'critical' ? 'bg-red-900/50' :
                      risk.severity === 'high' ? 'bg-orange-900/50' : 'bg-amber-900/50'
                    }`}>
                      <risk.icon className={`w-5 h-5 ${
                        risk.severity === 'critical' ? 'text-red-400' :
                        risk.severity === 'high' ? 'text-orange-400' : 'text-amber-400'
                      }`} />
                    </div>
                    <div className="text-right">
                      <h4 className="text-white font-semibold">{risk.title}</h4>
                      <p className="text-gray-400 text-sm">{risk.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={risk.severity === 'critical' ? 'risk' : 'default'} className={
                      risk.severity === 'critical' ? 'bg-red-900/50 text-red-300' :
                      risk.severity === 'high' ? 'bg-orange-900/50 text-orange-300' : 'bg-amber-900/50 text-amber-300'
                    }>
                      {risk.severity === 'critical' ? 'קריטי' : risk.severity === 'high' ? 'גבוה' : 'בינוני'}
                    </Badge>
                    {expandedRisk === risk.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {expandedRisk === risk.id && (
                  <div className="px-4 pb-4 border-t border-slate-700/50">
                    <ul className="mt-4 space-y-2">
                      {risk.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Warning */}
          <div className="mt-12 bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
            <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-white font-bold text-xl mb-2">
              איפה הכסף עלול להיעלם?
            </h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              התרחיש הגרוע ביותר: המפעל מוקם (4M₪ שקועים), מכירות קיפאון (2,000 מ&quot;ר במקום 11,000), 
              עלויות קבועות ממשיכות (3-4M₪/שנה), מחירי פלדה קופצים 30%, וקבלן משנה פושט רגל. 
              <strong className="text-red-400"> תוך 18-24 חודשים - כל ההשקעה נשרפת.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider-red::-webkit-slider-thumb {
          background: #ef4444;
        }
        .slider-orange::-webkit-slider-thumb {
          background: #f97316;
        }
        .slider-purple::-webkit-slider-thumb {
          background: #a855f7;
        }
      `}</style>
    </section>
  )
}

