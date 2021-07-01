export const createUser = (newUser) => {
  return {
    type: "CREATE_USER",
    payload: newUser,
  };
};

export const loginUser = (email, password) => {
  return {
    type: "LOGIN_USER",
    payload: { email: email, password: password },
  };
};

export const setCurrentUser = (userID) => {
  return {
    type: "SET_CURRENT_USER",
    payload: userID,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
