import { NextResponse } from 'next/server'
import { apiHandler } from '@hyperlocal/server/api'
import * as membershipService from '@hyperlocal/services/memberships.service'

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
  const membership = await membershipService.getById(id)
  if (!membership) throw new Error('Membership not found')
  return membership
}

async function update(request: Request, { params: { id } }: any) {
  const data = request?.json ? await request?.json() : request.body
  return await membershipService.update(id, data)
}

async function _delete(request: Request, { params: { id } }: any) {
  await membershipService._delete(id)
  return { message: 'Membership deleted successfully' }
}
