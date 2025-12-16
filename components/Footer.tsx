'use client'

import React from 'react'
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-profit-light/20">
                <Building2 className="w-8 h-8 text-profit-light" />
              </div>
              <div>
                <h3 className="text-2xl font-black">פרויקט דוד</h3>
                <p className="text-sm text-navy-400">LGS Construction Factory</p>
              </div>
            </div>
            <p className="text-navy-300 mb-6 max-w-md">
              מהפכת הבנייה בישראל - ייצור מתקדם של יחידות דיור בטכנולוגיית 
              Light Gauge Steel. מהמפעל ועד למפתח תוך 6 חודשים בלבד.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">ניווט מהיר</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-navy-300 hover:text-white transition-colors">
                  מידע פיננסי
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-300 hover:text-white transition-colors">
                  ניתוח סיכונים
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-300 hover:text-white transition-colors">
                  סקירת מאקרו
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-300 hover:text-white transition-colors">
                  גלריה
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-300 hover:text-white transition-colors">
                  צור קשר
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">יצירת קשר</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-navy-400" />
                <a
                  href="mailto:invest@projectdavid.co.il"
                  className="text-navy-300 hover:text-white transition-colors"
                >
                  invest@projectdavid.co.il
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-navy-400" />
                <a
                  href="tel:+972-3-123-4567"
                  className="text-navy-300 hover:text-white transition-colors"
                >
                  03-123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-navy-400 mt-0.5" />
                <span className="text-navy-300">
                  אזור התעשייה, ישראל
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navy-400">
              © 2024 פרויקט דוד. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-navy-400 hover:text-white transition-colors">
                תנאי שימוש
              </a>
              <a href="#" className="text-sm text-navy-400 hover:text-white transition-colors">
                מדיניות פרטיות
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-navy-900/50 border border-navy-800">
          <p className="text-xs text-navy-400 text-center">
            <strong className="text-navy-300">הצהרה משפטית:</strong> המידע באתר זה מוצג למטרות 
            אינפורמטיביות בלבד ואינו מהווה ייעוץ השקעות, ייעוץ פיננסי או המלצה להשקעה. 
            על המשקיע לבצע בדיקת נאותות עצמאית ולהתייעץ עם גורמים מקצועיים לפני קבלת החלטות השקעה.
          </p>
        </div>
      </div>
    </footer>
  )
}

