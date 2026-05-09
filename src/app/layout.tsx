import type { Metadata } from 'next'
import { Cormorant, DM_Mono, Kalam } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const hand = Kalam({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Club Schorle — München',
  description: 'A quiet typographic installation — forthcoming.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmMono.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  )
}
