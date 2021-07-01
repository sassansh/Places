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
      password: "1234",
      avatarURL: "https://bit.ly/3cL0K8m",
      groups: [1, 2],
    },
    {
      user_id: 3,
      name: "Laura Rodgers",
      email: "laurarodgers@gmail.com",
      password: "1234",
      avatarURL: "https://bit.ly/3d9N5I9",
      groups: [2],
    },
    {
      user_id: 4,
      name: "Amir Jafarvand",
      email: "amir.jafarvand@gmail.com",
      password: "1234",
      avatarURL: "https://bit.ly/3cL0K8m",
      groups: [1],
    },
    {
      user_id: 5,
      name: "Test User",
      email: "test@gmail.com",
      password: "1234",
      avatarURL: "https://bit.ly/3wSLFK4",
      groups: [1],
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
    case "SET_CURRENT_USER":
      const userID = action.payload;
      return {
        ...state,
        currentUserID: userID,
      };
    case "LOGIN_USER":
      const email = action.payload.email;
      const pass = action.payload.password;
      const user = state.allUsers.find(
        (user) => user.email === email && user.password === pass
      );
      if (user) {
        localStorage.setItem("currentUserID", user.user_id);
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
    case "LOGOUT_USER":
      localStorage.removeItem("currentUserID");
      return {
        ...state,
        currentUserID: null,
      };
    default:
      return state;
  }
};

export default userReducer;
