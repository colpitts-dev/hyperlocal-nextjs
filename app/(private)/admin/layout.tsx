import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { SidebarLayout } from '@hyperlocal/ui/components/layouts/SibebarLayout'
import { auth } from '@hyperlocal/server/auth'
import './styles.css'

export const metadata: Metadata = {
  title: 'Hyperlocal | Public Landing',
  description: 'An open source community engagement platform',
}

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
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  )
}
