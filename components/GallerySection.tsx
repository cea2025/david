'use client'

import React from 'react'
import { Image as ImageIcon, FileText, Play, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const galleryItems = [
  {
    type: 'machine',
    title: 'מכונת Howick FRAMA',
    description: 'מכונה אוטומטית לייצור פרופילי LGS',
    image: 'https://images.unsplash.com/photo-1664448007548-7098a584852d?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'machine',
    title: 'קו ייצור מלא',
    description: 'תהליך הייצור האוטומטי במפעל',
    image: 'https://images.unsplash.com/photo-1565514020176-db7112dc8d67?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'house',
    title: 'מבנה LGS מוכן',
    description: 'יחידת דיור מושלמת - 54 מ"ר',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'house',
    title: 'פנים המבנה',
    description: 'גימור פנימי איכותי',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'construction',
    title: 'תהליך הרכבה',
    description: 'הרכבת השלד באתר הבנייה',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'construction',
    title: 'שלד LGS',
    description: 'מבנה הפלדה לפני גימור',
    image: 'https://images.unsplash.com/photo-1590082726359-3d18e2003c26?auto=format&fit=crop&q=80&w=400',
  },
]

export function GallerySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-white/30 text-white">
            <ImageIcon className="w-3 h-3 ml-1" />
            מצגת וגלריה
          </Badge>
          <h2 className="text-4xl font-black text-white mb-4">
            מסמכים וחומרים ויזואליים
          </h2>
          <p className="text-lg text-navy-200 max-w-2xl mx-auto">
            צפה במצגת המשקיעים ובתמונות מהמפעל והפרויקטים
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Presentation Viewer Placeholder */}
          <Card variant="glass" className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                מצגת המשקיעים
              </CardTitle>
              <CardDescription className="text-navy-300">
                צפה במצגת המלאה של הפרויקט
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/10] bg-navy-800/50 rounded-xl border border-white/10 flex flex-col items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-10 h-10 text-white mr-[-4px]" />
                </div>
                <p className="text-navy-300 font-medium">לחץ להפעלת המצגת</p>
                <p className="text-sm text-navy-400 mt-1">42 שקופיות</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                  <FileText className="w-4 h-4 ml-2" />
                  הורד PDF
                </Button>
                <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  פתח בחלון חדש
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card variant="glass" className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                מסמכים נוספים
              </CardTitle>
              <CardDescription className="text-navy-300">
                קבצים ומסמכים להורדה
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'תכנית עסקית מלאה', type: 'PDF', size: '2.4 MB' },
                { name: 'ניתוח פיננסי - Excel', type: 'XLSX', size: '1.1 MB' },
                { name: 'מפרט טכני LGS', type: 'PDF', size: '856 KB' },
                { name: 'תעודות תקן ישראלי', type: 'PDF', size: '1.8 MB' },
                { name: 'הסכם שיתוף פעולה', type: 'DOCX', size: '324 KB' },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-navy-400">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    הורד
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Image Gallery */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            גלריית תמונות
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.title}
                className="group relative aspect-square bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-sm font-medium text-white mb-1">{item.title}</p>
                  <p className="text-xs text-navy-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

