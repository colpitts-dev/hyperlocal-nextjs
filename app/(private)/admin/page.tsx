'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-4xl font-bold mt-4 mb-24">Admin Dashboard</h1>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4">
        <Link
          href="/admin/people"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            People{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Add, update, and delete people in the system
          </p>
        </Link>
      </div>
    </main>
  )
}
