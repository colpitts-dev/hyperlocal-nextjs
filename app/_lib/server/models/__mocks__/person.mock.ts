import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

export const mockPerson = () => {
  const nickname = faker.internet.userName()
  const firstName = faker.person.firstName()
  const lastName = faker.person.firstName()
  const hash = hashSync('Password123!', 10)

  return {
    nickname,
    firstName,
    lastName,
    hash,
    email: faker.internet.email({ firstName, lastName }),
    birthdate: faker.date.past({ years: 21 }).toISOString(),
    password: 'Password123!',
  }
}
