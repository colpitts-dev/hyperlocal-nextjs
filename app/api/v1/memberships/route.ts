import { ApiRequestError, apiHandler } from '@hyperlocal/server/api'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request) {
  return handler.GET(request)
}

export async function POST(request: Request) {
  return handler.POST(request)
}

const handler = apiHandler({
  GET: getAll,
  POST: create,
})

async function getAll() {
  return await membershipsService.getAll()
}

async function create(request: Request) {
  try {
    const membershipInput = await request.json()
    return await membershipsService.create(membershipInput)
  } catch (e: any) {
    throw new ApiRequestError(e, 400)
  }
}
