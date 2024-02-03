import { cookies } from 'next/headers'
import { apiHandler } from '@hyperlocal/server/api'
import * as peopleService from '@hyperlocal/services/people.service'

export async function POST(request: Request) {
  return handler.POST(request)
}

const handler = apiHandler({
  POST: login,
})

async function login(request: Request) {
  const body = request?.json ? await request?.json() : request.body

  try {
    const { owner, token } = await peopleService.authenticate(body)
    // return jwt token in http only cookie
    cookies().set('authorization', token, { httpOnly: true, secure: true })
    return owner
  } catch (e) {
    console.log('API ERROR: account/login/route.ts', e)
    throw new Error('Invalid credentials')
  }
}
