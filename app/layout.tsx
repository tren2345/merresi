import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerifDisplay = DM_Serif_Display({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-dm-serif" 
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: 'Meresimplicity - Venture Studio & Digital Engineering Firm',
  description: 'We engineer growth, we don\'t just design it. Eliminate business friction through IE principles and Python automation. Technical excellence, simplified.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${dmSans.variable} ${dmSerifDisplay.variable} ${caveat.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
