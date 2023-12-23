import type { Document } from 'mongoose'
import mongoose, { model, Schema } from 'mongoose'
import type { MembershipDocument } from './membership.model'

export interface CommunityInput {
  title: string
  description?: string
  isPublic?: boolean
  theme?: object
}

export interface CommunityDocument extends CommunityInput, Document {
  memberships?: MembershipDocument[]
  updatedAt: Date
  createdAt: Date
}

const CommunitySchema = new Schema<CommunityDocument>(
  {
    title: {
      type: String,
      trim: true,
      validate: {
        validator(v: string) {
          return /^(?!\s*$).+/.test(v)
        },
        message: 'Please add a valid title.',
      },
      required: [true, 'Title is required.'],
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    memberships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
      },
    ],
    theme: Object,
  },
  {
    timestamps: true, // to create updatedAt and createdAt
  },
)

/**
 * Community Model
 * @alpha
 * ----
 * A Community is a group of people who share a common interest.
 *
 */
export const Community =
  mongoose.models.Community ||
  model<CommunityDocument>('Community', CommunitySchema)
