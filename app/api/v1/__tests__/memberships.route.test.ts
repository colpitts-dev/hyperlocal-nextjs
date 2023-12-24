import { createMocks } from 'node-mocks-http'
import {
  MembershipDocument,
  MembershipInput,
  Membership,
  PersonDocument,
  PersonInput,
  Community,
  Person,
  CommunityDocument,
  CommunityInput,
} from '@hyperlocal/models'
import {
  mockCommunity,
  mockGeneralMembershipInput,
  mockPerson,
} from '@hyperlocal/models/__mocks__'

import { GET, POST } from '../memberships/route'
import { GET as GET_BY_ID, PATCH, DELETE } from '../memberships/[id]/route'

describe('/api/v1/memberships', () => {
  let membership: MembershipDocument,
    membershipInput: MembershipInput,
    person: PersonDocument,
    personInput: PersonInput,
    community: CommunityDocument,
    communityInput: CommunityInput

  beforeAll(async () => {
    await Membership.collection.drop()

    personInput = mockPerson()

    person = new Person({ ...personInput })
    await person.save()

    communityInput = mockCommunity()
    community = new Community({ ...communityInput })
    await community.save()

    membershipInput = mockGeneralMembershipInput()
    membership = new Membership({ ...membershipInput })
    membership.owner = person
    membership.community = community

    await membership.save()
  })

  afterAll(async () => {
    await membership.deleteOne()
    await person.deleteOne()
    await community.deleteOne()
  })

  describe('POST /memberships', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Membership.findByIdAndDelete(doc.id)
    })

    it('creates a new membership', async () => {
      const newMembershipInput = {
        title: 'Acme Inc',
        owner: person._id,
        community: community._id,
      }

      const { req, res } = createMocks({
        method: 'POST',
        body: newMembershipInput,
      })

      const response = await POST(req)
      doc = await response.json()

      expect(response.status).toBe(201)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', newMembershipInput.title)
    })
  })

  describe('GET /memberships', () => {
    it('returns a list of memberships', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET(req)

      expect(response.status).toBe(200)
      const data = await response.json()

      const result = data
      const expected = [membership]

      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
    })
  })

  describe('GET /memberships/{id}', () => {
    it('returns a membership', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: membership._id },
      })

      const response = await GET_BY_ID(req, { params: { id: membership._id } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(JSON.stringify(data)).toEqual(JSON.stringify(membership))
    })
  })

  describe('PATCH /memberships/{id}', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Membership.findByIdAndDelete(doc.id)
    })

    it('updates a membership', async () => {
      const membershipUpdate = {
        title: 'Acme Inc.',
      }

      const { req, res } = createMocks({
        method: 'PATCH',
        query: { id: membership._id },
        body: {
          ...membershipUpdate,
        },
      })

      const response = await PATCH(req, {
        params: { id: membership._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', membershipUpdate.title)
    })
  })

  describe('DELETE /memberships/{id}', () => {
    let doc: { id: string; message?: string }

    it('deletes a membership', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: membership._id },
      })

      const response = await DELETE(req, {
        params: { id: membership._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc?.message).toBe('Membership deleted successfully')
    })
  })
})
