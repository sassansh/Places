import { createContext } from "react";

const ReviewsContext = createContext({
  reviews: [
    {
      review_id: 1,
      user_id: 1,
      place_id: 1,
      rating: 3,
    },
    {
      review_id: 2,
      user_id: 2,
      place_id: 2,
      rating: 4,
    },
  ],
  setReviews: () => {},
});

export default ReviewsContext;
