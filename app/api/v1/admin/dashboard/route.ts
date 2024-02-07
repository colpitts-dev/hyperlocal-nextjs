import { NextResponse } from 'next/server'
import { apiHandler } from '@hyperlocal/server/api'
import * as peopleService from '@hyperlocal/services/people.service'
import * as communitiesService from '@hyperlocal/services/communities.service'
import * as membershipsService from '@hyperlocal/services/memberships.service'

export async function GET(request: Request) {
  return handler.GET(request)
}

const handler = apiHandler({
  GET: getDashboardData,
})

async function getDashboardData() {
  try {
    const people = await peopleService.getAll()
    const communities = await communitiesService.getAll()
    const memberships = await membershipsService.getAll()
    return {
      totalPeople: people.length,
      totalCommunities: communities.length,
      totalMemberships: memberships.length,
    }
  } catch (error) {
    throw new Error('Error getting dashboard data')
  }
}
