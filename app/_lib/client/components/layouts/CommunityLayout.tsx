'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ThemeProvider } from 'styled-components'
import Loader from '@hyperlocal/ui/components/Loader'
//import Sidebar from '@hyperlocal/ui/components/Sidebar'
import Header from '@hyperlocal/ui/components/Header'
import { CommunityTheme } from '@hyperlocal/types/Community'
import GlobalStyle from './GlobalStyle'
export interface CommunityLayoutProps {
  children: React.ReactNode
  theme?: CommunityTheme | null
}

export const CommunityLayout: React.FC<CommunityLayoutProps> = ({
  children,
  theme,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <ThemeProvider theme={theme!}>
      {/* <!-- Apply Global Theme --> */}
      <GlobalStyle />
      {/* <!-- Layout Start --> */}
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
            {/* <!-- Content Area Start --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
            {/* <!-- Content Area End --> */}
          </div>
        )}
      </div>
      {/* <!-- Layout End --> */}
    </ThemeProvider>
  )
}
