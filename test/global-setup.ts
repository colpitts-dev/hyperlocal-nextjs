import { loadEnvConfig } from '@next/env'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import dotenv from 'dotenv'

import { Community, Membership, Person } from '../app/_lib/server/models'
import {
  mockGeneralMembership,
  mockPerson,
} from '../app/_lib/server/models/__mocks__'
import { faker } from '@faker-js/faker'

dotenv.config()

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

async function globalSetup() {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)

  // mms is needed in global space, because we don't want to create a new instance every test-suite
  const instance = await MongoMemoryServer.create()
  const uri = instance.getUri()

  ;(global as any).__MONGOINSTANCE = instance
  process.env.MONGO_TEST_URI = `${uri.slice(0, uri.lastIndexOf('/'))}/${
    process.env.MONGO_TEST_DB || 'test'
  }`

  mongoose.set('strictQuery', false)

  try {
    // The following is to make sure the database is clean before any test starts
    const conn = await mongoose.connect(process.env.MONGO_TEST_URI)
    await conn.connection?.db.dropDatabase()

    // e2e tests: Seed the database with a person, community, and membership
    if (process.env.TEST_ENV === 'e2e') {
      // Create a community
      const communityInput = getCommunitySeed(0)
      const community = new Community({ ...communityInput })
      await community.save()

      // Create a member
      const memberInput = mockPerson()
      memberInput.email = `test-member@hyperlocal.box`
      const member = new Person({ ...memberInput })
      await member.save()

      // Create an admin
      const adminInput = mockPerson()
      adminInput.email = `test-admin@hyperlocal.box`
      const admin = new Person({ ...adminInput })
      await admin.save()

      // Create a general membership
      const generalMembership = new Membership({
        title: `${member.nickname} - ${community?.title}`,
        owner: member,
        community: community,
      })

      // Create an admin membership
      const adminMembership = new Membership({
        title: `${member.nickname} - ${community?.title}`,
        owner: member,
        community: community,
        isAdmin: true,
      })

      await generalMembership.save()
      await adminMembership.save()
    }
    await mongoose.disconnect()
  } catch (e) {
    console.log(`🚫 MongoDB error dropping test db`)
  }
}

export default globalSetup
