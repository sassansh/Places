import axios from "axios";

export const getPlaces = () => async(dispatch) => {
  try {
    const placesResponse = await axios.get("/api/places");
    const places = placesResponse.data;
    dispatch(setPlaces(places));
  } catch (err) {
    console.log(err);
  }
}

export const setPlaces = (places) => {
  return {
    type: 'SET_PLACES',
    payload: places,
  }
}

export const addPlace = (newPlace) => async(dispatch) => {
  try {
    const newPlaceResponse = await axios.post("/api/places", newPlace);
    const newPlaceFull = await newPlaceResponse.data;
    return dispatch({
      type: "ADD_PLACE",
      payload: newPlaceFull
    })
  } catch (err) {
    console.log(err);
  }
}

export const setCurrentPlace = placeID => {
    return {
       type: 'SET_CURRENT_PLACE',
       payload: placeID
}; };
