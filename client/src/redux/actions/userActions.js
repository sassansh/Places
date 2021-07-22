import axios from 'axios';
import { message } from 'antd';

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
    alert('Registered successfully');
    history.push('/login');
    message.success('Registered successfully!');
  } catch (err) {
    message.error(err.response.data + '!');
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const loginResponse = await axios.post('/api/users/login', userData);
    const { user } = loginResponse.data;
    localStorage.setItem('AuthenticatedUser', JSON.stringify(user));
    dispatch(setCurrentUser(user));
    message.success('Logged in! Welcome ' + user.name + '!');
  } catch (err) {
    message.error(err.response.data + '!');
  }
};

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
  localStorage.removeItem('AuthenticatedUser');
  dispatch(setCurrentUser({}));
  message.success('Logged out!');
};
