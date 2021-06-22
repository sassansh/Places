const initialState = {
  allCategories: [
    { category_id: 1, name: "Beaches", emoji: "🏖️" },
    { category_id: 2, name: "Restaurants", emoji: "🍔" },
  ],
  currentCategoryID: 1,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_CATEGORY":
        return {
          ...state,
          currentCategoryID: action.payload,
        };
      default:
        return state;
    }
  };

export default categoryReducer;