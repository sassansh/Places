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
  currentUserID: 1,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_USER":
        const newUsers = [...state.allUsers]
        newUsers.push(action.payload)
        return {
          ...state,
          allUsers: newUsers,
        }
        case "SET_USER":
        return {
          ...state,
          currentUserID: action.payload,
        };
      default:
        return state;
    }
  };

export default userReducer;