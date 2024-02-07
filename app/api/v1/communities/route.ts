import { NextResponse } from 'next/server'
import { apiHandler } from '@hyperlocal/server/api'
import * as communitiesService from '@hyperlocal/services/communities.service'

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

async function getAll(request: Request) {
  return await communitiesService.getAll()
}

async function create(request: Request) {
  const communityInput = request?.json ? await request?.json() : request.body
  return await communitiesService.create(communityInput)
}
