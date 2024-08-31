import { Schema, Document } from '../Schema'
import type { TodoOptions } from '../../utils/types'

const TodoSchema = new Schema<TodoOptions & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isDone: { type: Boolean, required: true },
})

export { TodoSchema }
