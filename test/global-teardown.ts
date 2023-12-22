import type { MongoMemoryServer } from 'mongodb-memory-server'

async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE
  await instance.stop()
}

export default globalTeardown
