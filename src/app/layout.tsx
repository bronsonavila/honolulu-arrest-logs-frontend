import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.honoluluarrestlogs.com'),
  title: 'Honolulu Arrest Logs',
  description: 'Recent arrest records from the Honolulu Police Department',
  openGraph: {
    title: 'Honolulu Arrest Logs',
    description: 'Recent arrest records from the Honolulu Police Department',
    siteName: 'Honolulu Arrest Logs',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honolulu Arrest Logs',
    description: 'Recent arrest records from the Honolulu Police Department'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: '/'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
