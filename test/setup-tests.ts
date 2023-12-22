import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  try {
    // open connection
    mongoose.set('strictQuery', true)
    await mongoose.connect(`${process.env.MONGO_TEST_URI}`)
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
})

afterAll(async () => {
  // close connection
  await mongoose.disconnect()
})
