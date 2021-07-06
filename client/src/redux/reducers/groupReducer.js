const initialState = {
  allGroups: [],
  currentGroupID: "1",
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GROUP":
      const newGroups = [...state.allGroups];
      newGroups.push(action.payload);
      return {
        ...state,
        allGroups: newGroups,
      };
    case "SET_GROUPS":
      return {
        ...state,
        allGroups: action.payload,
      };
    case "SET_CURRENT_GROUP":
      return {
        ...state,
        currentGroupID: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
