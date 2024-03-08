import { NextResponse } from 'next/server'
import { ApiRequestError, apiHandler } from '@hyperlocal/server/api'
import * as peopleService from '@hyperlocal/services/people.service'

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
    const person = await peopleService.getById(id)
    if (!person) throw new ApiRequestError('Person not found', 400)
    return person
  } catch (e: any) {
    throw new ApiRequestError(e, 404)
  }
}

async function update(request: Request, { params: { id } }: any) {
  const data = await request.json()
  return await peopleService.update(id, data)
}

async function _delete(request: Request, { params: { id } }: any) {
  await peopleService._delete(id)
  return { message: 'Person deleted successfully' }
}
