import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  groups: {
    type: [String],
    required: true,
  },
  requestGroups: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('User', UserSchema, 'users');
