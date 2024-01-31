import { NextResponse } from 'next/server'
import * as peopleService from '@hyperlocal/services/people.service'
import * as communitiesService from '@hyperlocal/services/communities.service'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request) {
  try {
    const people = await peopleService.getAll()
    const communities = await communitiesService.getAll()
    const memberships = await membershipsService.getAll()
    return NextResponse.json({
      totalPeople: people.length,
      totalCommunities: communities.length,
      totalMemberships: memberships.length,
    })
  } catch (error) {
    return NextResponse.error()
  }
}
