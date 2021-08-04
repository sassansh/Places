import mongoose from 'mongoose'

const Schema = mongoose.Schema

const groupSchema = new Schema({
  group_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  avatarURL: {
    type: String
  }
})

export default mongoose.model('Group', groupSchema, 'groups')
