import { faker } from '@faker-js/faker'

export const mockCommunity = () => ({
  title: faker.internet.domainName(),
})
