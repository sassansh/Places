const initialState = {
  allReviews: [
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
  ]
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_REVIEW":
        const newReviews = [...state.allReviews]
        newReviews.push(action.payload)
        return {
          ...state,
          allReviews: newReviews,
        };
      default:
        return state;
    }
  };

export default reviewReducer;