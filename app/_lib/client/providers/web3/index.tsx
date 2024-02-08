'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Contract, BrowserProvider } from 'ethers'

export interface Web3ProviderProps {
  ethereum: MetaMaskInpageProvider | null
  provider: BrowserProvider | null
  contract: Contract | null
}

export interface Web3State extends Web3ProviderProps {
  isLoading: boolean
}

const initialWeb3State: Web3State = {
  ethereum: null,
  provider: null,
  contract: null,
  isLoading: true,
}

const Web3Context = createContext<Web3State>(initialWeb3State)

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(initialWeb3State)

  useEffect(() => {
    function initWeb3() {
      const provider = new BrowserProvider(window.ethereum)

      setWeb3Api({
        ethereum: window.ethereum,
        provider,
        contract: null,
        isLoading: false,
      })
    }

    initWeb3()
  }, [])

  return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

export default Web3Provider
