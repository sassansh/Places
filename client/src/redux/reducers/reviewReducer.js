const initialState = {
  allReviews: [
    {
      review_id: 1,
      user_id: "beacffb4-3be9-4e6f-aaa5-952a169e918b",
      place_id: 1,
      rating: 3,
    },
    {
      review_id: 1,
      user_id: "8b528adc-9fbf-437b-946e-7a7477d08e3d",
      place_id: 1,
      rating: 3,
    },
    {
      review_id: 2,
      user_id: "8b528adc-9fbf-437b-946e-7a7477d08e3d",
      place_id: 2,
      rating: 4,
    },
  ],
};

const reviewReducer = (state = initialState, action) => {
  let newReviews = [];
  switch (action.type) {
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
