import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface Account {
  nickname: string
  email: string
  email_verified: boolean
  wallet?: string
}

export function useAccount() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)

  return {
    currentAccount,
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
          const data = await res.json()
          console.log({ data })
          setCurrentAccount({ ...data })
          const redirectUrl = searchParams.get('redirectUrl') || '/'
          console.log({ redirectUrl })
          router.push(redirectUrl)
          return
        }
      } catch (e) {
        console.error(e)
      }
    },
    logout: async () => {
      await fetch('/api/v1/account/logout', {
        method: 'POST',
      })
      //this will reload the page without doing SSR
      router.refresh()
    },
  }
}
