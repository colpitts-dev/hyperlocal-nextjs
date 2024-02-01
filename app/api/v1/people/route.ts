import { apiHandler } from '@hyperlocal/server/api'
import * as peopleService from '@hyperlocal/services/people.service'

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
  return await peopleService.getAll()
}

async function create(request: Request) {
  const personInput = request?.json ? await request?.json() : request.body
  return await peopleService.create(personInput)
}
