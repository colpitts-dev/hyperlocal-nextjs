import { createMocks } from 'node-mocks-http'
import {
  CommunityDocument,
  CommunityInput,
  Community,
} from '@hyperlocal/models'
import { mockCommunity } from '@hyperlocal/models/__mocks__'

import { GET, POST } from '../communities/route'
import { GET as GET_BY_ID, PATCH, DELETE } from '../communities/[id]/route'

describe('/api/v1/communities', () => {
  let community: CommunityDocument,
    communityInput: CommunityInput,
    communityTwo: CommunityDocument,
    communityTwoInput: CommunityInput

  beforeAll(async () => {
    await Community.collection.drop()

    communityInput = mockCommunity()
    communityTwoInput = mockCommunity()
    community = new Community({ ...communityInput })
    communityTwo = new Community({ ...communityTwoInput })

    await community.save()
    await communityTwo.save()
  })

  afterAll(async () => {
    await community.deleteOne()
    await communityTwo.deleteOne()
  })

  describe('POST /communities', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Community.findByIdAndDelete(doc.id)
    })

    it('creates a new community', async () => {
      const newCommunityInput = {
        title: 'Acme Inc',
      }

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
    it('returns a list of communities', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET(req)

      expect(response.status).toBe(200)
      const data = await response.json()

      const result = data
      const expected = [community, communityTwo]

      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
    })
  })

  describe('GET /communities', () => {
    it('returns a community', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: community._id },
      })

      const response = await GET_BY_ID(req, { params: { id: community._id } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(JSON.stringify(data)).toEqual(JSON.stringify(community))
    })
  })

  describe('PATCH /communities/{id}', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Community.findByIdAndDelete(doc.id)
    })

    it('updates a community', async () => {
      const communityUpdate = {
        title: 'Acme Inc.',
      }

      const { req, res } = createMocks({
        method: 'PATCH',
        query: { id: community._id },
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
        query: { id: community._id },
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
