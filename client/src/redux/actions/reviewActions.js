import axios from 'axios';
import { message } from 'antd';

export const getReviews = () => async (dispatch) => {
  try {
    const reviewsResponse = await axios.get('/api/reviews');
    const reviews = reviewsResponse.data;
    dispatch(setReviews(reviews));
  } catch (err) {
    console.log(err);
  }
};

export const setReviews = (reviews) => {
  return {
    type: 'SET_REVIEWS',
    payload: reviews
  };
};

export const addReview = (newReview, history) => async (dispatch) => {
  const loading = message.loading('Adding rating..', 0);

  for (const x of newReview.rating) {
    if (x < 1) {
      loading();
      return message.warning('Cannot rate below 1 star!');
    }
  }

  try {
    await axios.post('/api/reviews', newReview);
    const reviewsResponse = await axios.get('/api/reviews');
    const reviews = reviewsResponse.data;
    await dispatch(setReviews(reviews));
    loading();
    history.push('/placeview');
    message.success('Rating added!');
  } catch (err) {
    loading();
    message.error('Could not add review!');
    console.log(err);
  }
};

export const editReview = (newReview, history) => async (dispatch) => {
  const loading = message.loading('Modifying rating..', 0);

  for (const x of newReview.rating) {
    if (x < 1) {
      loading();
      return message.warning('Cannot rate below 1 star!');
    }
  }

  try {
    const review_id = newReview.review_id;
    const rating = newReview.rating;
    await axios.put('/api/reviews', { review_id, rating });
    const reviewsResponse = await axios.get('/api/reviews');
    const reviews = reviewsResponse.data;
    await dispatch(setReviews(reviews));
    loading();
    history.push('/placeview');
    message.success('Rating modified!');
  } catch (err) {
    loading();
    message.error('Could not add review!');
    console.log(err);
  }
};
