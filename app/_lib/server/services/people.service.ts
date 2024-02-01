import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { headers } from 'next/headers'
import { db } from '../db'

const { Person } = db

export async function authenticate({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const owner = await Person.findOne({ email })
  const validPassword = await owner?.verifyPassword(password)
  if (!owner || !validPassword) {
    throw 'Email or password is incorrect'
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: owner.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return {
    owner: owner.toJSON(),
    token,
  }
}

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

  // save user
  return await person.save()

  //return person.toJSON()
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

  // copy params properties to user
  Object.assign(person, params)

  return await person.save()

  //return person.toJSON()
}

export async function _delete(id: string) {
  return await Person.findByIdAndDelete(id)
}
