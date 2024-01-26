'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AdminPeople() {
  const [data, setData] = useState<[] | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/communities')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading)
    return (
      <main className="flex min-h-screen flex-col justify-center items-center p-4">
        <p>Loading...</p>
      </main>
    )
  if (!data)
    return (
      <main className="flex min-h-screen flex-col justify-center items-center p-4">
        <p>No community data</p>
      </main>
    )
  return (
    <section className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      {data.map(
        (community: {
          id: string
          title: string
          description: string
          memberships: []
        }) => (
          <div
            key={community.id}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {community.title}{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
              {community.description}
            </p>
            <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
              members: {community.memberships?.length}
            </p>
          </div>
        ),
      )}
    </section>
  )
}
