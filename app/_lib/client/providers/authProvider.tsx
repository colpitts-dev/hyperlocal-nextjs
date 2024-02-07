'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Account } from '../hooks/useAccount'
import { useEffect } from 'react'

interface AuthContextProps {
  account: Account | null
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
  account: null,
  logout: async () => {},
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentAccount, setCurrentAccount] = React.useState<Account | null>(
    null,
  )

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch('/api/v1/account/me')
      const data = await response.json()
      setCurrentAccount(data)
    }

    fetchAccount()
  }, [])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    account: currentAccount,
    logout: async () => {
      console.log('LOGOUT')
      await fetch('/api/v1/account/logout', {
        method: 'POST',
      })
      //this will reload the page without doing SSR
      router.refresh()
    },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
