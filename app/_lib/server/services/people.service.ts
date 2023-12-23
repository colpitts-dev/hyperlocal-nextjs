import bcrypt from 'bcryptjs'
import { db } from '../db'

const { Person } = db

export async function getAll() {
  return await Person.find()
}

export async function getById(id: string) {
  try {
    return await Person.findById(id)
  } catch {
    throw 'Person Not Found'
  }
}

export async function create(params: any) {
  // validate
  if (await Person.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already taken'
  }

  const person = new Person(params)

  // hash password
  if (params.password) {
    person.hash = bcrypt.hashSync(params.password, 10)
  }

  // save user
  await person.save()

  return person.toJSON()
}

export async function update(id: string, params: any) {
  const person = await Person.findById(id)

  // validate
  if (!person) throw 'Person not found'
  if (
    person.email !== params.email &&
    (await Person.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken'
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10)
  }

  // copy params properties to user
  Object.assign(person, params)

  await person.save()

  return person.toJSON()
}

export async function _delete(id: string) {
  return await Person.findByIdAndDelete(id)
}
