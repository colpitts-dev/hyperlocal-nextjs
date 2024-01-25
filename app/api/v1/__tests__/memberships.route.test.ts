import { createMocks } from 'node-mocks-http'
import {
  MembershipDocument,
  MembershipInput,
  Membership,
} from '@hyperlocal/models/membership.model'
import {
  mockAdminMembership,
  mockGeneralMembership,
} from '@hyperlocal/models/__mocks__/membership.mock'
import {
  CommunityDocument,
  Community,
} from '@hyperlocal/models/community.model'
import { mockCommunity } from '@hyperlocal/models/__mocks__/community.mock'
import { PersonDocument, Person } from '@hyperlocal/models/person.model'
import { mockPerson } from '@hyperlocal/models/__mocks__/person.mock'

import { GET, POST } from '../memberships/route'
import { GET as GET_BY_ID, PATCH, DELETE } from '../memberships/[id]/route'

describe('/api/v1/memberships', () => {
  let personOne: PersonDocument,
    personTwo: PersonDocument,
    community: CommunityDocument

  let generalMembership: MembershipDocument,
    generalMembershipInput: MembershipInput

  let adminMembership: MembershipDocument, adminMembershipInput: MembershipInput

  beforeAll(async () => {
    personOne = new Person({ ...mockPerson() })
    personTwo = new Person({ ...mockPerson() })
    community = new Community({ ...mockCommunity() })

    await Promise.all([personOne.save(), personTwo.save(), community.save()])

    generalMembershipInput = mockGeneralMembership()
    adminMembershipInput = mockAdminMembership()

    generalMembership = new Membership({
      owner: personOne,
      community,
      ...generalMembershipInput,
    })

    adminMembership = new Membership({
      owner: personTwo,
      community,
      ...adminMembershipInput,
    })

    await generalMembership.save()
    await adminMembership.save()
  })

  afterAll(async () => {
    await Promise.all([
      Membership.findOneAndDelete({ _id: generalMembership._id }),
      Membership.findOneAndDelete({ _id: adminMembership._id }),
    ])
    await Promise.all([
      Person.findOneAndDelete({ _id: personOne }),
      Person.findOneAndDelete({ _id: personTwo }),
      Community.findOneAndDelete({ _id: community }),
    ])
  })

  describe('POST /memberships', () => {
    let doc: {
      id: string
      owner: { id: string }
      community: { id: string }
      message?: string
    }

    afterAll(async () => {
      await Membership.findOneAndDelete(
        { _id: doc.id },
        { owner: personOne, community },
      )
    })

    it('creates a new membership', async () => {
      const newMembershipInput = mockGeneralMembership()
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          owner: personOne,
          community: community,
          ...newMembershipInput,
        },
      })

      const response = await POST(req)
      doc = await response.json()

      expect(response.status).toBe(201)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', newMembershipInput.title)
    })

    it('adds membership to person and community', async () => {
      const fetchedPerson = await Person.findById(doc.owner.id)
      const fetchedCommunity = await Community.findById(doc.community.id)
      expect(fetchedPerson.memberships.includes(doc.id)).toBe(true)
      expect(fetchedCommunity.memberships.includes(doc.id)).toBe(true)
    })

    it('requires a valid owner id', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          ...mockGeneralMembership(),
          owner: 'invalid-id',
          community: community,
        },
      })

      const response = await POST(req)
      const error = await response.json()

      expect(response.status).toBe(400)
      expect(error?.message).toContain('Membership validation failed: owner')
    })

    it('requires a valid community', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          ...mockGeneralMembership(),
          owner: personOne,
          community: 'invalid-id',
        },
      })

      const response = await POST(req)
      const error = await response.json()

      expect(response.status).toBe(400)
      expect(error?.message).toContain(
        'Membership validation failed: community',
      )
    })
  })

  describe('GET /memberships', () => {
    it('gets all memberships', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET(req)
      const memberships = await response.json()

      expect(response.status).toBe(200)
      expect(memberships[0].isAdmin).toBe(false)
      expect(memberships[1].isAdmin).toBe(true)
    })
  })

  describe('GET /memberships/{id}', () => {
    it('returns a membership', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET_BY_ID(req, {
        params: { id: generalMembership._id },
      })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.id).toEqual(generalMembership.id)
    })

    it('returns a 400 if no membership found', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET_BY_ID(req, { params: { id: 'abc-123-xyz' } })

      expect(response.status).toBe(400)
    })
  })

  describe('PATCH /memberships/{id}', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Membership.findOneAndDelete({ _id: doc.id })
    })

    it('updates a membership', async () => {
      const membershipUpdate = {
        title: 'Acme Co',
      }

      const { req, res } = createMocks({
        method: 'PATCH',
        body: {
          ...membershipUpdate,
        },
      })

      const response = await PATCH(req, {
        params: { id: generalMembership._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', membershipUpdate.title)
    })
  })

  describe('DELETE /memberships/{id}', () => {
    let newMembership: MembershipDocument
    let doc: { id: string; title: string }

    it('deletes a membership', async () => {
      newMembership = new Membership({
        owner: personOne,
        community,
        ...mockGeneralMembership(),
      })

      await newMembership.save()

      const { req, res } = createMocks({
        method: 'DELETE',
      })

      const response = await DELETE(req, {
        params: { id: newMembership.id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
    })

    it('removes membership from person and community', async () => {
      newMembership = new Membership({
        owner: personOne,
        community,
        ...mockGeneralMembership(),
      })

      await newMembership.save()
      const { req, res } = createMocks({
        method: 'DELETE',
      })

      const response = await DELETE(req, {
        params: { id: newMembership.id },
      })
      doc = await response.json()

      const fetchedPerson = await Person.findById(personOne.id)
      const fetchedCommunity = await Community.findById(community.id)

      const personAssociation = fetchedPerson.memberships.includes(
        newMembership.id,
      )
      const communityAssociation = fetchedCommunity.memberships.includes(
        newMembership.id,
      )

      expect(response.status).toBe(200)
      expect(personAssociation).toBe(false)
      expect(communityAssociation).toBe(false)
    })
  })
})
