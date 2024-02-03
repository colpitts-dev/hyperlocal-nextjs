import React from 'react'
import { Metadata } from 'next'
import { LoginForm } from '@hyperlocal/_lib/client/components/LoginForm'

export const metadata: Metadata = {
  title: 'hyperlocal | Welcome back!',
  description: 'Sign in to your hyperlocal account',
  // other metadata
}

const SignIn: React.FC = () => {
  return (
    <>
      <div className="text-black dark:text-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:w-1/2 xl:mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">hyperlocal.box</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Welcome back!
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
