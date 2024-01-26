import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@hyperlocal/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyperlocal',
  description: 'An open source community engagement platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}