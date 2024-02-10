import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminLayout } from '@hyperlocal/_lib/client/components/layouts/AdminLayout'
import { auth } from '@hyperlocal/server/auth'

export const metadata: Metadata = {
  title: 'Hyperlocal | Admin Dashboard',
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

  return <AdminLayout>{children}</AdminLayout>
}
