import { NextResponse } from 'next/server'
import * as peopleService from '@hyperlocal/services/people.service'

export async function GET(request: Request, { params: { id } }: any) {
  try {
    const person = await peopleService.getById(id)
    return NextResponse.json(person)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function PATCH(request: Request, { params: { id } }: any) {
  try {
    const data = request?.json ? await request?.json() : request.body
    const person = await peopleService.update(id, data)
    return NextResponse.json(person)
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function DELETE(request: Request, { params: { id } }: any) {
  try {
    await peopleService._delete(id)
    return NextResponse.json({ message: 'Person deleted successfully' })
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}
