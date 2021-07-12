import axios from "axios";

export const getReviews = () => async(dispatch) => {
    try {
        const reviewsResponse = await axios.get("/api/reviews");
        const reviews = reviewsResponse.data;
        dispatch(setReviews(reviews));
      } catch (err) {
        console.log(err);
      }
}

export const setReviews = (reviews) => {
    return {
      type: "SET_REVIEWS",
      payload: reviews,
    };
  };

export const addReview = (newReview) => async(dispatch) => {
    try {
        const newReviewResponse = await axios.post("/api/reviews", newReview);
        const newReviewFull = await newReviewResponse.data;
        return dispatch({
        type: "ADD_REVIEW",
        payload: newReviewFull
        })
    } catch (err) {
        console.log(err);
    }
}

export const editReview =  (newReview) => {
    try {
        const review_id = newReview.review_id;
        const rating = newReview.rating;
        axios.put("/api/reviews", {review_id, rating});
        return {
           type: 'EDIT_REVIEW',
           payload: { review_id: review_id, rating: rating},
        }; 
    } catch (err) {
        console.log(err);
    }

};