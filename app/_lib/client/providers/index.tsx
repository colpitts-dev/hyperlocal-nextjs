'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider } from 'wagmi'
import StyledComponentsRegistry from '@hyperlocal/ui/helpers/registry'
import { AuthProvider } from './auth'
import { config } from './wagmi/config'

const queryClient = new QueryClient()

export const AppProviders = ({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState: State
}) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
