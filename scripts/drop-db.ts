import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function run() {
  const dbUri =
    process.env.MONGO_URI || 'mongodb://localhost:27017/hyperlocal-nextjs_dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  await mongoose.connection.close()
  console.log('\n')
  console.log('⭕ Database successfully dropped')
  console.log('👋 Please start the service using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
