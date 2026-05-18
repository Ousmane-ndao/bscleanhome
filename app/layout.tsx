import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: {
    default: 'BS Consulting',
    template: '%s | BS Consulting',
  },
  description:
    "Lavage auto, nettoyage canapé, tapis, matelas, blanchisserie et entretien pro à Dakar. Distributeur Meguiar's, devis et formation detailing.",
  applicationName: 'BS Consulting',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-bs-consulting-transparent.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth bg-background">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
