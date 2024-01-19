import type { Document } from 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
import { Person } from './person.model'
import { Community } from './community.model'
import type { PersonDocument } from './person.model'
import type { CommunityDocument } from './community.model'

export interface MembershipInput {
  title?: string
  isAdmin?: boolean
}

export interface MembershipDocument extends Document, MembershipInput {
  owner: PersonDocument
  community: CommunityDocument
  createdAt: Date
  updatedAt: Date
}

const MembershipSchema = new Schema<MembershipDocument>(
  {
    title: { type: String, required: [true, 'Title is required.'] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: [true, 'Owner is required.'],
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      required: [true, 'Community is required.'],
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

MembershipSchema.pre('save', async function (next) {
  const membership = this

  await Person.updateOne(
    { _id: membership.owner._id },
    { $push: { memberships: membership._id } },
  )

  await Community.updateOne(
    { _id: membership.community._id },
    { $push: { memberships: membership._id } },
  )

  next()
})

MembershipSchema.pre('findOneAndDelete', async function (next) {
  let membership = this.getQuery()['_id']

  await Person.updateOne(
    { id: membership.owner._id },
    { $pull: { memberships: membership._id } },
  )

  await Community.updateOne(
    { id: membership.community._id },
    { $pull: { memberships: membership._id } },
  )

  next()
})

/**
 * Membership Model
 * @alpha
 * ----
 * A membership belongs to a person and associates them with a community
 *
 */
export const Membership =
  mongoose.models.Membership ||
  model<MembershipDocument>('Membership', MembershipSchema)
