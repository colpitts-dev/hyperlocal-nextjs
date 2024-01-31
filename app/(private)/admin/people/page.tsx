'use client'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@hyperlocal/ui/components/Breadcrumbs/Breadcrumb'
import Card from '@hyperlocal/ui/components/Card'
import Loader from '@hyperlocal/ui/components/Loader'

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

  if (isLoading) return <Loader />
  if (!data)
    return (
      <main className="flex min-h-screen flex-col justify-center items-center p-4">
        <p>No people data</p>
      </main>
    )
  return (
    <>
      <Breadcrumb pageName="Manage Accounts" />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data.map(
          (person: {
            fullName: string
            id: string
            nickname: string
            email: string
            memberships: string[]
          }) => (
            <Card key={person.id}>
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {person.nickname}
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-75`}>
                {person.fullName}
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {person.email}
              </p>
              <br />
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Memberships: {person.memberships.length}
              </p>
            </Card>
          ),
        )}
      </section>
    </>
  )
}
