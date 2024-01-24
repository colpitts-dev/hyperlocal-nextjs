import { NextResponse } from 'next/server'
import * as communitiesService from '@hyperlocal/services/communities.service'

export async function GET(request: Request) {
  try {
    const communities = await communitiesService.getAll()
    return NextResponse.json(communities)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  const communityInput = request?.json ? await request?.json() : request.body
  try {
    const newPerson = await communitiesService.create(communityInput)
    return NextResponse.json(newPerson, {
      status: 201,
    })
  } catch (error: any) {
    const message = error?.message || error
    return NextResponse.json({ message }, { status: 400 })
  }
}
