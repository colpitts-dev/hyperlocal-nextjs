'use client'

import React, { useEffect, useState } from 'react'

export default function AdminPeople() {
  const [data, setData] = useState<[] | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/people')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No people data</p>
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-4xl font-bold mt-4 mb-24">Manage People</h1>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4">
        {data.map(
          (person: {
            firstName: string
            lastName: string
            id: string
            nickname: string
            email: string
          }) => (
            <div
              key={person.id}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {person.nickname}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
                {person.firstName} {person.lastName}
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {person.email}
              </p>
            </div>
          ),
        )}
      </div>
    </main>
  )
}
