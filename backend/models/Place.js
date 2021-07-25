import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  place_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Place', placeSchema, 'places');
