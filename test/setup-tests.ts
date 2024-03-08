import mongoose from 'mongoose'
import dotenv from 'dotenv'
import * as peopleService from '@hyperlocal/server/services/people.service'

dotenv.config()

export let memberCookie: string
export let adminCookie: string

beforeAll(async () => {
  try {
    // mock consone.log and console.warn
    global.console = {
      ...global.console,
      log: jest.fn(),
      warn: jest.fn(),
    }

    // open connection
    if (mongoose.connection.readyState !== 1) {
      mongoose.set('strictQuery', true)
      await mongoose.connect(`${process.env.MONGO_TEST_URI}`)
    }

    if (process.env.TEST_ENV === 'e2e') {
      // get auth tokens for tests
      const { token: memberToken } = await peopleService.authenticate({
        email: 'test-member@hyperlocal.box',
        password: 'Password123!',
      })

      const { token: adminToken } = await peopleService.authenticate({
        email: 'test-admin@hyperlocal.box',
        password: 'Password123!',
      })

      memberCookie = `authorization=${memberToken}; path=/; domain=localhost; secure; httponly;`
      adminCookie = `authorization=${adminToken}; path=/; domain=localhost; secure; httponly;`
    }
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
})

afterAll(async () => {
  // close connection
  await mongoose.disconnect()
})
