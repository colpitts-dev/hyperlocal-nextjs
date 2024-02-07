import { apiHandler } from '@hyperlocal/server/api'
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

export async function getAll() {
  return await membershipsService.getAll()
}

export async function create(request: Request) {
  const membershipInput = request?.json ? await request?.json() : request.body
  return await membershipsService.create(membershipInput)
}
