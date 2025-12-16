'use client'

import React from 'react'
import { Building2, Users, Zap, TrendingUp, ArrowDown, Factory } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const stats = [
  {
    icon: Building2,
    value: '2-3 מיליון',
    label: 'יחידות דיור נדרשות עד 2060',
    subtext: 'ביקוש שוק עצום',
    color: 'text-navy-700',
    bgColor: 'bg-navy-50',
  },
  {
    icon: Users,
    value: '87%',
    label: 'מהקבלנים מדווחים על מחסור',
    subtext: 'משבר כוח אדם',
    color: 'text-risk',
    bgColor: 'bg-risk-light/10',
  },
  {
    icon: Zap,
    value: '50%',
    label: 'בנייה מהירה יותר',
    subtext: 'יתרון טכנולוגי',
    color: 'text-profit',
    bgColor: 'bg-profit-light/10',
  },
  {
    icon: TrendingUp,
    value: '20-25%',
    label: 'חיסכון בעלויות',
    subtext: 'יעילות תפעולית',
    color: 'text-profit-dark',
    bgColor: 'bg-profit-light/10',
  },
]

interface HeroSectionProps {
  onViewFinancials: () => void
  onAnalyzeRisks: () => void
}

export function HeroSection({ onViewFinancials, onAnalyzeRisks }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-profit/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy-400/20 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Factory className="w-4 h-4 text-profit-light" />
            <span className="text-sm font-medium text-white/90">הזדמנות השקעה אסטרטגית</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-slide-up leading-tight">
            פרויקט דוד
          </h1>
          <p className="text-2xl md:text-3xl text-profit-light font-bold mb-4 animate-slide-up delay-100">
            מהפכת הבנייה בטכנולוגיית LGS
          </p>
          <p className="text-lg md:text-xl text-navy-200 max-w-3xl mx-auto animate-slide-up delay-200">
            ניתוח השקעה אסטרטגי: ייצור היי-טק פוגש את משבר הדיור. 
            סקירה מקיפה של התחזית העסקית מול המציאות הכלכלית.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up delay-300">
          <Button
            variant="profit"
            size="lg"
            onClick={onViewFinancials}
            className="gap-2 text-lg"
          >
            <TrendingUp className="w-5 h-5" />
            צפה בנתונים פיננסיים
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onAnalyzeRisks}
            className="gap-2 text-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          >
            <ArrowDown className="w-5 h-5" />
            נתח סיכונים
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              variant="glass"
              hover
              className="animate-scale-in bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black text-white mb-2 count-up">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-navy-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-navy-400">
                  {stat.subtext}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white/50" />
        </div>
      </div>
    </section>
  )
}

