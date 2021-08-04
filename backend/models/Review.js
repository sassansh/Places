import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  place_id: {
    type: String,
    required: true
  },
  rating: {
    type: [Number],
    required: true
  }
});

export default mongoose.model('Review', reviewSchema, 'reviews');
