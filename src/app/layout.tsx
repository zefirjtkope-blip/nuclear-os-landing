import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Nuclear OS — Операційна система для вашого бізнесу',
  description:
    'Каса · Склад · Персонал · AI-аналітика. Всё что нужно — в одном окне.',
  openGraph: {
    title: 'Nuclear OS',
    description: 'POS-система нового покоління з AI-асистентом',
    siteName: 'nuclear-os.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${inter.className} bg-[#060809] antialiased`}>
        {children}
      </body>
    </html>
  )
}
