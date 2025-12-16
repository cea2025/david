'use client'

import React from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  ArrowLeft,
  Scale,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const verdictPoints = {
  positive: [
    'המודל העסקי (LGS) מצוין ואסטרטגי',
    'ביקוש שוק עצום - 2-3 מיליון יחידות דיור',
    'משבר כוח אדם מעודד בנייה מתועשת',
    'תמריצים ממשלתיים משמעותיים',
    'טכנולוגיה מוכחת (Howick - ניו זילנד)',
  ],
  concerns: [
    'שגיאות חשבוניות קריטיות בתכנית',
    'חישוב בטון שגוי ב-90%',
    'עלויות הובלה ומנוף לא ריאליות',
    'עלות יחידה אמיתית: ~45,000 ₪ (לא 18,360 ₪)',
    'נקודת איזון רחוקה מהצפוי',
  ],
}

const recommendations = [
  {
    icon: Target,
    title: 'תיקון עלויות',
    description: 'לחשב מחדש את עלות היחידה בהתאם למחירי שוק: כ-40,000-45,000 ₪ ליחידה בסיס',
    priority: 'גבוהה',
  },
  {
    icon: Scale,
    title: 'בדיקת כדאיות מחודשת',
    description: 'לבנות מודל פיננסי חדש עם העלויות המתוקנות ולבחון את נקודת האיזון האמיתית',
    priority: 'גבוהה',
  },
  {
    icon: TrendingUp,
    title: 'תמחור מחודש',
    description: 'להעלות את מחיר המכירה ליחידה או לשפר יעילות תפעולית להגעה לרווחיות',
    priority: 'בינונית',
  },
]

export function RecommendationsSection() {
  return (
    <section id="risks" className="py-20 bg-gradient-to-br from-navy-50 via-white to-navy-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="warning" className="mb-4">
            <Scale className="w-3 h-3 ml-1" />
            חוות דעת יועץ פיננסי
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            סיכום והמלצות
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            ניתוח מקיף של ההזדמנות והסיכונים - המלצה סופית למשקיע
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Verdict Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Positive Points */}
            <Card variant="elevated" className="border-2 border-profit-light overflow-hidden">
              <CardHeader className="bg-profit-light/10">
                <CardTitle className="flex items-center gap-2 text-profit-dark">
                  <CheckCircle2 className="w-6 h-6" />
                  נקודות חוזק
                </CardTitle>
                <CardDescription className="text-profit">
                  היבטים חיוביים של ההשקעה
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {verdictPoints.positive.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-profit" />
                      </div>
                      <span className="text-navy-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Concerns */}
            <Card variant="elevated" className="border-2 border-risk-light overflow-hidden">
              <CardHeader className="bg-risk-light/10">
                <CardTitle className="flex items-center gap-2 text-risk">
                  <AlertTriangle className="w-6 h-6" />
                  נקודות לתשומת לב
                </CardTitle>
                <CardDescription className="text-risk-dark">
                  סיכונים וחששות שזוהו
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {verdictPoints.concerns.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <AlertTriangle className="w-5 h-5 text-risk" />
                      </div>
                      <span className="text-navy-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Final Verdict */}
          <Card variant="elevated" className="mb-12 overflow-hidden">
            <CardHeader className="bg-gradient-to-l from-navy-800 to-navy-700 text-white">
              <CardTitle className="text-white flex items-center gap-2 text-2xl">
                <Lightbulb className="w-7 h-7" />
                חוות דעת סופית
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl font-bold text-navy-800 mb-4">
                  המודל העסקי (LGS) מצוין ואסטרטגי.
                </p>
                <p className="text-navy-600 mb-6">
                  עם זאת, הכלכלית היחידה (Unit Economics) שהוצגה בקובץ האקסל 
                  מכילה <span className="text-risk font-bold">שגיאות חשבוניות קריטיות</span>.
                </p>
                
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <Target className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 text-lg mb-2">המלצה</h4>
                      <p className="text-amber-700">
                        להשקיע ב<span className="font-bold">מודל הטכנולוגיה/המפעל</span>, 
                        אך לחשב מחדש את תמחור היחידה כך שישקף עלויות שוק ריאליות 
                        <span className="font-bold"> (כ-40,000 ₪ עלות בסיס ליחידה)</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 py-4">
                  <Badge variant="profit" className="text-base px-4 py-2">
                    מודל עסקי ✓
                  </Badge>
                  <ArrowLeft className="w-6 h-6 text-navy-400" />
                  <Badge variant="warning" className="text-base px-4 py-2">
                    תמחור ⚠️
                  </Badge>
                  <ArrowLeft className="w-6 h-6 text-navy-400" />
                  <Badge variant="risk" className="text-base px-4 py-2">
                    חישובים ✗
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <h3 className="text-2xl font-bold text-navy-900 text-center mb-6">
            צעדים מומלצים לפני השקעה
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {recommendations.map((rec, index) => (
              <Card
                key={rec.title}
                variant="elevated"
                hover
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-navy-100">
                      <rec.icon className="w-6 h-6 text-navy-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-navy-800">{rec.title}</h4>
                        <Badge
                          variant={rec.priority === 'גבוהה' ? 'risk' : 'warning'}
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-navy-600">{rec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card variant="glass" className="inline-block">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-navy-800 mb-4">
                  מעוניין לקבל ניתוח מעמיק יותר?
                </h3>
                <p className="text-navy-600 mb-6">
                  צור קשר לקבלת דו&quot;ח מלא וליווי בתהליך קבלת ההחלטה
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="primary" size="lg">
                    צור קשר
                  </Button>
                  <Button variant="outline" size="lg">
                    הורד דו&quot;ח PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

