import { faker } from '@faker-js/faker'

export const mockPerson = () => {
  const nickname = faker.internet.userName()
  const firstName = faker.person.firstName()
  const lastName = faker.person.firstName()

  return {
    nickname,
    firstName,
    lastName,
    password: 'Password123!',
    email: faker.internet.email({ firstName, lastName }),
    birthdate: faker.date.past({ years: 21 }).toISOString(),
  }
}
