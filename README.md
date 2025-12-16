# 🏗️ פרויקט דוד - דשבורד משקיעים

דשבורד אינטראקטיבי לניתוח השקעה בפרויקט מפעל בנייה בטכנולוגיית LGS (Light Gauge Steel).

![Project David Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📋 תיאור

דשבורד מקיף המציג ניתוח השקעה "דו-מציאותי" - המאפשר למשקיע לראות הן את התחזית האופטימית של היזם והן את הניתוח הריאליסטי של האנליסט.

### תכונות עיקריות

- 🔄 **דשבורד כפול** - מעבר בין תצוגה אופטימית לריאליסטית
- 📊 **גרפים אינטראקטיביים** - תחזית הכנסות, רווחים ותפוקה
- 📋 **טבלת עלויות השוואתית** - עם הדגשת שגיאות קריטיות
- 🏭 **סקירת טכנולוגיית LGS** - יתרונות ותמריצים ממשלתיים
- 📁 **גלריה ומסמכים** - תמונות ומצגות
- ✅ **המלצות יועץ** - חוות דעת סופית

## 🚀 התקנה והפעלה

```bash
# Clone the repository
git clone https://github.com/cea2025/david.git
cd david

# Install dependencies
npm install

# Run development server
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000) בדפדפן.

## 🛠️ טכנולוגיות

- **Next.js 14** - App Router
- **Tailwind CSS** - עיצוב מודרני
- **Recharts** - גרפים אינטראקטיביים
- **Lucide React** - אייקונים
- **TypeScript** - Type safety

## 📁 מבנה הפרויקט

```
├── app/
│   ├── globals.css      # סטיילים גלובליים
│   ├── layout.tsx       # Layout ראשי
│   └── page.tsx         # עמוד ראשי
├── components/
│   ├── ui/              # קומפוננטות UI בסיסיות
│   ├── HeroSection.tsx
│   ├── DualDashboard.tsx
│   ├── FinancialTable.tsx
│   ├── SectorOverview.tsx
│   ├── GallerySection.tsx
│   ├── RecommendationsSection.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts         # פונקציות עזר
```

## 📊 נתונים פיננסיים

### תכנית עסקית (אופטימי)
- הכנסה שנה 3: ₪44,100,000
- רווח נקי שנה 3: ₪22,543,200
- עלות יחידה: ~₪18,360

### ניתוח ריאלי (פסימי)
- עלות יחידה מתוקנת: ~₪45,000
- שגיאות קריטיות זוהו בחישובים

## 🎨 עיצוב

- **צבעים**: Navy Blue (אמון), ירוק (רווח), אדום (סיכון)
- **רספונסיבי**: מותאם למובייל ודסקטופ
- **RTL**: תמיכה מלאה בעברית

## 📄 רישיון

MIT License

---

נבנה עם ❤️ לפרויקט דוד
