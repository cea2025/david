import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'פרויקט דוד | דשבורד משקיעים - מהפכת בניית ה-LGS',
  description: 'ניתוח השקעה אסטרטגי: ייצור היי-טק פוגש את משבר הדיור. סקירת פיננסים מקיפה לפרויקט דוד.',
  keywords: 'LGS, בנייה קלה, מפעל, השקעה, נדל"ן, פרויקט דוד, דיור',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
