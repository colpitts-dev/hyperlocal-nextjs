import { apiHandler } from '@hyperlocal/server/api'
import * as peopleService from '@hyperlocal/services/people.service'

export async function POST(request: Request) {
  return handler.POST(request)
}

const handler = apiHandler({
  POST: register,
})

async function register(req: Request) {
  const body = await req.json()
  await peopleService.create(body)
}
