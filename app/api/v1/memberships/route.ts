import { NextResponse } from 'next/server'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request) {
  try {
    const memberships = await membershipsService.getAll()
    return NextResponse.json(memberships)
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const membership = await membershipsService.create(request.body)
    return NextResponse.json(membership, { status: 201 })
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}
