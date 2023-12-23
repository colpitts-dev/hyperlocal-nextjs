import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { Person, Community, Membership } from '../app/_lib/server/models'
import { mockPerson } from '../app/_lib/server/models/__mocks__/person.mock'

dotenv.config()

const COMMUNITY_SEEDS = 4
const PEOPLE_SEEDS = 25

const COMMUNITY_THEMES = [
  {
    light: '#f6f7f9',
    dark: '#1a1a1a',
    primary: '#2b65ba',
    secondary: '#c22f27',
    tertiary: '#f0da4a',
    'on-primary': '#f8f9fa',
    'on-secondary': '#f8f9fa',
    'on-tertiary': '#1a1a1a',
  },
  {
    light: '#f6f7f9',
    dark: '#1a1a1a',
    primary: '#4fae9d',
    secondary: '#ed792f',
    tertiary: '#fadb7f',
    'on-primary': '#1a1a1a',
    'on-secondary': '#1a1a1a',
    'on-tertiary': '#1a1a1a',
  },
  {
    light: '#f6f7f9',
    dark: '#1a1a1a',
    primary: '#3682f5',
    secondary: '#5ecc50',
    tertiary: '#fae652',
    'on-primary': '#1a1a1a',
    'on-secondary': '#1a1a1a',
    'on-tertiary': '#1a1a1a',
  },
  {
    light: '#f6f7f9',
    dark: '#1a1a1a',
    primary: '#5541d9',
    secondary: '#d93b9a',
    tertiary: '#e9a4f5',
    'on-primary': '#f6f7f9',
    'on-secondary': '#1a1a1a',
    'on-tertiary': '#1a1a1a',
  },
]

const getCommunitySeed = (i: number) => ({
  title: faker.internet.domainName(),
  description: faker.company.buzzPhrase(),
  theme: {
    ui: {
      'max-width': '1336px',
      'border-radius': '0.25rem',
      'font-sans': "'Inter', sans-serif",
      'font-serif': "'Times New Roman', serif",
      'font-mono': "'Courier New', monospace",
      white: '#fff',
      black: '#000',
      light: COMMUNITY_THEMES[i].light,
      dark: COMMUNITY_THEMES[i].dark,
    },
    light: {
      primary: COMMUNITY_THEMES[i].primary,
      secondary: COMMUNITY_THEMES[i].secondary,
      tertiary: COMMUNITY_THEMES[i].tertiary,
      background: COMMUNITY_THEMES[i].light,
      surface: '#ffffff',
      error: '',
      border: '#f1f1f1',
      alert: '#c22f27',
      header: '#fff',
      info: '#2b65ba',
      success: '#009900',
      warning: '#f0da4a',
      danger: '#c22f27',
      'on-primary': COMMUNITY_THEMES[i]['on-primary'],
      'on-secondary': COMMUNITY_THEMES[i]['on-secondary'],
      'on-tertiary': COMMUNITY_THEMES[i]['on-tertiary'],
      'on-background': COMMUNITY_THEMES[i].dark,
      'on-surface': COMMUNITY_THEMES[i].dark,
      'on-error': '#ffffff',
      'on-alert': '#ffffff',
      'on-info': '#ffffff',
      'on-success': '#ffffff',
      'on-warning': '#ffffff',
      'on-danger': '#ffffff',
    },
    dark: {
      header: '#121212',
      border: '#313131',
      background: COMMUNITY_THEMES[i].dark,
      surface: '#313131',
      'on-background': COMMUNITY_THEMES[i].light,
      'on-surface': COMMUNITY_THEMES[i].light,
    },
  },
})

async function run() {
  const dbUri =
    process.env.MONGO_URI || 'mongodb://localhost:27017/app-name_dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  // Seed communities
  let i = 0
  while (i < COMMUNITY_SEEDS) {
    const communityInput = getCommunitySeed(i)
    const community = new Community({ ...communityInput })
    await community.save()
    i++
  }

  // Seed people w/ memberships
  let j = 0
  while (j < PEOPLE_SEEDS) {
    console.log(`👤  Adding person ${j + 1}/${PEOPLE_SEEDS}`)

    const personInput = mockPerson()
    const person = new Person({ ...personInput })

    const docs = await Community.aggregate([{ $sample: { size: 1 } }])

    const myCommunity = await Community.findById(docs[0])

    const membership = new Membership({
      title: `${person.nickname} - ${myCommunity?.title}`,
      owner: person,
      community: myCommunity,
    })

    await membership.save()
    myCommunity?.memberships?.push(membership)

    await myCommunity?.save()
    person.memberships.push(membership)

    await person.save()

    j++
  }

  await mongoose.connection.close()
  console.log('\n')
  console.log('🌱 Database seeded with sample data')
  console.log('👋 Please start the service using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
