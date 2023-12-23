import mongoose from 'mongoose'
import { Person } from './models'

const MONGO_URI =
  process.env.NODE_ENV === 'test' && process.env.MONGO_TEST_URI
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI || 'mongodb://localhost:27017/test'

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URI, {
    autoCreate: true,
  })
  .then(() => {
    console.log(`💾 [hyperlocal-api]: MongoDB successfully connected`)
  })
  .catch(err => {
    console.log(`🚫 [hyperlocal-api]: MongoDB connect error`)
  })

export const db = {
  Person,
}
