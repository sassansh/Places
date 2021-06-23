const initialState = {
  allUsers: [
    {
      user_id: 1,
      name: "Sassan Shokoohi",
      email: "sassan_shokoohi@me.com",
      password: "1234",
      avatarURL: "https://bit.ly/3q8x5LR",
      groups: [1],
    },
    {
      user_id: 2,
      name: "Johnny Li",
      email: "johnny@ualberta.ca",
      password: "5678",
      avatarURL: "https://bit.ly/3cL0K8m",
      groups: [1, 2],
    },
  ],
  currentUserID: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      const newUsers = [...state.allUsers];
      newUsers.push(action.payload);
      return {
        ...state,
        allUsers: newUsers,
      };
    case "LOGIN_USER":
      const email = action.payload.email;
      const pass = action.payload.password;
      const user = state.allUsers.find(
        (user) => user.email === email && user.password === pass
      );
      if (user) {
        return {
          ...state,
          currentUserID: user.user_id,
        };
      } else {
        return {
          ...state,
          currentUserID: null,
        };
      }
    default:
      return state;
  }
};

export default userReducer;
