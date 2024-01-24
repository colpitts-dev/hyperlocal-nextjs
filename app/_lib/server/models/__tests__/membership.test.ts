import { mockCommunity } from '../__mocks__/community.mock'
import { mockGeneralMembership } from '../__mocks__/membership.mock'
import { mockPerson } from '../__mocks__/person.mock'
import type { CommunityDocument, CommunityInput } from '../community.model'
import { Community } from '../community.model'
import type { MembershipDocument, MembershipInput } from '../membership.model'
import { Membership } from '../membership.model'
import { Person, type PersonDocument, type PersonInput } from '../person.model'

describe('Membership Model', () => {
  let membership: MembershipDocument, membershipInput: MembershipInput
  let community: CommunityDocument, communityInput: CommunityInput
  let person: PersonDocument, personInput: PersonInput

  beforeAll(async () => {
    communityInput = mockCommunity()
    community = new Community({ ...communityInput })
    await community.save()

    personInput = mockPerson()
    person = new Person({ ...personInput })
    await person.save()

    membershipInput = mockGeneralMembership()
    membership = new Membership({
      ...membershipInput,
      owner: person,
      community,
    })

    await membership.save()
  })

  afterAll(async () => {
    await Promise.all([
      Community.deleteOne({ _id: community }),
      Person.deleteOne({ _id: person }),
      Membership.deleteOne({ _id: membership }),
    ])
  })

  describe('when given valid input', () => {
    it('creates and reads a new membership', async () => {
      const fetchedMembership = await Membership.findOne({
        id: membership,
      })

      expect(fetchedMembership).toBeDefined()
      // Sets admin access to false by default
      expect(fetchedMembership?.isAdmin).toEqual(false)
    })

    it('associates a membership with a person and community', async () => {
      const fetchedPerson = await Person.findById({ _id: person._id })
      const fetchedCommunity = await Community.findById({ _id: community._id })
      const expectedMemberships = [membership._id]

      expect(fetchedPerson?.memberships).toEqual(expectedMemberships)
      expect(fetchedCommunity?.memberships).toEqual(expectedMemberships)
    })

    it('updates an existing membership', async () => {
      const membershipUpdateInput: MembershipInput = mockGeneralMembership()
      await Membership.updateOne(
        { _id: membership },
        { ...membershipUpdateInput },
      )
      const fetchedMembership = await Membership.findOne({
        id: membership,
      })
      expect(fetchedMembership).toBeDefined()
      expect(fetchedMembership).toMatchObject(membershipUpdateInput)
      expect(fetchedMembership).not.toMatchObject(membershipInput)
    })

    it('deletes an existing membership', async () => {
      await Membership.findOneAndDelete({ _id: membership })

      const fetchedMembership = await Membership.findOne({
        _id: membership,
      })
      expect(fetchedMembership).toBeNull()
    })

    it('removes associations for owner and community', async () => {
      const fetchedPerson = await Person.findOne({ _id: person })
      const fetchedCommunity = await Community.findOne({ _id: community })
      expect(fetchedPerson?.memberships).toHaveLength(0)
      expect(fetchedCommunity?.memberships).toHaveLength(0)
    })
  })
})
