import { cookies } from 'next/headers'

import { apiHandler } from '@hyperlocal/server/api'

export async function POST(request: Request) {
  return handler.POST(request)
}

const handler = apiHandler({
  POST: logout,
})

function logout() {
  cookies().delete('authorization')
}
