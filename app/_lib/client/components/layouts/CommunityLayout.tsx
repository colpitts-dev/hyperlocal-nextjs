'use client'

import { useState, useEffect } from 'react'
import Loader from '@hyperlocal/ui/components/Loader'
import { createGlobalStyle } from 'styled-components'

import Sidebar from '@hyperlocal/ui/components/Sidebar'
import Header from '@hyperlocal/ui/components/Header'

export interface DashboardLayoutProps {
  children: React.ReactNode
  theme: {
    ui: {
      light: string
      dark: string
    }
    light: {
      primary: string
      secondary: string
      tertiary: string
    }
    dark: {
      primary: string
    }
  }
}

export const CommunityLayout: React.FC<DashboardLayoutProps> = ({
  children,
  theme,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${theme?.light?.primary};
    --color-secondary: ${theme?.light?.secondary};
    --color-tertiary: ${theme?.light?.tertiary};
  }
`

  return (
    <>
      <GlobalStyle />

      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        )}
      </div>
    </>
  )
}
