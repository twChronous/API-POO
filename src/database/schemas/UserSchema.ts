import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

import { Schema, Document } from '../Schema'
import type { UserOptions } from '../../utils/types'

const UserSchema = new Schema<UserOptions & Document>({
  verified: { type: Boolean, default: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  todos: [{ type: Types.ObjectId, ref: 'Todo' }],
})

UserSchema.pre('save', async function (next) {
  const user = this as UserOptions
  const hash = await bcrypt.hash(user.password, 10)
  if (user.password.substring(0, 7) !== '$2b$10$') user.password = hash
  next()
})

export { UserSchema }
