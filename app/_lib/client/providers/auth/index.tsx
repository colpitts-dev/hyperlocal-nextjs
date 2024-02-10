'use client'
import * as React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  useAccount,
  useDisconnect,
  useConnectorClient,
  useSignMessage,
} from 'wagmi'
import { SiweMessage } from 'siwe'

export interface Account {
  name: string
}

interface AuthContextProps {
  account: Account | null
  login: (email: string, password: string) => Promise<void>
  loginMetaMask: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
  account: null,
  login: async () => {},
  loginMetaMask: async () => {},
  logout: async () => {},
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const connection = useConnectorClient()
  const { disconnect } = useDisconnect()
  const { isConnected, address, chain } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [hasAccount, setHasAccount] = React.useState<boolean>(false)
  const [currentAccount, setCurrentAccount] = React.useState<Account | null>(
    null,
  )

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch('/api/v1/account/check', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      })
      const data = await response.json()
      console.log('HAS ACCOUNT: ', data?.ok)
      setHasAccount(data?.ok || false)
    }
    if (isConnected && !currentAccount) {
      fetchAccount()
    }
  }, [isConnected, address, currentAccount])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    account: currentAccount,
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
          const redirectUrl = decodeURIComponent(
            searchParams?.get('redirectUrl') || '/',
          )
          //window.location.href = redirectUrl

          Promise.resolve(redirectUrl)
        } else {
          Promise.reject('Error logging in')
        }
      } catch (e) {
        console.error(e)
        Promise.reject('Error logging in')
      }
    },
    loginMetaMask: async () => {
      console.log('-- loginMetaMask --')
      const chainId = chain?.id

      const nonceRes = await fetch('/api/v1/account/wallet')
      const nonce = await nonceRes.json()
      console.log('crypto.nonce', nonce)

      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to hyperlocal.box.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // Login with signature
      const verifyRes = await fetch('/api/v1/account/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying sign in message')
      const redirectUrl = decodeURIComponent(
        searchParams?.get('redirectUrl') || '/',
      )
      Promise.resolve(redirectUrl)
      window.location.href = redirectUrl
    },
    logout: async () => {
      console.log('LOGOUT')
      const conn = await disconnect()
      console.log('DISCONNECTED: ', conn)

      await fetch('/api/v1/account/logout', {
        method: 'POST',
      })
      //this will reload the page without doing SSR
      //router.refresh()
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
