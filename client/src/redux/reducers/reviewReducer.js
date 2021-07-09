const initialState = {
  allReviews: []
};

const reviewReducer = (state = initialState, action) => {
  let newReviews = [];
  switch (action.type) {
    case "SET_REVIEWS":
      return {
        ...state,
        allReviews: action.payload,
      };
    case "ADD_REVIEW":
      newReviews = [...state.allReviews];
      newReviews.push(action.payload);
      return {
        ...state,
        allReviews: newReviews,
      };
    case "EDIT_REVIEW":
      newReviews = [...state.allReviews];
      newReviews[action.payload.index] = action.payload.newReview;
      return {
        ...state,
        allReviews: newReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
