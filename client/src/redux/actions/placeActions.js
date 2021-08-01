import axios from 'axios';
import { message } from 'antd';

export const getPlaces = () => async (dispatch) => {
  try {
    const placesResponse = await axios.get('/api/places');
    const places = placesResponse.data;
    dispatch(setPlaces(places));
  } catch (err) {
    console.log(err);
  }
};

export const addPlace = (newPlace, history) => async (dispatch) => {
  const loading = message.loading('Creating place..', 0);
  try {
    const newPlaceResponse = await axios.post('/api/places', newPlace);
    const newPlaceFull = await newPlaceResponse.data;
    loading();
    await dispatch(getPlaces());
    await dispatch(setCurrentPlace(newPlaceFull.place_id));
    history.push('/placeview');
    message.success('New place created!');
  } catch (err) {
    loading();
    console.log(err);
  }
};

export const setPlaces = (places) => {
  return {
    type: 'SET_PLACES',
    payload: places,
  };
};

export const setCurrentPlace = (placeID) => {
  return {
    type: 'SET_CURRENT_PLACE',
    payload: placeID,
  };
};
