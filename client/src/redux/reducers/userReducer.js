import isEmpty from 'is-empty'

const initialState = {
  allUsers: [],
  isAuthenticated: false,
  user: {},
  favourite_places: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case 'SET_USERS':
      return {
        ...state,
        allUsers: action.payload
      }
    case 'SET_FAVOURITES':
      return {
        ...state,
        favourite_places: action.payload
      }
    default:
      return state
  }
}

export default userReducer
