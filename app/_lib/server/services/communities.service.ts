import { db } from '../db'

const { Community } = db

export async function getAll() {
  return await Community.find()
}

export async function getById(id: string) {
  try {
    return await Community.findById(id)
  } catch {
    throw 'Community Not Found'
  }
}

export async function create(params: any) {
  //todo: validate params
  const community = new Community(params)

  // save community
  await community.save()

  return community.toJSON()
}

export async function update(id: string, params: any) {
  const community = await Community.findById(id)

  // validate
  if (!community) throw 'Community not found'

  // copy params properties to user
  Object.assign(community, params)

  await community.save()

  return community.toJSON()
}

export async function _delete(id: string) {
  return await Community.findByIdAndDelete(id)
}
