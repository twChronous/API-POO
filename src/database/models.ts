import { createModelFactory } from './createModelFactory'
import { TodoSchema } from './schemas/TodoSchema'
import { UserSchema } from './schemas/UserSchema'

export const Todos = createModelFactory('Todos', TodoSchema)
export const Users = createModelFactory('Users', UserSchema)

