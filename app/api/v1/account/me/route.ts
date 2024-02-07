import { apiHandler } from '@hyperlocal/server/api'
import { auth } from '@hyperlocal/server/auth'

export async function GET(request: Request) {
  return handler.GET(request)
}

const handler = apiHandler({
  GET: getCurrentAccount,
})

async function getCurrentAccount() {
  try {
    return auth.getClaims()
  } catch (error) {
    throw new Error('Error getting current account data')
  }
}
