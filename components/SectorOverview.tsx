'use client'

import React from 'react'
import {
  Building,
  Clock,
  Shield,
  Leaf,
  Cpu,
  Award,
  PiggyBank,
  Factory,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'

const lgsAdvantages = [
  {
    icon: Clock,
    title: 'מהירות בנייה',
    value: '6 חודשים',
    description: 'מיסוד ועד מפתח - מהיר ב-50% מבנייה מסורתית',
    color: 'text-profit',
    bgColor: 'bg-profit-light/10',
  },
  {
    icon: Cpu,
    title: 'דיוק BIM',
    value: '99.9%',
    description: 'תכנון דיגיטלי מלא עם תכנון מראש של כל המערכות',
    color: 'text-navy-600',
    bgColor: 'bg-navy-100',
  },
  {
    icon: Shield,
    title: 'בידוד תרמי',
    value: 'x5.5',
    description: 'בידוד טוב פי 5.5 מבנייה מסורתית',
    color: 'text-profit',
    bgColor: 'bg-profit-light/10',
  },
  {
    icon: Leaf,
    title: 'ידידות לסביבה',
    value: '100%',
    description: 'פלדה ממוחזרת, פחות פסולת בנייה',
    color: 'text-profit-dark',
    bgColor: 'bg-profit-light/10',
  },
]

const incentives = [
  {
    icon: PiggyBank,
    title: 'מענק ציוד',
    value: '50%',
    description: 'מענק ממשלתי לרכישת ציוד ייצור',
  },
  {
    icon: Award,
    title: 'מפעל מאושר',
    value: 'הטבות מס',
    description: 'הכרה כ"מפעל מועדף" עם הקלות מס משמעותיות',
  },
  {
    icon: Factory,
    title: 'אזור פיתוח',
    value: 'עדיפות',
    description: 'הטבות נוספות במיקום באזורי פיתוח',
  },
]

export function SectorOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4">
            <Building className="w-3 h-3 ml-1" />
            סקירת מאקרו
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            טכנולוגיית LGS - &quot;מהמפעל למפתח&quot;
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Light Gauge Steel - מערכת בנייה מתועשת המבוססת על פרופילי פלדה קלים
            המיוצרים במפעל ומורכבים באתר
          </p>
        </div>

        <Tabs defaultValue="technology" className="max-w-5xl mx-auto">
          <TabsList className="w-full justify-center mb-8">
            <TabsTrigger value="technology">הטכנולוגיה</TabsTrigger>
            <TabsTrigger value="advantages">יתרונות</TabsTrigger>
            <TabsTrigger value="incentives">תמריצים ממשלתיים</TabsTrigger>
          </TabsList>

          <TabsContent value="technology">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card variant="elevated" className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="text-navy-600" />
                    מודל &quot;מהמפעל למפתח&quot;
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50">
                    <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800">תכנון דיגיטלי (BIM)</h4>
                      <p className="text-sm text-navy-600">
                        תכנון מלא של המבנה כולל כל המערכות בתוכנה מתקדמת
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50">
                    <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800">ייצור במפעל</h4>
                      <p className="text-sm text-navy-600">
                        הפרופילים נחתכים ומעובדים במכונות CNC אוטומטיות (Howick)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50">
                    <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800">הרכבה באתר</h4>
                      <p className="text-sm text-navy-600">
                        הרכבה מהירה של המבנה עם צוות מצומצם - כמו &quot;לגו&quot; מתקדם
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-profit-light/10">
                    <div className="w-8 h-8 rounded-full bg-profit text-white flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-profit-dark">מסירת מפתח</h4>
                      <p className="text-sm text-navy-600">
                        יחידת דיור מוכנה לאכלוס תוך 6 חודשים בלבד
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="text-navy-600" />
                    מכונות Howick
                  </CardTitle>
                  <CardDescription>
                    טכנולוגיה מובילה מניו זילנד
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video relative rounded-xl overflow-hidden mb-4 group">
                    <img 
                      src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" 
                      alt="מכונת ייצור LGS" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent flex items-end p-4">
                      <p className="text-white font-medium">Howick FRAMA 3200</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-navy-50">
                      <span className="text-navy-600">תפוקה</span>
                      <span className="font-bold text-navy-800">150 מ&quot;ר/יום</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-navy-50">
                      <span className="text-navy-600">דיוק חיתוך</span>
                      <span className="font-bold text-navy-800">±0.5 מ&quot;מ</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-navy-50">
                      <span className="text-navy-600">אוטומציה</span>
                      <span className="font-bold text-navy-800">מלאה - CNC</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advantages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lgsAdvantages.map((advantage, index) => (
                <Card
                  key={advantage.title}
                  variant="elevated"
                  hover
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl ${advantage.bgColor} mb-4`}>
                      <advantage.icon className={`w-8 h-8 ${advantage.color}`} />
                    </div>
                    <div className={`text-3xl font-black ${advantage.color} mb-2`}>
                      {advantage.value}
                    </div>
                    <h3 className="font-bold text-navy-800 mb-2">{advantage.title}</h3>
                    <p className="text-sm text-navy-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="incentives">
            <Card variant="elevated" className="p-8">
              <CardHeader className="p-0 mb-8 text-center">
                <CardTitle className="text-2xl">תמריצים ממשלתיים לתעשיית הבנייה</CardTitle>
                <CardDescription>
                  הממשלה מעודדת מעבר לבנייה מתועשת עם מגוון הטבות
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {incentives.map((incentive, index) => (
                    <div
                      key={incentive.title}
                      className="p-6 rounded-2xl bg-gradient-to-br from-profit-light/10 to-profit-light/5 border border-profit-light/20 text-center"
                    >
                      <div className="inline-flex p-3 rounded-xl bg-profit-light/20 mb-4">
                        <incentive.icon className="w-6 h-6 text-profit" />
                      </div>
                      <div className="text-2xl font-black text-profit mb-2">
                        {incentive.value}
                      </div>
                      <h3 className="font-bold text-navy-800 mb-2">{incentive.title}</h3>
                      <p className="text-sm text-navy-600">{incentive.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-navy-50 border border-navy-200">
                  <h4 className="font-bold text-navy-800 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-navy-600" />
                    סיכום הטבות
                  </h4>
                  <ul className="space-y-2 text-navy-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-profit" />
                      מענק של עד 50% על רכישת ציוד ייצור
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-profit" />
                      מס חברות מופחת כ&quot;מפעל מועדף&quot;
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-profit" />
                      הטבות נוספות באזורי פיתוח א&apos; ו-ב&apos;
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-profit" />
                      עדיפות במכרזי דיור ממשלתיים
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

