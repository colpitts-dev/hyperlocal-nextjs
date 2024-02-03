import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const auth = {
  isAuthenticated,
  verifyToken,
  getClaims,
}

type HyperlocalToken = {
  sub: string
  aud: string[]
  iat: number
  exp: number
}

function isAuthenticated() {
  try {
    verifyToken()
    return true
  } catch {
    return false
  }
}

function getClaims() {
  const token = cookies().get('authorization')?.value ?? ''
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  return decoded as HyperlocalToken
}

function verifyToken() {
  const token = cookies().get('authorization')?.value ?? ''
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  const id = decoded.sub as string
  return id
}
