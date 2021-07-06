const initialState = {
  allPlaces: [],
  currentPlaceID: "40766795-728a-4316-8936-f2064a3f8d43",
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PLACE":
      const newPlaces = [...state.allPlaces];
      newPlaces.push(action.payload);
      return {
        ...state,
        allPlaces: newPlaces,
        currentPlaceID: action.payload.place_id,
      };
    case "SET_PLACES":
      return {
        ...state,
        allPlaces: action.payload,
      };
    case "SET_CURRENT_PLACE":
      return {
        ...state,
        currentPlaceID: action.payload,
      };
    default:
      return state;
  }
};

export default placeReducer;
