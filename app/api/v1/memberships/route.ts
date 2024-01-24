import { NextResponse } from 'next/server'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request) {
  try {
    const memberships = await membershipsService.getAll()
    return NextResponse.json(memberships)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  const membershipInput = request?.json ? await request?.json() : request.body
  try {
    const newMembership = await membershipsService.create(membershipInput)
    return NextResponse.json(newMembership, {
      status: 201,
    })
  } catch (error: any) {
    const message = error?.message || error
    return NextResponse.json({ message }, { status: 400 })
  }
}
