import { redirect } from 'next/navigation'
import { DashboardLayout } from '@hyperlocal/ui/components/Dashboard/Layout.component'
import { auth } from '@hyperlocal/server/auth'
import './styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // redirect to login if not authorized
  const redirectToLogin = () => {
    const redirectUrl = encodeURIComponent('/admin')
    redirect(`/account/login?redirectUrl=${redirectUrl}`)
  }

  // if logged in check audience claims
  if (auth.isAuthenticated()) {
    const claims = auth.getClaims()
    const aud = claims.aud || []

    const isAdmin =
      aud.filter(membership => membership.includes('admin')).length > 0

    if (!isAdmin) {
      redirectToLogin()
    }
  } else {
    redirectToLogin()
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
