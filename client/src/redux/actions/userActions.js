import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const usersResponse = await axios.get("/api/users");
    const users = usersResponse.data;
    dispatch(setUsers(users));
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", userData);
    alert("Registered successfully");
    history.push("/login");
  } catch (err) {
    alert(err.response.data);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const loginResponse = await axios.post("/api/users/login", userData);
    const { user } = loginResponse.data;
    localStorage.setItem("AuthenticatedUser", JSON.stringify(user));
    dispatch(setCurrentUser(user));
  } catch (err) {
    alert(err.response.data);
  }
};

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("AuthenticatedUser");
  dispatch(setCurrentUser({}));
};
