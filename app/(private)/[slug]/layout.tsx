import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ThemeProvider } from 'styled-components'
import { auth } from '@hyperlocal/server/auth'
import * as communitiesService from '@hyperlocal/services/communities.service'
import { CommunityTheme } from '@hyperlocal/types/Community'
import { CommunityLayout } from '@hyperlocal/ui/components/Layouts/CommunityLayout'

export const metadata: Metadata = {
  title: 'Hyperlocal | Community Engagement',
  description: 'An open source community engagement platform',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  let communityTheme: CommunityTheme | null = null

  // redirect to login if not authorized
  const redirectToLogin = () => {
    const redirectUrl = encodeURIComponent(`/${params.slug}`)
    redirect(`/account/login?redirectUrl=${redirectUrl}`)
  }

  // if logged in check membership
  if (auth.isAuthenticated()) {
    // get JWT claims and audience
    const claims = auth.getClaims()
    const aud = claims.aud || []

    // get community
    const community = await communitiesService.getBySlug(params.slug)
    communityTheme = community?.theme

    // check membership
    const isMember = aud.filter(a => a.includes(community?._id)).length > 0
    if (!isMember) {
      // boot them out
      redirectToLogin()
    }
  } else {
    redirectToLogin()
  }

  return <CommunityLayout theme={communityTheme}>{children}</CommunityLayout>
}
