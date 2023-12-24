import { db } from '../db'

const { Community } = db

export async function getAll() {
  return await Community.find()
}

export async function getById(id: string) {
  try {
    return await Community.findById(id)
  } catch {
    throw 'Person Not Found'
  }
}

export async function create(params: any) {
  const doc = new Community(params)
  // save user
  await doc.save()

  return doc.toJSON()
}

export async function update(id: string, params: any) {
  const doc = await Community.findById(id)

  // validate
  if (!doc) throw 'Community not found'

  // copy params properties to user
  Object.assign(doc, params)

  await doc.save()

  return doc.toJSON()
}

export async function _delete(id: string) {
  return await Community.findByIdAndDelete(id)
}
