'use client'

import React, { useState, useEffect } from 'react'
import { FileSpreadsheet, Download, ZoomIn, ZoomOut, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Toggle } from './ui/toggle'

// ==================== נתונים אופטימיים (נתוני המייסדים) ====================

// עלות גלם ליחידה (54 מ"ר) - הערכה מבוססת 340₪/מ"ר
const unitCostDataOptimistic = [
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
]

// נתוני הכנסות - נתוני המייסדים (אופטימי)
const revenueDataOptimistic = [
  { row: 1, year: 'שנה 1', sqm: '11,550', pricePerSqm: '1,400', revenue: '16,170,000', costs: '11,818,200', profit: '4,351,800', margin: '27%' },
  { row: 2, year: 'שנה 2', sqm: '23,100', pricePerSqm: '1,400', revenue: '32,340,000', costs: '17,704,500', profit: '14,635,500', margin: '45%' },
  { row: 3, year: 'שנה 3', sqm: '31,500', pricePerSqm: '1,400', revenue: '44,100,000', costs: '21,556,800', profit: '22,543,200', margin: '51%' },
]

// נתוני השקעה - נתוני המייסדים (אופטימי)
const investmentDataOptimistic = [
  { row: 1, item: 'שכירות (13 חודשים)', quantity: '13', price: '910,000', notes: '70,000₪ × 13' },
  { row: 2, item: 'הכשרת שטח', quantity: '1', price: '160,000', notes: 'מערכות חשמל/אוויר/מידוף' },
  { row: 3, item: 'ציוד אנלוגי', quantity: '1', price: '540,000', notes: 'מערכות ייצור/חיתוך/כיפוף' },
  { row: 4, item: 'מיכשור מתקדם', quantity: '1', price: '950,000', notes: 'חריטה/מערכת הרמה/כרסום' },
  { row: 5, item: 'הקמת משרדים', quantity: '1', price: '250,000', notes: 'כולל תקשורת ואביזור' },
  { row: 6, item: 'בניית קונספט', quantity: '4', price: '200,000', notes: 'פיתוח ומידול שיטות ייצור' },
  { row: 7, item: 'ליווי ויועצים', quantity: '1', price: '80,000', notes: 'להקמת מפעל הייצור' },
  { row: 8, item: 'הקמת מערכי שיווק', quantity: '1', price: '50,000', notes: 'מיתוג/משפכי שיווק/דיגיטציה' },
  { row: 9, item: 'פרסום ושיווק', quantity: '7', price: '210,000', notes: 'יח"צ/דיגיטל/שיתופי פעולה' },
  { row: 10, item: 'בלתי צפויים', quantity: '1', price: '200,000', notes: 'רזרבה' },
  { row: 11, item: 'ניהול פרויקט הקמה', quantity: '6', price: '480,000', notes: '80,000₪ × 6 חודשים' },
]

