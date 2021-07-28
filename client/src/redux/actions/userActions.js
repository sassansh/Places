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

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
    message.success('Registered successfully!');
  } catch (err) {
    message.error(err.response.data + '!');
  }
};

export const loginUser = (userData) => async (dispatch) => {
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
    message.success('Logged in! Welcome ' + user.name + '!');
  } catch (err) {
    message.error(err.response.data + '!');
  }
};

export const userRequestToJoinGroup = (group_id) => async(dispatch) => {
  try {
    await axios.post('/api/users/group/request', {group_id});
    await dispatch(getUsers());
    message.success('Requested to join group');
  } catch (err) {
    message.error(err.response.data + '!');
  }
}

export const userAcceptRequestToJoinGroup = (other_user_id, group_id) => async(dispatch) => {
  try {
    await axios.post('/api/users/group/accept', {other_user_id, group_id});
    await dispatch(getUsers());
    message.success('Accepted request to join group');
  } catch (err) {
    message.error(err.response.data + '!');
  }
}

export const userRejectRequestToJoinGroup = (other_user_id, group_id) => async(dispatch) => {
  try {
    await axios.post('/api/users/group/reject', {other_user_id, group_id});
    await dispatch(getUsers());
    message.success('Rejected request to join group');
  } catch (err) {
    message.error(err.response.data + '!');
  }
}

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  };
};

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    payload: users,
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
  try {
    const loading = message.loading('Removing user..', 0);
    const deleteGroupResponse = await axios.delete('/api/users/group', {
      data: userData,
    });
    loading();
    const success = deleteGroupResponse.data.success;
    if (success) {
      dispatch(getUsers());
      if (userData.user_id === userData.currentUserID) {
        history.push('/');
      }
      message.success('User removed!');
    } else {
      message.error('User could not be removed!');
    }
  } catch (err) {
    console.log(err);
  }
};
