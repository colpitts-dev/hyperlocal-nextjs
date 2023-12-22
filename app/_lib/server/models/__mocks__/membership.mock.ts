import { faker } from '@faker-js/faker'
import type { MembershipInput } from '../membership.model'

export const mockGeneralMembershipInput = (): MembershipInput => ({
  title: `Mock Membership: ${faker.person.firstName()}`,
  isAdmin: false,
})

export const mockAdminMembershipInput = (): MembershipInput => ({
  title: `Admin Membership: ${faker.person.firstName()}`,
  isAdmin: true,
})
