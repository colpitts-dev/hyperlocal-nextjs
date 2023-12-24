import type { Document } from 'mongoose'
import mongoose, { Schema, model } from 'mongoose'
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
