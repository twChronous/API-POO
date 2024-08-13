import { Schema } from "mongoose";

// Define o schema para o usuário
export default new Schema({
  money: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  }
});

