import type { PersonDocument, PersonInput } from '../person.model'
import { Person } from '../person.model'
import { mockPerson } from '../__mocks__/person.mock'

describe('Person Model', () => {
  let person: PersonDocument, personInput: PersonInput

  beforeAll(async () => {
    personInput = mockPerson()
    person = new Person({ ...personInput })

    await person.save()
  })

  afterAll(async () => {
    await Person.deleteOne({ _id: person })
  })

  describe('when given valid input', () => {
    it('creates a new person', async () => {
      const fetchedPerson = await Person.findOne({ _id: person })

      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.fullName).toEqual(
        `${personInput.firstName} ${personInput.lastName}`,
      )
    })

    it('hashes the password', async () => {
      const fetchedPerson = await Person.findOne({ _id: person })

      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.hash).not.toEqual(personInput.password)
    })

    it('updates a person', async () => {
      const personUpdateInput: PersonInput = mockPerson()
      await Person.updateOne(
        { _id: person },
        { ...personUpdateInput, firstName: 'John', lastName: 'Doe' },
      )
      const fetchedPerson = await Person.findOne({ _id: person })
      expect(fetchedPerson).toBeDefined()
      expect(fetchedPerson?.fullName).toBe('John Doe')
    })

    it('deletes a person', async () => {
      await Person.deleteOne({ _id: person })
      const fetchedPerson = await Person.findOne({ _id: person })
      expect(fetchedPerson).toBeNull()
    })
  })

  describe('when validating documents', () => {
    const invalidPerson = new Person({
      nickname: undefined,
      firstName: undefined,
      lastName: undefined,
      email: 'invalidatexampledotcom',
      birthdate: undefined,
      hash: undefined,
    })
    const validationResult = invalidPerson.validateSync()

    it('requires a nickname', () => {
      const validationError = validationResult?.errors.nickname.message
      expect(validationError).toBe('Nickname is required.')
    })

    it('requires a password', () => {
      const validationError = validationResult?.errors.password.message
      expect(validationError).toBe('Password hash is required.')
    })

    it('requires a valid email address', () => {
      const validationError = validationResult?.errors.email.message
      expect(validationError).toBe('Please enter a valid email.')
    })

    it('requires a birthdate', () => {
      const validationError = validationResult?.errors.birthdate.message
      expect(validationError).toBe('Birthdate is required.')
    })

    // it('requires age to be at least 18 years old', () => {
    //   const validationError = validationResult?.errors.age.message
    //   expect(validationError).toBe('Must be at least 18 years old.')
    // })
  })
})
