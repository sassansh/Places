import axios from "axios";
import { async } from "rxjs";

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

export const addReview =  newReview => {
    return {
       type: 'ADD_REVIEW',
       payload: newReview
    }; 
};

export const editReview =  (newReview, index) => {
    return {
       type: 'EDIT_REVIEW',
       payload: { newReview: newReview, index: index},
    }; 
};