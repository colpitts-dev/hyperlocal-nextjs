import { ApiRequestError, apiHandler } from '@hyperlocal/server/api'
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
  try {
    const community = await communitiesService.getById(id)
    return community
  } catch (e) {
    throw new ApiRequestError(e as string, 404)
  }
}

async function update(request: Request, { params: { id } }: any) {
  const data = request?.json ? await request?.json() : request.body
  return await communitiesService.update(id, data)
}

async function _delete(request: Request, { params: { id } }: any) {
  await communitiesService._delete(id)
  return { message: 'Community deleted successfully' }
}
