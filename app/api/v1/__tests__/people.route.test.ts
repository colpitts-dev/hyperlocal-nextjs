import { testApiHandler } from 'next-test-api-route-handler'
import {
  PersonDocument,
  PersonInput,
  Person,
} from '@hyperlocal/models/person.model'
import { mockPerson } from '@hyperlocal/models/__mocks__/person.mock'

import * as peopleStatic from '../people/route'
import * as peopleDynamic from '../people/[id]/route'
import { memberCookie } from '../../../../test/setup-tests'

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

  it('requires authentication', async () => {
    await testApiHandler({
      appHandler: peopleStatic,
      async test({ fetch }) {
        const res = await fetch({ method: 'GET' })
        await expect(res.json()).resolves.toStrictEqual({
          message: 'Unauthorized',
        }) // ◄ Passes!
      },
    })
  })

  describe('POST /people', () => {
    let doc: { id: string }

    afterAll(async () => {
      await Person.findByIdAndDelete(doc.id)
    })

    it('creates a new person', async () => {
      const newPersonInput = mockPerson()

      await testApiHandler({
        appHandler: peopleStatic,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'POST',
            body: JSON.stringify(newPersonInput),
          })
          const body = await res.json()
          doc = body
          expect(res.status).toBe(201)
          expect(body).not.toHaveProperty('_id')
          expect(body).toHaveProperty('id')
          expect(body).toHaveProperty('nickname', newPersonInput.nickname)
          expect(body).toHaveProperty(
            'email',
            newPersonInput.email.toLowerCase(),
          )
          expect(body).toHaveProperty('birthdate', newPersonInput.birthdate)
          expect(body).not.toHaveProperty('password')
        },
      })
    })
  })

  describe('GET /people', () => {
    it('returns a list of people', async () => {
      await testApiHandler({
        appHandler: peopleStatic,
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

  describe('GET /people/{id}', () => {
    it('returns a person', async () => {
      await testApiHandler({
        appHandler: peopleDynamic,
        paramsPatcher(params) {
          params.id = person._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          const expected = await res.json()
          expect(expected.firstName).toEqual(person.firstName) // ◄ Passes!
        },
      })
    })

    it('returns a 404 if no user found', async () => {
      await testApiHandler({
        appHandler: peopleDynamic,
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

  describe('PATCH /people/{id}', () => {
    it('updates a person', async () => {
      await testApiHandler({
        appHandler: peopleDynamic,
        paramsPatcher(params) {
          params.id = person._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({
            method: 'PATCH',
            body: JSON.stringify({ nickname: 'new-nickname' }),
          })
          const expected = await res.json()
          expect(res.status).toBe(200)
          expect(expected.nickname).toEqual('new-nickname') // ◄ Passes!
        },
      })
    })
  })

  describe('DELETE /people/{id}', () => {
    it('deletes a person', async () => {
      await testApiHandler({
        appHandler: peopleDynamic,
        paramsPatcher(params) {
          params.id = person._id
        },
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'DELETE' })
          const expected = await res.json()
          expect(res.status).toEqual(200)
          expect(expected.message).toEqual('Person deleted successfully') // ◄ Passes!
        },
      })
    })
  })
})
