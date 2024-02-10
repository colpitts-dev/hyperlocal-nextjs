// Next.js Route Handlers (App Router)
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { generateNonce, SiweMessage, SiweResponse } from 'siwe'
import * as peopleService from '@hyperlocal/services/people.service'
import { Address } from 'viem'

export interface SessionData {
  nonce: string
  siwe: SiweResponse
}

export interface AuthData {
  token: string
}

const sessionOptions = {
  cookieName: 'siwe',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

const authCookie = {
  cookieName: 'authorization',
  password: process.env.AUTH_COOKIE_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export async function GET(req: Request, res: Response) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  session.nonce = generateNonce()
  console.log(session.nonce)
  try {
    await session.save()
    return Response.json(session.nonce)
  } catch (e) {
    console.log(e)
    return Response.json({ ok: false }, { status: 400 })
  }
}

export async function POST(req: Request, res: Response) {
  const { message, signature } = await req.json()
  const siweMessage = new SiweMessage(message)
  const fields = await siweMessage.verify({ signature })
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (fields.data.nonce !== session.nonce)
    return Response.json(
      { ok: false, message: 'Invalid nonce.' },
      { status: 422 },
    )

  session.siwe = fields

  const { owner, token } = await peopleService.authenticateWallet(
    fields?.data?.address as Address,
  )

  // set jwt token in http only cookie
  cookies().set('authorization', token, { httpOnly: true, secure: true })

  await session.save()

  return Response.json({ ok: true })
}
