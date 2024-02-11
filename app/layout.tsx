import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { State, cookieToInitialState } from 'wagmi'
import { AppProviders } from '@hyperlocal/ui/providers'
import { config } from '@hyperlocal/ui/providers/wagmi/config'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState =
    cookieToInitialState(config, headers().get('cookie')) || {}
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders initialState={initialState as State}>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
