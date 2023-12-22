import { faker } from '@faker-js/faker'
import type { CommunityDocument, CommunityInput } from '../community.model'
import { Community } from '../community.model'

const mockCommunity = () => ({
  title: faker.lorem.words(6),
})

describe('Community Model', () => {
  let community: CommunityDocument, communityInput: CommunityInput

  beforeAll(async () => {
    communityInput = mockCommunity()
    community = new Community({ ...communityInput })

    await community.save()
  })

  afterAll(async () => {
    await Community.deleteOne({ _id: community })
  })

  describe('when given valid input', () => {
    it('creates and reads a new community', async () => {
      const fetchedCommunity = await Community.findOne({ _id: community })

      expect(fetchedCommunity).toBeDefined()
      expect(fetchedCommunity?.title).toEqual(communityInput.title)
    })

    it('updates an existing community', async () => {
      const communityUpdateInput: CommunityInput = mockCommunity()
      await Community.updateOne({ _id: community }, { ...communityUpdateInput })
      const fetchedCommunity = await Community.findOne({ _id: community })
      expect(fetchedCommunity).toBeDefined()
      expect(fetchedCommunity).toMatchObject(communityUpdateInput)
      expect(fetchedCommunity).not.toMatchObject(communityInput)
    })

    it('deletes an existing community', async () => {
      await Community.deleteOne({ _id: community })
      const fetchedCommunity = await Community.findOne({ _id: community })
      expect(fetchedCommunity).toBeNull()
    })
  })

  describe('when validating communities', () => {
    const invalidCommunity = new Community({
      title: undefined,
    })
    const validationResult = invalidCommunity.validateSync()

    it('requires a valid title', () => {
      const validationError = validationResult?.errors.title.message
      expect(validationError).toBe('Title is required.')
    })
  })
})
