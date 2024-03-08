import { db } from '../db'
import { Community, Person } from '../models'

const { Membership } = db

export async function getAll() {
  return await Membership.find()
}

export async function getById(id: string) {
  try {
    return await Membership.findById(id)
  } catch {
    throw 'Membership Not Found'
  }
}

export async function create(params: any) {
  const membership = new Membership(params)
  return await membership.save()
}

export async function update(id: string, params: any) {
  const membership = await Membership.findById(id)

  // validate
  if (!membership) throw 'Membership not found'

  // copy params properties to user
  Object.assign(membership, params)

  await membership.save()

  return membership.toJSON()
}

export async function _delete(id: string) {
  const membership = await Membership.findById(id)
  if (!membership) throw 'Membership not found'

  const owner = await Person.findById(membership.owner)
  const community = await Community.findById(membership.community)

  const deleted = await Membership.findOneAndDelete(
    { _id: id },
    { owner, community },
  )
  return deleted.toJSON()
}
