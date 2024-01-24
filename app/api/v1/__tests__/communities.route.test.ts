import { createMocks } from 'node-mocks-http'
import {
  CommunityDocument,
  CommunityInput,
  Community,
} from '@hyperlocal/models/community.model'
import { mockCommunity } from '@hyperlocal/models/__mocks__/community.mock'

import { GET, POST } from '../communities/route'
import { GET as GET_BY_ID, PATCH, DELETE } from '../communities/[id]/route'

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

  describe('POST /communities', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Community.findByIdAndDelete(doc.id)
    })

    it('creates a new community', async () => {
      const newCommunityInput = mockCommunity()
      const { req, res } = createMocks({
        method: 'POST',
        body: newCommunityInput,
      })

      const response = await POST(req)
      doc = await response.json()

      expect(response.status).toBe(201)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', newCommunityInput.title)
    })
  })

  describe('GET /communities', () => {
    it('gets all communities', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET(req)
      const communities = await response.json()

      expect(response.status).toBe(200)
      expect(communities).toHaveLength(2)
    })
  })

  describe('GET /communities/{id}', () => {
    it('returns a community', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET_BY_ID(req, { params: { id: community._id } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.title).toEqual(community.title)
    })

    it('returns a 400 if no community found', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET_BY_ID(req, { params: { id: 'abc-123-xyz' } })

      expect(response.status).toBe(400)
    })
  })

  describe('PATCH /communities/{id}', () => {
    let doc: { id: string }

    it('updates a community', async () => {
      const communityUpdate = {
        title: 'Acme Co',
      }

      const { req, res } = createMocks({
        method: 'PATCH',
        body: {
          ...communityUpdate,
        },
      })

      const response = await PATCH(req, {
        params: { id: community._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title', communityUpdate.title)
    })
  })

  describe('DELETE /communities/{id}', () => {
    let doc: { id: string; message?: string }

    it('deletes a community', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      })

      const response = await DELETE(req, {
        params: { id: community._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc?.message).toBe('Community deleted successfully')
    })
  })
})
