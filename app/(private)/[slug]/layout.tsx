import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { CommunityLayout } from '@hyperlocal/ui/components/layouts/CommunityLayout'
import { auth } from '@hyperlocal/server/auth'
import * as communitiesService from '@hyperlocal/services/communities.service'
import StyledComponentsRegistry from '@hyperlocal/_lib/client/helpers/registry'
import './styles.css'
import { AuthProvider } from '@hyperlocal/ui/providers/authProvider'

export const metadata: Metadata = {
  title: 'Hyperlocal | Community Landing',
  description: 'An open source community engagement platform',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  // redirect to login if not authorized
  const redirectToLogin = () => {
    const redirectUrl = encodeURIComponent(`/${params.slug}`)
    redirect(`/account/login?redirectUrl=${redirectUrl}`)
  }

  // if logged in check audience claims
  if (auth.isAuthenticated()) {
    const claims = auth.getClaims()
    const aud = claims.aud || []

    // get community
    const community = await communitiesService.getBySlug(params.slug)
    const isMember = aud.filter(a => a.includes(community?._id)).length > 0

    if (!isMember) {
      redirectToLogin()
    }
  } else {
    redirectToLogin()
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <AuthProvider>{children}</AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
