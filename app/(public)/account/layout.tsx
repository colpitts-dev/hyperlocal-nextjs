import { redirect } from 'next/navigation'

import { auth } from '@hyperlocal/server/auth'

export default Layout

function Layout({ children }: { children: React.ReactNode }) {
  // if logged in redirect to home page
  if (auth.isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
