import Review from '../models/Review.js';
import authenticateToken from '../util/AuthToken.js';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  Review.find({}, '-_id review_id user_id place_id rating')
    .then((reviews) => res.json(reviews))
    .catch((err) => console.log(err));
});

router.post('/', authenticateToken, (req, res) => {
  const { place_id, rating } = req.body;
  const user_id = req.user.user_id;

  for (const x of rating) {
    if (x < 1) {
      res.status(400).json({
        message: 'No rating should be less than 1.'
      });
    }
  }

  const newReview = new Review({
    review_id: uuidv4(),
    user_id: user_id,
    place_id: place_id,
    rating: rating
  });
  newReview
    .save()
    .then(() =>
      res.json({
        message: 'Created review successfully'
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error creating review'
      })
    );
});

router.put('/', authenticateToken, (req, res) => {
  const { review_id, rating } = req.body;

  for (const x of rating) {
    if (x < 1) {
      res.status(400).json({
        message: 'No rating should be less than 1.'
      });
    }
  }

  Review.updateOne({ review_id: review_id }, { rating: rating })
    .then(() =>
      res.json({
        message: 'Edited review successfully'
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: 'Error editing review'
      })
    );
});

export default router;
