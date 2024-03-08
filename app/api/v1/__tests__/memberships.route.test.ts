import { testApiHandler } from 'next-test-api-route-handler'
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
import * as membershipsStatic from '../memberships/route'
import * as membershipsDynamic from '../memberships/[id]/route'
import { memberCookie } from '../../../../test/setup-tests'

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

  it('requires authentication', async () => {
    await testApiHandler({
      appHandler: membershipsStatic,
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        await expect(res.json()).resolves.toStrictEqual({
          message: 'Unauthorized',
        }) // ◄ Passes!
      },
    })
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

      await testApiHandler({
        appHandler: membershipsStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              owner: personOne._id,
              community: community._id,
              ...newMembershipInput,
            }),
          })
          const body = await res.json()
          doc = body
          expect(res.status).toBe(201)

          expect(body).not.toHaveProperty('_id')
          expect(body).toHaveProperty('id')
          expect(body).toHaveProperty('title', newMembershipInput.title)
        },
      })
    })

    it('adds membership to person and community', async () => {
      const fetchedPerson = await Person.findById(doc.owner)
      const fetchedCommunity = await Community.findById(doc.community)
      expect(fetchedPerson.memberships.includes(doc.id)).toBe(true)
      expect(fetchedCommunity.memberships.includes(doc.id)).toBe(true)
    })

    it('requires a valid owner id', async () => {
      await testApiHandler({
        appHandler: membershipsStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              owner: 'invalid-id',
              community: community._id,
              title: 'test-title',
            }),
          })
          const body = await res.json()
          doc = body
          expect(res.status).toBe(400)

          expect(body?.message.includes('ValidationError: owner')).toBe(true)
        },
      })
    })

    it('requires a valid community', async () => {
      await testApiHandler({
        appHandler: membershipsStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify({
              owner: personOne._id,
              community: 'invalid-id',
              title: 'test-title',
            }),
          })
          const body = await res.json()
          doc = body
          expect(res.status).toBe(400)

          expect(body?.message.includes('ValidationError: community')).toBe(
            true,
          )
        },
      })
    })
  })

  describe('GET /memberships', () => {
    it('returns a list of memberships', async () => {
      await testApiHandler({
        appHandler: membershipsStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          await expect(res.json()).resolves.toBeInstanceOf(Array) // ◄ Passes!
        },
      })
    })
  })

  describe('GET /memberships/{id}', () => {
    it('returns a membership', async () => {
      await testApiHandler({
        appHandler: membershipsDynamic,
        paramsPatcher(params) {
          params.id = generalMembership._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          const data = await res.json()
          expect(res.status).toBe(200)
          expect(data.title).toEqual(generalMembership.title) // ◄ Passes!
        },
      })
    })

    it('returns a 404 if no community found', async () => {
      await testApiHandler({
        appHandler: membershipsDynamic,
        paramsPatcher(params) {
          params.id = 'invalid-id'
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })

          await expect(res.status).toEqual(404) // ◄ Passes!
        },
      })
    })
  })

  describe('PATCH /memberships/{id}', () => {
    it('updates a membership', async () => {
      await testApiHandler({
        appHandler: membershipsDynamic,
        paramsPatcher(params) {
          params.id = generalMembership._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'PATCH',
            body: JSON.stringify({ title: 'test-update-title' }),
          })
          const expected = await res.json()
          expect(res.status).toBe(200)
          expect(expected.title).toEqual('test-update-title') // ◄ Passes!
        },
      })
    })
  })

  describe('DELETE /memberships/{id}', () => {
    it('deletes a membership', async () => {
      const newMembership = new Membership({
        owner: personOne,
        community,
        ...mockGeneralMembership(),
      })

      await newMembership.save()

      await testApiHandler({
        appHandler: membershipsDynamic,
        paramsPatcher(params) {
          params.id = newMembership._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'DELETE' })
          const expected = await res.json()
          expect(res.status).toEqual(200)
          expect(expected.message).toEqual('Membership deleted successfully') // ◄ Passes!
        },
      })
    })

    it('removes membership from person and community', async () => {
      const newMembership = new Membership({
        owner: personOne,
        community,
        ...mockGeneralMembership(),
      })
      await newMembership.save()

      await testApiHandler({
        appHandler: membershipsDynamic,
        paramsPatcher(params) {
          params.id = newMembership._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'DELETE' })

          const fetchedPerson = await Person.findById(personOne.id)
          const fetchedCommunity = await Community.findById(community.id)

          const personAssociation = fetchedPerson.memberships.includes(
            newMembership.id,
          )
          const communityAssociation = fetchedCommunity.memberships.includes(
            newMembership.id,
          )

          expect(res.status).toBe(200)
          expect(personAssociation).toBe(false)
          expect(communityAssociation).toBe(false)
        },
      })
    })
  })
})
