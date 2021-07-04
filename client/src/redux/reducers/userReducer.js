import isEmpty from "is-empty";

const initialState = {
  allUsers: [],
  isAuthenticated: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case "SET_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
