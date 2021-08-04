const initialState = {
  allReviews: []
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        allReviews: action.payload
      }
    default:
      return state
  }
}

export default reviewReducer
