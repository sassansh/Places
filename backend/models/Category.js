import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
  category_id: {
    type: String,
    required: true
  },
  group_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_singular: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  custom_criteria: {
    type: [String],
    required: true
  }
})

export default mongoose.model('Category', categorySchema, 'categories')
