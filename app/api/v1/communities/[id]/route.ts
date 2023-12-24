import { NextResponse } from 'next/server'
import * as communitiesService from '@hyperlocal/services/communities.service'

export async function GET(request: Request, { params: { id } }: any) {
  try {
    const community = await communitiesService.getById(id)
    return NextResponse.json(community)
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
    const person = await communitiesService.update(id, data)
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
    await communitiesService._delete(id)
    return NextResponse.json({ message: 'Community deleted successfully' })
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}