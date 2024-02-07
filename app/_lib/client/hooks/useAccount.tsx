import { useRouter, useSearchParams } from 'next/navigation'

export interface Account {
  name: string
  email: string
  email_verified?: boolean
  wallet?: string
}

export function useAccount() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return {
    login: async (email: string, password: string) => {
      try {
        const res = await fetch('/api/v1/account/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        if (res.ok) {
          const redirectUrl = searchParams.get('redirectUrl') || '/'
          router.push(redirectUrl)
        }
      } catch (e) {
        console.error(e)
      }
    },
    logout: async () => {
      console.log('LOGOUT')
      await fetch('/api/v1/account/logout', {
        method: 'POST',
      })
      //this will reload the page without doing SSR
      router.refresh()
    },
  }
}
