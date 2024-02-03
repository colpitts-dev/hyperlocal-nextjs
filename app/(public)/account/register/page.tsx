import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Metadata } from 'next'
import { RegisterForm } from '@hyperlocal/_lib/client/components/RegisterForm'
export const metadata: Metadata = {
  title: 'Signup Page | Next.js E-commerce Dashboard Template',
  description: 'This is Signup page for TailAdmin Next.js',
  // other metadata
}

const SignUp: React.FC = () => {
  return (
    <>
      <div className="text-black dark:text-white rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:w-1/2 xl:mx-auto">
        <div className="w-full border-stroke dark:border-strokedark">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">
              Welcome to hyperlocal.box
            </span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Create account
            </h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