// משכורות ותפעול שנתי - נתוני המייסדים (אופטימי)
const operatingDataOptimistic = {
  year1: [
    { row: 1, item: 'מנכ"ל', monthly: '55,000', annual: '660,000', notes: 'כולל מס מעסיק' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '30,000', annual: '360,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 4, item: 'BIM מהנדס', monthly: '25,000', annual: '300,000', notes: '' },
    { row: 5, item: 'עובדי יצור', monthly: '70,000', annual: '840,000', notes: '5 עובדים' },
    { row: 6, item: 'מכירות ושיווק', monthly: '20,000', annual: '240,000', notes: '' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '8,000', annual: '96,000', notes: 'חיצוני' },
    { row: 8, item: 'יועץ משפטי', monthly: '5,000', annual: '60,000', notes: 'חיצוני' },
    { row: 9, item: 'הובלות והתקנות', monthly: '25,000', annual: '300,000', notes: '' },
    { row: 10, item: 'ייצור גלם', monthly: '326,000', annual: '3,927,000', notes: '11,550 מ"ר × 340₪' },
    { row: 11, item: 'הוצאות מפעל', monthly: '30,000', annual: '360,000', notes: 'חשמל/מים/אחזקה' },
    { row: 12, item: 'שכירות', monthly: '70,000', annual: '840,000', notes: '' },
    { row: 13, item: 'שונות', monthly: '15,000', annual: '180,000', notes: '' },
  ],
  year2: [
    { row: 1, item: 'מנכ"ל', monthly: '60,000', annual: '720,000', notes: 'כולל מס מעסיק' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '40,000', annual: '480,000', notes: '' },
    { row: 4, item: 'BIM מהנדס', monthly: '30,000', annual: '360,000', notes: '' },
    { row: 5, item: 'עובדי יצור', monthly: '140,000', annual: '1,680,000', notes: '10 עובדים' },
    { row: 6, item: 'מכירות ושיווק', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '10,000', annual: '120,000', notes: 'חיצוני' },
    { row: 8, item: 'יועץ משפטי', monthly: '8,000', annual: '96,000', notes: 'חיצוני' },
    { row: 9, item: 'הובלות והתקנות', monthly: '50,000', annual: '600,000', notes: '' },
    { row: 10, item: 'ייצור גלם', monthly: '655,000', annual: '7,854,000', notes: '23,100 מ"ר × 340₪' },
    { row: 11, item: 'הוצאות מפעל', monthly: '45,000', annual: '540,000', notes: 'חשמל/מים/אחזקה' },
    { row: 12, item: 'שכירות', monthly: '80,000', annual: '960,000', notes: '' },
    { row: 13, item: 'שונות', monthly: '20,000', annual: '240,000', notes: '' },
    { row: 14, item: 'הוזלת עלויות (20%)', monthly: '-', annual: '-1,787,100', notes: 'חיסכון מגודל' },
  ],
  year3: [
    { row: 1, item: 'מנכ"ל', monthly: '65,000', annual: '780,000', notes: 'כולל מס מעסיק' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '40,000', annual: '480,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '45,000', annual: '540,000', notes: '' },
    { row: 4, item: 'BIM מהנדסים', monthly: '60,000', annual: '720,000', notes: '2 מהנדסים' },
    { row: 5, item: 'עובדי יצור', monthly: '196,000', annual: '2,352,000', notes: '14 עובדים' },
    { row: 6, item: 'מכירות ושיווק', monthly: '50,000', annual: '600,000', notes: '' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '12,000', annual: '144,000', notes: 'חיצוני' },
    { row: 8, item: 'יועץ משפטי', monthly: '10,000', annual: '120,000', notes: 'חיצוני' },
    { row: 9, item: 'הובלות והתקנות', monthly: '70,000', annual: '840,000', notes: '' },
    { row: 10, item: 'ייצור גלם', monthly: '893,000', annual: '10,710,000', notes: '31,500 מ"ר × 340₪' },
    { row: 11, item: 'הוצאות מפעל', monthly: '55,000', annual: '660,000', notes: 'חשמל/מים/אחזקה' },
    { row: 12, item: 'שכירות', monthly: '85,000', annual: '1,020,000', notes: '' },
    { row: 13, item: 'שונות', monthly: '25,000', annual: '300,000', notes: '' },
    { row: 14, item: 'הוזלת עלויות (20%)', monthly: '-', annual: '-2,142,000', notes: 'חיסכון מגודל' },
  ],
}

// ==================== נתונים פסימיים (ביקורת) ====================
// הנחות: עלויות גבוהות ב-15%, עיכוב בייצור 20%, ללא הוזלת עלויות, מחיר שוק אולי נמוך יותר

// עלות גלם ליחידה - מתוקן (+15%)
const unitCostDataPessimistic = [
  { row: 1, item: 'פרופילי LGS (שלד)', quantity: '54', unit: 'מ"ר', pricePerUnit: '170', total: '9,200', notes: '⚠️ מחירי פלדה תנודתיים' },
  { row: 2, item: 'בטון יציקות', quantity: '12', unit: 'מ"ר', pricePerUnit: '52', total: '620', notes: '' },
  { row: 3, item: 'ברזל זיון', quantity: '200', unit: 'ק"ג', pricePerUnit: '12', total: '2,400', notes: '⚠️ עליות מחיר בשנה האחרונה' },
  { row: 4, item: 'לוחות גבס פנים', quantity: '120', unit: 'מ"ר', pricePerUnit: '40', total: '4,800', notes: '' },
  { row: 5, item: 'לוחות חוץ (סמנטבורד)', quantity: '80', unit: 'מ"ר', pricePerUnit: '52', total: '4,160', notes: '' },
  { row: 6, item: 'בידוד תרמי', quantity: '54', unit: 'מ"ר', pricePerUnit: '29', total: '1,550', notes: '' },
  { row: 7, item: 'איטום ומסתור', quantity: '1', unit: 'יחידה', pricePerUnit: '207', total: '207', notes: '' },
  { row: 8, item: 'חלונות אלומיניום', quantity: '6', unit: 'יחידות', pricePerUnit: '920', total: '5,520', notes: '⚠️ מחירי אלומיניום עלו' },
  { row: 9, item: 'דלתות (כניסה + פנים)', quantity: '5', unit: 'יחידות', pricePerUnit: '690', total: '3,450', notes: '' },
  { row: 10, item: 'אינסטלציה', quantity: '1', unit: 'קומפלט', pricePerUnit: '9,200', total: '9,200', notes: '' },
  { row: 11, item: 'חשמל', quantity: '1', unit: 'קומפלט', pricePerUnit: '8,050', total: '8,050', notes: '' },
  { row: 12, item: 'ריצוף וחיפוי', quantity: '54', unit: 'מ"ר', pricePerUnit: '138', total: '7,450', notes: '' },
  { row: 13, item: 'מטבח בסיסי', quantity: '1', unit: 'יחידה', pricePerUnit: '13,800', total: '13,800', notes: '' },
  { row: 14, item: 'סניטריה', quantity: '1', unit: 'קומפלט', pricePerUnit: '5,750', total: '5,750', notes: '' },
  { row: 15, item: 'צבע ושפכטל', quantity: '200', unit: 'מ"ר', pricePerUnit: '17', total: '3,450', notes: '' },
  { row: 16, item: 'הובלה למגרש', quantity: '1', unit: 'משלוח', pricePerUnit: '4,600', total: '4,600', notes: '⚠️ עלויות דלק' },
]

// נתוני הכנסות - פסימי (עיכוב 20%, עלויות +15%, ללא הוזלה)
const revenueDataPessimistic = [
  { row: 1, year: 'שנה 1', sqm: '9,240', pricePerSqm: '1,400', revenue: '12,936,000', costs: '11,854,560', profit: '1,081,440', margin: '8%', note: '⚠️ עיכוב 20% בייצור' },
  { row: 2, year: 'שנה 2', sqm: '18,480', pricePerSqm: '1,400', revenue: '25,872,000', costs: '17,763,600', profit: '8,108,400', margin: '31%', note: '⚠️ ללא הוזלת עלויות' },
  { row: 3, year: 'שנה 3', sqm: '25,200', pricePerSqm: '1,400', revenue: '35,280,000', costs: '23,045,400', profit: '12,234,600', margin: '35%', note: '⚠️ רווחיות מופחתת' },
]

// נתוני השקעה - פסימי (+15% בלתי צפויים)
const investmentDataPessimistic = [
  { row: 1, item: 'שכירות (13 חודשים)', quantity: '13', price: '910,000', notes: '70,000₪ × 13' },
  { row: 2, item: 'הכשרת שטח', quantity: '1', price: '184,000', notes: '⚠️ +15% חריגות' },
  { row: 3, item: 'ציוד אנלוגי', quantity: '1', price: '621,000', notes: '⚠️ +15% עלות יבוא' },
  { row: 4, item: 'מיכשור מתקדם', quantity: '1', price: '1,092,500', notes: '⚠️ +15% מורכבות' },
  { row: 5, item: 'הקמת משרדים', quantity: '1', price: '287,500', notes: '⚠️ +15% חומרי בניין' },
  { row: 6, item: 'בניית קונספט', quantity: '4', price: '230,000', notes: '⚠️ +15% זמן נוסף' },
  { row: 7, item: 'ליווי ויועצים', quantity: '1', price: '120,000', notes: '⚠️ +50% ליווי מורחב' },
  { row: 8, item: 'הקמת מערכי שיווק', quantity: '1', price: '57,500', notes: '⚠️ +15%' },
  { row: 9, item: 'פרסום ושיווק', quantity: '7', price: '280,000', notes: '⚠️ שוק תחרותי יותר' },
  { row: 10, item: 'בלתי צפויים', quantity: '1', price: '400,000', notes: '⚠️ כפול - סיכון גבוה' },
  { row: 11, item: 'ניהול פרויקט הקמה', quantity: '8', price: '640,000', notes: '⚠️ +2 חודשי עיכוב' },
]

// משכורות ותפעול שנתי - פסימי (עלויות +15%, עובדים נוספים, ללא הוזלה)
const operatingDataPessimistic = {
  year1: [
    { row: 1, item: 'מנכ"ל', monthly: '60,000', annual: '720,000', notes: '⚠️ שכר שוק גבוה יותר' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '40,000', annual: '480,000', notes: '' },
    { row: 4, item: 'BIM מהנדס', monthly: '30,000', annual: '360,000', notes: '⚠️ מומחיות נדרשת' },
    { row: 5, item: 'עובדי יצור', monthly: '84,000', annual: '1,008,000', notes: '⚠️ 6 עובדים (צריך יותר)' },
    { row: 6, item: 'מכירות ושיווק', monthly: '25,000', annual: '300,000', notes: '' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '12,000', annual: '144,000', notes: '⚠️ מורכבות גבוהה' },
    { row: 8, item: 'יועץ משפטי', monthly: '10,000', annual: '120,000', notes: '⚠️ רישוי ותקנים' },
    { row: 9, item: 'הובלות והתקנות', monthly: '35,000', annual: '420,000', notes: '⚠️ לוגיסטיקה מורכבת' },
    { row: 10, item: 'ייצור גלם', monthly: '301,000', annual: '3,618,000', notes: '9,240 מ"ר × 391₪ (+15%)' },
    { row: 11, item: 'הוצאות מפעל', monthly: '40,000', annual: '480,000', notes: '⚠️ חשמל יקר' },
    { row: 12, item: 'שכירות', monthly: '80,000', annual: '960,000', notes: '⚠️ אזור תעשייה יקר' },
    { row: 13, item: 'שונות ובלתי צפוי', monthly: '30,000', annual: '360,000', notes: '⚠️ רזרבה גדולה יותר' },
  ],
  year2: [
    { row: 1, item: 'מנכ"ל', monthly: '65,000', annual: '780,000', notes: '' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '40,000', annual: '480,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '45,000', annual: '540,000', notes: '' },
    { row: 4, item: 'BIM מהנדס', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 5, item: 'עובדי יצור', monthly: '154,000', annual: '1,848,000', notes: '⚠️ 11 עובדים' },
    { row: 6, item: 'מכירות ושיווק', monthly: '45,000', annual: '540,000', notes: '⚠️ שוק תחרותי' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '15,000', annual: '180,000', notes: '' },
    { row: 8, item: 'יועץ משפטי', monthly: '12,000', annual: '144,000', notes: '' },
    { row: 9, item: 'הובלות והתקנות', monthly: '65,000', annual: '780,000', notes: '' },
    { row: 10, item: 'ייצור גלם', monthly: '602,000', annual: '7,226,000', notes: '18,480 מ"ר × 391₪' },
    { row: 11, item: 'הוצאות מפעל', monthly: '55,000', annual: '660,000', notes: '' },
    { row: 12, item: 'שכירות', monthly: '90,000', annual: '1,080,000', notes: '⚠️ הרחבה' },
    { row: 13, item: 'שונות ובלתי צפוי', monthly: '35,000', annual: '420,000', notes: '' },
    { row: 14, item: 'הוזלת עלויות', monthly: '-', annual: '0', notes: '❌ לא מומשה' },
  ],
  year3: [
    { row: 1, item: 'מנכ"ל', monthly: '70,000', annual: '840,000', notes: '' },
    { row: 2, item: 'מנהל מפעל/יצור', monthly: '45,000', annual: '540,000', notes: '' },
    { row: 3, item: 'מנהל פיתוח עסקי', monthly: '50,000', annual: '600,000', notes: '' },
    { row: 4, item: 'BIM מהנדסים', monthly: '70,000', annual: '840,000', notes: '2 מהנדסים' },
    { row: 5, item: 'עובדי יצור', monthly: '224,000', annual: '2,688,000', notes: '⚠️ 16 עובדים' },
    { row: 6, item: 'מכירות ושיווק', monthly: '60,000', annual: '720,000', notes: '' },
    { row: 7, item: 'הנהלת חשבונות', monthly: '18,000', annual: '216,000', notes: '' },
    { row: 8, item: 'יועץ משפטי', monthly: '15,000', annual: '180,000', notes: '' },
    { row: 9, item: 'הובלות והתקנות', monthly: '90,000', annual: '1,080,000', notes: '' },
    { row: 10, item: 'ייצור גלם', monthly: '821,000', annual: '9,853,200', notes: '25,200 מ"ר × 391₪' },
    { row: 11, item: 'הוצאות מפעל', monthly: '70,000', annual: '840,000', notes: '' },
    { row: 12, item: 'שכירות', monthly: '100,000', annual: '1,200,000', notes: '' },
    { row: 13, item: 'שונות ובלתי צפוי', monthly: '40,000', annual: '480,000', notes: '' },
    { row: 14, item: 'הוזלת עלויות', monthly: '-', annual: '0', notes: '❌ לא מומשה' },
  ],
}

type SheetType = 'costs' | 'revenue' | 'investment' | 'operating1' | 'operating2' | 'operating3'

export function ExcelView() {
  const [activeSheet, setActiveSheet] = useState<SheetType>('costs')
  const [zoom, setZoom] = useState(100)
  const [mounted, setMounted] = useState(false)
  const [isPessimistic, setIsPessimistic] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // בחירת נתונים לפי מצב
  const unitCostData = isPessimistic ? unitCostDataPessimistic : unitCostDataOptimistic
  const revenueData = isPessimistic ? revenueDataPessimistic : revenueDataOptimistic
  const investmentData = isPessimistic ? investmentDataPessimistic : investmentDataOptimistic
  const operatingData = isPessimistic ? operatingDataPessimistic : operatingDataOptimistic

  const totalUnitCost = unitCostData.reduce((sum, row) => sum + parseInt(row.total.replace(',', '')), 0)
  const totalInvestment = investmentData.reduce((sum, row) => sum + parseInt(row.price.replace(/,/g, '')), 0)
  const totalProfit = revenueData.reduce((sum, row) => sum + parseInt(row.profit.replace(/,/g, '')), 0)

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
    <section className={`py-20 transition-all duration-500 ${
      isPessimistic
        ? 'bg-gradient-to-br from-red-50 via-white to-orange-50'
        : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
    }`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Badge variant={isPessimistic ? 'risk' : 'profit'} className="mb-4">
            <FileSpreadsheet className="w-3 h-3 ml-1" />
            {isPessimistic ? 'גיליון אקסל - ניתוח ביקורתי' : 'גיליון אקסל - נתוני המייסדים'}
          </Badge>
          <h2 className="text-4xl font-black text-navy-900 mb-4">
            {isPessimistic ? 'תחזית פסימית (ביקורתית)' : 'תחזית אופטימית (נתוני המייסדים)'}
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-8">
            {isPessimistic 
              ? 'ניתוח עם הנחות שמרניות: עיכוב 20% בייצור, עלויות גבוהות ב-15%, ללא הוזלת עלויות'
              : 'נתונים כפי שהוצגו על ידי המייסדים בתכנית העסקית המקורית'
            }
          </p>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center p-4 rounded-2xl bg-white shadow-xl">
              <Toggle
                checked={isPessimistic}
                onCheckedChange={setIsPessimistic}
                labelOptimistic="אקסל אופטימי 📈"
                labelPessimistic="אקסל פסימי 🔍"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={`px-4 py-2 rounded-xl ${isPessimistic ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <span className="font-bold">רווח כולל (3 שנים):</span> {totalProfit.toLocaleString()} ₪
            </div>
            <div className={`px-4 py-2 rounded-xl ${isPessimistic ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
              <span className="font-bold">השקעה נדרשת:</span> {totalInvestment.toLocaleString()} ₪
            </div>
            <div className={`px-4 py-2 rounded-xl ${isPessimistic ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              <span className="font-bold">עלות גלם/יחידה:</span> {totalUnitCost.toLocaleString()} ₪
            </div>
          </div>
        </div>

        {/* Excel Container */}
        <div className="max-w-6xl mx-auto">
          {/* Excel Toolbar */}
          <div className={`rounded-t-lg px-4 py-2 flex items-center justify-between ${
            isPessimistic ? 'bg-red-700' : 'bg-[#217346]'
          }`}>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                {isPessimistic ? 'פרויקט_דוד_ביקורת.xlsx' : 'פרויקט_דוד_תכנית_עסקית.xlsx'}
              </span>
              {isPessimistic && (
                <Badge variant="risk" className="text-xs bg-white/20 text-white border-white/30">
                  <AlertTriangle className="w-3 h-3 ml-1" />
                  ביקורתי
                </Badge>
              )}
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
          <div className="bg-[#f3f3f3] border-b border-gray-300 px-2 py-1 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveSheet('costs')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'costs'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              עלות ליחידה
            </button>
            <button
              onClick={() => setActiveSheet('revenue')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'revenue'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              תחזית הכנסות
            </button>
            <button
              onClick={() => setActiveSheet('investment')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'investment'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              השקעת הקמה
            </button>
            <button
              onClick={() => setActiveSheet('operating1')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'operating1'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              שנה א&apos; (55 יח&apos;)
            </button>
            <button
              onClick={() => setActiveSheet('operating2')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'operating2'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              שנה ב&apos; (110 יח&apos;)
            </button>
            <button
              onClick={() => setActiveSheet('operating3')}
              className={`px-3 py-1.5 text-xs rounded-t border border-b-0 transition-colors whitespace-nowrap ${
                activeSheet === 'operating3'
                  ? 'bg-white border-gray-300 font-semibold'
                  : 'bg-gray-200 border-transparent hover:bg-gray-100'
              }`}
            >
              שנה ג&apos; (150 יח&apos;)
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
                    <tr className={isPessimistic ? 'bg-red-600 text-white' : 'bg-[#4472C4] text-white'}>
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
                          isPessimistic ? 'text-red-600' : ''
                        }`}>
                          {row.total} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-sm ${
                          row.notes.includes('⚠️') ? 'text-red-600 font-medium' : 'text-gray-600'
                        }`}>{row.notes}</td>
                      </tr>
                    ))}
                    <tr className={isPessimistic ? 'bg-red-600 text-white font-bold' : 'bg-[#4472C4] text-white font-bold'}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {unitCostData.length + 2}
                      </td>
                      <td className="border border-[#2f5496] p-2"></td>
                      <td className="border border-[#2f5496] p-2" colSpan={3}>
                        סה&quot;כ עלות יחידה (54 מ&quot;ר)
                      </td>
                      <td className="border border-[#2f5496] p-2 text-center font-mono text-lg">
                        {totalUnitCost.toLocaleString()} ₪
                      </td>
                      <td className="border border-[#2f5496] p-2 text-sm">
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
                    <tr className="bg-[#f8f9fa]">
                      <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs"></th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">A</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">B</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">C</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">D</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">E</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">F</th>
                      <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">G</th>
                      {isPessimistic && <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">H</th>}
                    </tr>
                    <tr className={isPessimistic ? 'bg-red-600 text-white' : 'bg-[#70AD47] text-white'}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
                      <td className="border border-[#507e32] p-2 font-bold">תקופה</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">מ&quot;ר שנתי</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">מחיר למ&quot;ר</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">הכנסות</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">עלויות</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">רווח נקי</td>
                      <td className="border border-[#507e32] p-2 font-bold text-center">רווחיות</td>
                      {isPessimistic && <td className="border border-[#507e32] p-2 font-bold text-center">הערה</td>}
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
                        <td className="border border-gray-200 p-2 text-center font-mono">{row.sqm}</td>
                        <td className="border border-gray-200 p-2 text-center font-mono">{row.pricePerSqm} ₪</td>
                        <td className="border border-gray-200 p-2 text-center font-mono font-semibold text-blue-600">
                          {parseInt(row.revenue).toLocaleString()} ₪
                        </td>
                        <td className="border border-gray-200 p-2 text-center font-mono text-red-600">
                          {parseInt(row.costs).toLocaleString()} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-center font-mono font-bold ${
                          isPessimistic ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {parseInt(row.profit).toLocaleString()} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-center font-bold ${
                          isPessimistic ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {row.margin}
                        </td>
                        {isPessimistic && 'note' in row && (
                          <td className="border border-gray-200 p-2 text-sm text-red-600 font-medium">
                            {(row as typeof row & {note: string}).note}
                          </td>
                        )}
                      </tr>
                    ))}
                    <tr className={isPessimistic ? 'bg-red-600 text-white font-bold' : 'bg-[#70AD47] text-white font-bold'}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">5</td>
                      <td className="border border-[#507e32] p-2" colSpan={5}>
                        סה&quot;כ רווח מצטבר (3 שנים)
                      </td>
                      <td className="border border-[#507e32] p-2 text-center font-mono text-lg">
                        {totalProfit.toLocaleString()} ₪
                      </td>
                      <td className="border border-[#507e32] p-2"></td>
                      {isPessimistic && <td className="border border-[#507e32] p-2"></td>}
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
                    <tr className={isPessimistic ? 'bg-red-600 text-white' : 'bg-[#ED7D31] text-white'}>
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
                        <td className={`border border-gray-200 p-2 text-center font-mono font-semibold ${
                          isPessimistic ? 'text-red-600' : ''
                        }`}>
                          {parseInt(row.price.replace(/,/g, '')).toLocaleString()} ₪
                        </td>
                        <td className={`border border-gray-200 p-2 text-sm ${
                          row.notes.includes('⚠️') ? 'text-red-600 font-medium' : 'text-gray-600'
                        }`}>{row.notes}</td>
                      </tr>
                    ))}
                    <tr className={isPessimistic ? 'bg-red-600 text-white font-bold' : 'bg-[#ED7D31] text-white font-bold'}>
                      <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                        {investmentData.length + 2}
                      </td>
                      <td className="border border-[#c65911] p-2"></td>
                      <td className="border border-[#c65911] p-2">
                        סה&quot;כ השקעת הקמה
                      </td>
                      <td className="border border-[#c65911] p-2 text-center font-mono text-lg">
                        {totalInvestment.toLocaleString()} ₪
                      </td>
                      <td className="border border-[#c65911] p-2 text-sm">
                        =SUM(C2:C{investmentData.length + 1})
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* Operating Year 1 Sheet */}
              {activeSheet === 'operating1' && (
                <OperatingTable 
                  data={operatingData.year1}
                  year="שנה א' - ייצור 55 יחידות (11,550 מ״ר)"
                  isPessimistic={isPessimistic}
                  sqmTarget={isPessimistic ? 9240 : 11550}
                />
              )}

              {/* Operating Year 2 Sheet */}
              {activeSheet === 'operating2' && (
                <OperatingTable 
                  data={operatingData.year2}
                  year="שנה ב' - ייצור 110 יחידות (23,100 מ״ר)"
                  isPessimistic={isPessimistic}
                  sqmTarget={isPessimistic ? 18480 : 23100}
                />
              )}

              {/* Operating Year 3 Sheet */}
              {activeSheet === 'operating3' && (
                <OperatingTable 
                  data={operatingData.year3}
                  year="שנה ג' - ייצור 150 יחידות (31,500 מ״ר)"
                  isPessimistic={isPessimistic}
                  sqmTarget={isPessimistic ? 25200 : 31500}
                />
              )}
            </div>
          </div>

          {/* Excel Status Bar */}
          <div className={`px-4 py-1 flex items-center justify-between text-white text-xs rounded-b-lg ${
            isPessimistic ? 'bg-red-700' : 'bg-[#217346]'
          }`}>
            <div className="flex items-center gap-4">
              <span>מוכן</span>
              {isPessimistic && (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  מצב ביקורתי
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>סה&quot;כ רווח: {totalProfit.toLocaleString()} ₪</span>
              <span>השקעה: {totalInvestment.toLocaleString()} ₪</span>
            </div>
          </div>

          {/* Legend/Notes */}
          <div className="mt-6 max-w-4xl mx-auto">
            {isPessimistic ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-800 mb-2">הנחות הניתוח הפסימי:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• <strong>עיכוב בייצור:</strong> 20% פחות מ&quot;ר מהתכנית</li>
                      <li>• <strong>עלויות גבוהות:</strong> +15% בעלויות גלם ותפעול</li>
                      <li>• <strong>ללא הוזלת עלויות:</strong> ההנחה של 20% הוזלה בשנים ב&apos;-ג&apos; לא מומשה</li>
                      <li>• <strong>עובדים נוספים:</strong> צוות גדול יותר לייצור אותה תפוקה</li>
                      <li>• <strong>השקעה גבוהה:</strong> חריגות בעלויות הקמה ועיכובים</li>
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
                      <li>• <strong>הוזלת עלויות:</strong> 20% בשנים ב&apos;-ג&apos; (יעילות גודל)</li>
                      <li>• <strong>קצב ייצור:</strong> 55 יח&apos; → 110 יח&apos; → 150 יח&apos;</li>
                      <li>• <strong>השקעה כוללת:</strong> ~8.15M₪ (הקמה + שנת פעילות ראשונה)</li>
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

// Component for Operating Tables
interface OperatingRow {
  row: number
  item: string
  monthly: string
  annual: string
  notes: string
}

interface OperatingTableProps {
  data: OperatingRow[]
  year: string
  isPessimistic: boolean
  sqmTarget: number
}

function OperatingTable({ data, year, isPessimistic, sqmTarget }: OperatingTableProps) {
  const totalAnnual = data.reduce((sum, row) => {
    const val = parseInt(row.annual.replace(/,/g, '').replace('-', ''))
    return row.annual.startsWith('-') ? sum - val : sum + val
  }, 0)

  return (
    <table className="w-full border-collapse min-w-[700px]">
      <thead>
        <tr className="bg-[#f8f9fa]">
          <th className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs"></th>
          <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">A</th>
          <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">B</th>
          <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">C</th>
          <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">D</th>
          <th className="bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs font-normal">E</th>
        </tr>
        <tr className={isPessimistic ? 'bg-red-600 text-white' : 'bg-[#5B9BD5] text-white'}>
          <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">1</td>
          <td className="border p-2 font-bold text-center" colSpan={4}>
            {year} {isPessimistic ? `(מתוקן: ${sqmTarget.toLocaleString()} מ״ר)` : ''}
          </td>
          <td className="border p-2 font-bold text-center text-xs">הערות</td>
        </tr>
        <tr className={isPessimistic ? 'bg-red-500 text-white' : 'bg-[#4A89C8] text-white'}>
          <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">2</td>
          <td className="border p-2 font-bold">#</td>
          <td className="border p-2 font-bold">פריט</td>
          <td className="border p-2 font-bold text-center">חודשי ₪</td>
          <td className="border p-2 font-bold text-center">שנתי ₪</td>
          <td className="border p-2 font-bold"></td>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const isNegative = row.annual.startsWith('-')
          return (
            <tr 
              key={row.row}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'} hover:bg-blue-50 transition-colors`}
            >
              <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
                {row.row + 2}
              </td>
              <td className="border border-gray-200 p-2 text-center text-gray-600">{row.row}</td>
              <td className="border border-gray-200 p-2 font-medium">{row.item}</td>
              <td className="border border-gray-200 p-2 text-center font-mono">{row.monthly}</td>
              <td className={`border border-gray-200 p-2 text-center font-mono font-semibold ${
                isNegative ? 'text-green-600' : isPessimistic ? 'text-red-600' : ''
              }`}>
                {row.annual} ₪
              </td>
              <td className={`border border-gray-200 p-2 text-sm ${
                row.notes.includes('⚠️') || row.notes.includes('❌') ? 'text-red-600 font-medium' : 'text-gray-600'
              }`}>{row.notes}</td>
            </tr>
          )
        })}
        <tr className={isPessimistic ? 'bg-red-600 text-white font-bold' : 'bg-[#5B9BD5] text-white font-bold'}>
          <td className="w-10 bg-[#f0f0f0] border border-gray-300 p-1 text-center text-gray-500 text-xs">
            {data.length + 3}
          </td>
          <td className="border p-2"></td>
          <td className="border p-2" colSpan={2}>
            סה&quot;כ עלויות שנתיות
          </td>
          <td className="border p-2 text-center font-mono text-lg">
            {totalAnnual.toLocaleString()} ₪
          </td>
          <td className="border p-2"></td>
        </tr>
      </tbody>
    </table>
  )
}
