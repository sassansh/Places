const initialState = {
  allGroups: [],
  currentGroupID: ''
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GROUPS':
      return {
        ...state,
        allGroups: action.payload
      };
    case 'SET_CURRENT_GROUP':
      return {
        ...state,
        currentGroupID: action.payload
      };
    default:
      return state;
  }
};

export default groupReducer;
