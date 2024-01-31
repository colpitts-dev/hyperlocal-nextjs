'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@hyperlocal/ui/components/Breadcrumbs/Breadcrumb'
import Card from '@hyperlocal/ui/components/Card'
import Loader from '@hyperlocal/ui/components/Loader'

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

  if (isLoading) return <Loader />
  if (!data)
    return (
      <main className="flex min-h-screen flex-col justify-center items-center p-4">
        <p>No community data</p>
      </main>
    )
  return (
    <>
      <Breadcrumb pageName="Manage Communities" />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data.map(
          (community: {
            id: string
            title: string
            description: string
            memberships: []
          }) => (
            <Card key={community.id}>
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {community.title}
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
                {community.description}
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
                members: {community.memberships?.length}
              </p>
            </Card>
          ),
        )}
      </section>
    </>
  )
}
