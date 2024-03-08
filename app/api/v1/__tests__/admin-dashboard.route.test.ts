import { testApiHandler } from 'next-test-api-route-handler'
import { memberCookie } from '../../../../test/setup-tests'
// Import the handler under test from the app/api directory
import * as appHandler from '../admin/dashboard/route'

describe('Admin Dashboard API', () => {
  describe('GET /admin/dashboard', () => {
    it('requires authentication', async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          await expect(res.json()).resolves.toStrictEqual({
            message: 'Unauthorized',
          }) // ◄ Passes!
        },
      })
    })

    it('returns admin stats when authenticated', async () => {
      await testApiHandler({
        appHandler,
        // authorize the request
        requestPatcher(request) {
          request.headers.set('cookie', memberCookie)
        },
        async test({ fetch }) {
          const res = await fetch({ method: 'GET' })
          await expect(res.json()).resolves.toStrictEqual({
            totalCommunities: 1,
            totalMemberships: 2,
            totalPeople: 2,
          }) // ◄ Passes!
        },
      })
    })
  })
})
