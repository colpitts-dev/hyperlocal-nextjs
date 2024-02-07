import { apiHandler } from '@hyperlocal/server/api'
import * as communitiesService from '@hyperlocal/services/communities.service'

export async function GET(request: Request, { params: { id } }: any) {
  return handler.GET(request, { params: { id } })
}

export async function PATCH(request: Request, { params: { id } }: any) {
  return handler.PATCH(request, { params: { id } })
}

export async function DELETE(request: Request, { params: { id } }: any) {
  return handler.DELETE(request, { params: { id } })
}

const handler = apiHandler({
  GET: getById,
  PATCH: update,
  DELETE: _delete,
})

async function getById(request: Request, { params: { id } }: any) {
  const community = await communitiesService.getById(id)
  if (!community) throw new Error('Community not found')
  return community
}

async function update(request: Request, { params: { id } }: any) {
  const data = request?.json ? await request?.json() : request.body
  return await communitiesService.update(id, data)
}

async function _delete(request: Request, { params: { id } }: any) {
  return await communitiesService._delete(id)
}
