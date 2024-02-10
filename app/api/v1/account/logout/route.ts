import { cookies } from 'next/headers'

import { apiHandler } from '@hyperlocal/server/api'
import { getIronSession } from 'iron-session'

export async function POST(request: Request) {
  return handler.POST(request)
}

const handler = apiHandler({
  POST: logout,
})

async function logout() {
  const sessionOptions = {
    cookieName: 'siwe',
    password: 'complex_password_at_least_32_characters_long',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }

  const session: any = getIronSession(cookies(), sessionOptions)

  //await session?.destroy()

  cookies().delete('authorization')
}
