import mongoose, { Schema, model } from 'mongoose'
import type { Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { MembershipDocument } from './membership.model'

export interface PersonInput {
  nickname: string
  email: string
  password: string
  birthdate: string
  firstName?: string
  lastName?: string
  location?: string
}

export interface PersonDocument extends Document, PersonInput {
  emailVerified: boolean
  memberships: MembershipDocument[]
  wallets: string[]
  createdAt: Date
  updatedAt: Date
}

const PersonSchema = new Schema<PersonDocument>(
  {
    nickname: { type: String, required: [true, 'Nickname is required.'] },
    firstName: { type: String },
    lastName: { type: String },
    location: { type: String },
    password: { type: String, required: [true, 'Password hash is required.'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator(v: string) {
          // eslint-disable-next-line prefer-named-capture-group -- ignore
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Please enter a valid email.',
      },
      required: [true, 'Email is required.'],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    birthdate: {
      type: String,
      required: [true, 'Birthdate is required.'],
      validate: {
        validator(v: string) {
          return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
            v,
          )
        },
        message: 'Please enter a valid birthdate.',
      },
    },
    memberships: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Membership',
      },
    ],
    wallets: [
      {
        type: String,
        index: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id
        delete ret.password
      },
    },
  },
)

PersonSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword

  next()
})

// Create a virtual property `fullName` with a getter and setter.
PersonSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName || this.nickname} ${this.lastName || ''}`
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '))
    const lastName = v.substring(v.indexOf(' ') + 1)
    this.set({ firstName, lastName })
  })

/**
 * Person Model
 * @alpha
 * ----
 * A person belongs to many communities through their memberships.
 *
 */
export const Person =
  mongoose.models.Person || model<PersonDocument>('Person', PersonSchema)
