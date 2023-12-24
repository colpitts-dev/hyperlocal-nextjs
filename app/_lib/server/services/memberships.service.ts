import { db } from '../db'

const { Membership } = db

export async function getAll() {
  return await Membership.find().populate('owner').populate('community')
}

export async function getById(id: string) {
  try {
    return await Membership.findById(id).populate('owner').populate('community')
  } catch {
    throw 'Membership Not Found'
  }
}

export async function create(params: any) {
  const doc = new Membership(params)
  // save user
  await doc.save()

  return doc.toJSON()
}

export async function update(id: string, params: any) {
  const doc = await Membership.findById(id)

  // validate
  if (!doc) throw 'Membership not found'

  // copy params properties to user
  Object.assign(doc, params)

  await doc.save()

  return doc.toJSON()
}

export async function _delete(id: string) {
  return await Membership.findByIdAndDelete(id)
}
