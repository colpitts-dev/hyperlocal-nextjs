import { NextResponse } from 'next/server'
import * as communitiesService from '@hyperlocal/services/communities.service'

export async function GET(request: Request) {
  try {
    const communities = await communitiesService.getAll()
    return NextResponse.json(communities)
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
    const community = await communitiesService.create(request.body)
    return NextResponse.json(community, { status: 201 })
  } catch (error: any) {
    console.log(error?.message || error)
    return NextResponse.json(
      { message: error?.message || error },
      { status: 400 },
    )
  }
}
