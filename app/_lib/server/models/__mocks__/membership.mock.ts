import { faker } from '@faker-js/faker'
import type { MembershipInput } from '../membership.model'

export const mockGeneralMembership = (): MembershipInput => ({
  title: `Mock Membership: ${faker.person.firstName()}`,
  isAdmin: false,
})

export const mockAdminMembership = (): MembershipInput => ({
  title: `Admin Membership: ${faker.person.firstName()}`,
  isAdmin: true,
})
