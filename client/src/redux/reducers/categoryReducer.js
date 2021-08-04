const initialState = {
  allCategories: [],
  currentCategoryID: ''
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategoryID: action.payload
      }
    case 'SET_CATEGORIES':
      return {
        ...state,
        allCategories: action.payload
      }
    default:
      return state
  }
}

export default categoryReducer
