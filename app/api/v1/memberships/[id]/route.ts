import { NextResponse } from 'next/server'
import * as membershipService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request, { params: { id } }: any) {
  try {
    const membership = await membershipService.getById(id)
    if (!membership)
      return NextResponse.json(
        { message: 'Membership not found' },
        { status: 400 },
      )
    return NextResponse.json(membership)
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function PATCH(request: Request, { params: { id } }: any) {
  try {
    const data = request?.json ? await request?.json() : request.body
    const membership = await membershipService.update(id, data)
    return NextResponse.json(membership)
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function DELETE(request: Request, { params: { id } }: any) {
  try {
    const deletedMembership = await membershipService._delete(id)
    return NextResponse.json(deletedMembership)
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}
