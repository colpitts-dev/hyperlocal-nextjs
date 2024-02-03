import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@hyperlocal/server/auth'

import '@hyperlocal/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyperlocal | Members Dashboard',
  description: 'An open source community engagement platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // if not logged in redirect to login page
  if (!auth.isAuthenticated()) {
    const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/')
    redirect(`/account/login?returnUrl=${returnUrl}`)
  }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
