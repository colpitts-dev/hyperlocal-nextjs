import { NextRequest } from 'next/server'
import { auth } from '../auth'

export { jwtMiddleware }

async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) return
  // verify token in request cookie
  const id = auth.verifyToken()
  req.headers.set('ownerId', id)
}

function isPublicPath(req: NextRequest) {
  // public routes that don't require authentication
  const publicPaths = [
    'POST:/api/v1/account/login',
    'POST:/api/v1/account/logout',
    'POST:/api/v1/account/register',
  ]
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}
