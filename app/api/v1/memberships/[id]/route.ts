import { NextResponse } from 'next/server'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request, { params: { id } }: any) {
  try {
    const membership = await membershipsService.getById(id)
    return NextResponse.json(membership)
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function PATCH(request: Request, { params: { id } }: any) {
  try {
    const data = request?.json ? await request?.json() : request.body
    const person = await membershipsService.update(id, data)
    return NextResponse.json(person)
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function DELETE(request: Request, { params: { id } }: any) {
  try {
    await membershipsService._delete(id)
    return NextResponse.json({ message: 'Membership deleted successfully' })
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}
