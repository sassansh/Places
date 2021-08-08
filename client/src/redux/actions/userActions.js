import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { message } from 'antd';
import setAuthToken from '../../utils/setAuthToken';

export const getUsers = () => async (dispatch) => {
  try {
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    dispatch(setUsers(users));
  } catch (err) {
    console.log(err);
  }
};

export const getFavourites = () => async (dispatch) => {
  try {
    const favouritesResponse = await axios.get('/api/users/favourites');
    const favourites = favouritesResponse.data;
    dispatch(setFavourites(favourites));
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = (userData, history) => async () => {
  const loading = message.loading('Registering user..', 0);
  try {
    await axios.post('/api/users/register', userData);
    loading();
    history.push('/login');
    message.success('Registered successfully!');
  } catch (err) {
    loading();
    message.error(err.response.data + '!');
  }
};

export const loginUser = (userData) => async (dispatch) => {
  const loading = message.loading('Logging in..', 0);
  try {
    const loginResponse = await axios.post('/api/users/login', userData);
    const { token } = loginResponse.data;
    localStorage.setItem('jwtToken', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const user = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(user));
    loading();
    message.success('Logged in! Welcome ' + user.name + '!');
  } catch (err) {
    loading();
    message.error(err.response.data + '!');
  }
};

export const userRequestToJoinGroup = (group_id) => async (dispatch) => {
  const loading = message.loading('Requesting to join group..', 0);
  try {
    await axios.post('/api/users/group/request', { group_id });
    await dispatch(getUsers());
    loading();
    message.success('Requested to join group');
  } catch (err) {
    loading();
    message.error(err.response.data + '!');
  }
};

export const userAcceptRequestToJoinGroup =
  (other_user_id, group_id) => async (dispatch) => {
    const loading = message.loading('Accepting request..', 0);
    try {
      await axios.post('/api/users/group/accept', { other_user_id, group_id });
      await dispatch(getUsers());
      loading();
      message.success('Accepted request to join group');
    } catch (err) {
      loading();
      message.error(err.response.data + '!');
    }
  };

export const userRejectRequestToJoinGroup =
  (other_user_id, group_id) => async (dispatch) => {
    const loading = message.loading('Rejecting request..', 0);
    try {
      await axios.post('/api/users/group/reject', { other_user_id, group_id });
      await dispatch(getUsers());
      loading();
      message.success('Rejected request to join group');
    } catch (err) {
      loading();
      message.error(err.response.data + '!');
    }
  };

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  };
};

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    payload: users
  };
};

export const setFavourites = (favourites) => {
  return {
    type: 'SET_FAVOURITES',
    payload: favourites
  };
};

export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  message.success('Logged out!');
};

export const removeUser = (userData, history) => async (dispatch) => {
  const loading = message.loading('Removing user..', 0);
  try {
    const deleteGroupResponse = await axios.delete('/api/users/group', {
      data: userData
    });
    loading();
    const success = deleteGroupResponse.data.success;
    if (success) {
      await dispatch(getUsers());
      if (userData.user_id === userData.currentUserID) {
        history.push('/');
      }
      message.success('User removed!');
    } else {
      message.error('User could not be removed!');
    }
  } catch (err) {
    loading();
    console.log(err);
  }
};

export const addFavouritePlace = (place_id) => async (dispatch) => {
  const loading = message.loading('Adding favourite..', 0);
  try {
    await axios.post('/api/users/favourites', { place_id });
    await dispatch(getFavourites());
    loading();
    message.success('Favourite added!');
  } catch (err) {
    loading();
    message.error('Could not favourite place!');
    console.log(err);
  }
};

export const deleteFavouritePlace = (place_id) => async (dispatch) => {
  const loading = message.loading('Removing favourite..', 0);
  try {
    await axios.delete('/api/users/favourites', { data: { place_id } });
    await dispatch(getFavourites());
    loading();
    message.success('Favourite removed!');
  } catch (err) {
    loading();
    message.error('Could not remove favourite!');
    console.log(err);
  }
};
