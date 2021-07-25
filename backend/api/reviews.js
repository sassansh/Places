import Review from '../models/Review.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
  const { user_id, place_id, rating } = req.body;
  const newReview = new Review({
    review_id: uuidv4(),
    user_id: user_id,
    place_id: place_id,
    rating: rating,
  });
  newReview
    .save()
    .then(() =>
      res.json({
        message: 'Created review successfully',
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating review',
      })
    );
});

router.put('/', (req, res) => {
  const { review_id, rating } = req.body;
  Review.updateOne({ review_id: review_id }, { rating: rating })
    .then(() =>
      res.json({
        message: 'Edited review successfully',
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error editing review',
      })
    );
});

export default router;
