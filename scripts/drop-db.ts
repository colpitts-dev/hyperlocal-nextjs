import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
import readline from 'readline'

dotenv.config({
  path: '.env.local',
})

async function run() {
  const dbUri = process.env.MONGO_URI as string
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

function askQuestion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve =>
    rl.question(
      'Are you sure you want to drop the database? (yes/no) ',
      answer => {
        if (answer === 'yes') {
          run()
            .then(() => resolve(0))
            .catch(err => console.log(err))
        } else {
          console.log('👋 Database drop cancelled')
          process.exit(0)
        }
      },
    ),
  )
}

askQuestion()
