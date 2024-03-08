import { testApiHandler } from 'next-test-api-route-handler'
import {
  CommunityDocument,
  CommunityInput,
  Community,
} from '@hyperlocal/models/community.model'
import { mockCommunity } from '@hyperlocal/models/__mocks__/community.mock'

import * as communitiesStatic from '../communities/route'
import * as communitiesDynamic from '../communities/[id]/route'
import { memberCookie } from '../../../../test/setup-tests'

describe('/api/v1/communities', () => {
  let community: CommunityDocument, communityInput: CommunityInput
  let communityTwo: CommunityDocument, communityInputTwo: CommunityInput

  beforeAll(async () => {
    communityInput = mockCommunity()
    communityInputTwo = mockCommunity()
    community = new Community({ ...communityInput })
    communityTwo = new Community({ ...communityInputTwo })

    await community.save()
    await communityTwo.save()
  })

  afterAll(async () => {
    await Community.deleteOne({ _id: community })
  })

  it('requires authentication', async () => {
    await testApiHandler({
      appHandler: communitiesStatic,
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        await expect(res.json()).resolves.toStrictEqual({
          message: 'Unauthorized',
        }) // ◄ Passes!
      },
    })
  })

  describe('POST /communities', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Community.findByIdAndDelete(doc.id)
    })

    it('creates a new community', async () => {
      const newCommunityInput = mockCommunity()
      await testApiHandler({
        appHandler: communitiesStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify(newCommunityInput),
          })
          const body = await res.json()
          doc = body

          expect(res.status).toBe(201)
          expect(body).not.toHaveProperty('_id')
          expect(body).toHaveProperty('id')
          expect(body).toHaveProperty('title', newCommunityInput.title)
        },
      })
    })
  })

  describe('GET /communities', () => {
    it('returns a list of communities', async () => {
      await testApiHandler({
        appHandler: communitiesStatic,
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

  describe('GET /communities/{id}', () => {
    it('returns a community', async () => {
      await testApiHandler({
        appHandler: communitiesDynamic,
        paramsPatcher(params) {
          params.id = community._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          const data = await res.json()
          expect(res.status).toBe(200)
          expect(data.title).toEqual(community.title) // ◄ Passes!
        },
      })
    })

    it('returns a 404 if no community found', async () => {
      await testApiHandler({
        appHandler: communitiesDynamic,
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

  describe('PATCH /communities/{id}', () => {
    it('updates a community', async () => {
      await testApiHandler({
        appHandler: communitiesDynamic,
        paramsPatcher(params) {
          params.id = community._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'PATCH',
            body: JSON.stringify({ title: 'test-updated-title' }),
          })
          const expected = await res.json()
          expect(res.status).toBe(200)
          expect(expected.title).toEqual('test-updated-title') // ◄ Passes!
        },
      })
    })
  })

  describe('DELETE /communities/{id}', () => {
    it('deletes a community', async () => {
      await testApiHandler({
        appHandler: communitiesDynamic,
        paramsPatcher(params) {
          params.id = community._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'DELETE' })
          const expected = await res.json()
          expect(res.status).toEqual(200)
          expect(expected.message).toEqual('Community deleted successfully') // ◄ Passes!
        },
      })
    })
  })
})
