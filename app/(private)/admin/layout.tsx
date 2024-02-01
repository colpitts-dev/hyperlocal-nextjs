import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@hyperlocal/ui/components/Dashboard/Layout.component'
import { auth } from '@hyperlocal/server/auth'
import './styles.css'

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
      <body suppressHydrationWarning={true}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
