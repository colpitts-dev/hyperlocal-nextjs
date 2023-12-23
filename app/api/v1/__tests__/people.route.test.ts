import { createMocks } from 'node-mocks-http'
import {
  PersonDocument,
  PersonInput,
  Person,
} from '@hyperlocal/models/person.model'
import { mockPerson } from '@hyperlocal/models/__mocks__/person.mock'

import { GET, POST } from '../people/route'
import { GET as GET_BY_ID, PATCH, DELETE } from '../people/[id]/route'

describe('/api/v1/people', () => {
  let person: PersonDocument,
    personInput: PersonInput,
    personTwo: PersonDocument,
    personTwoInput: PersonInput

  beforeAll(async () => {
    personInput = mockPerson()
    personTwoInput = mockPerson()
    person = new Person({ ...personInput })
    personTwo = new Person({ ...personTwoInput })

    await person.save()
    await personTwo.save()
  })

  afterAll(async () => {
    await person.deleteOne()
    await personTwo.deleteOne()
  })

  describe('POST /people', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Person.findByIdAndDelete(doc.id)
    })

    it('creates a new person', async () => {
      const newPersonInput = {
        nickname: 'John',
        email: 'john.doe@example.com',
        password: 'testingtesting123',
        birthdate: '1990-01-01T00:00:00.000Z',
      }

      const { req, res } = createMocks({
        method: 'POST',
        body: newPersonInput,
      })

      const response = await POST(req)
      doc = await response.json()

      expect(response.status).toBe(201)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('nickname', newPersonInput.nickname)
      expect(doc).toHaveProperty('email', newPersonInput.email)
      expect(doc).toHaveProperty('birthdate', newPersonInput.birthdate)
    })
  })

  describe('GET /people', () => {
    it('returns a list of people', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const response = await GET(req)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(JSON.stringify(data)).toEqual(JSON.stringify([person, personTwo]))
    })
  })

  describe('GET /people/{id}', () => {
    it('returns a person', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: person._id },
      })

      const response = await GET_BY_ID(req, { params: { id: person._id } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(JSON.stringify(data)).toEqual(JSON.stringify(person))
    })
  })

  describe('PATCH /people/{id}', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Person.findByIdAndDelete(doc.id)
    })

    it('updates a person', async () => {
      const personUpdate = {
        nickname: 'John Doe',
      }

      const { req, res } = createMocks({
        method: 'PATCH',
        query: { id: person._id },
        body: {
          ...personUpdate,
        },
      })

      const response = await PATCH(req, {
        params: { id: person._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc).not.toHaveProperty('_id')
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('nickname', personUpdate.nickname)
    })
  })

  describe('DELETE /people/{id}', () => {
    let doc: { id: string; message?: string }

    it('deletes a person', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: { id: person._id },
      })

      const response = await DELETE(req, {
        params: { id: person._id },
      })
      doc = await response.json()

      expect(response.status).toBe(200)
      expect(doc?.message).toBe('Person deleted successfully')
    })
  })
})
