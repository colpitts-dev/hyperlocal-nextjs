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
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id
      },
    },
  },
)

MembershipSchema.pre('save', async function (next) {
  const membership = this
  const person = await Person.findOne({ _id: membership.owner })
  const community = await Community.findOne({ _id: membership.community })

  if (!person) {
    throw new Error('Owner not found.')
  }

  if (!community) {
    throw new Error('Community not found.')
  }

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
  let { owner, community } = this.getOptions()

  let deletedMembership = membership._id || membership
  let ownerId = membership.owner || owner?._id
  let communityId = membership.community || community?._id

  await Person.updateOne(
    { _id: ownerId },
    { $pull: { memberships: deletedMembership } },
  )
  await Community.updateOne(
    { _id: communityId },
    { $pull: { memberships: deletedMembership } },
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
