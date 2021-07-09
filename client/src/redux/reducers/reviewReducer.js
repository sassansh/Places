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
      for (let i = 0; i < newReviews.length; i++) {
        if (newReviews[i].review_id === action.payload.review_id) {
          newReviews[i].rating = action.payload.rating;
          break;
        }
      }
      return {
        ...state,
        allReviews: newReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
