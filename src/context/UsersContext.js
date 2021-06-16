import { createContext } from "react";

const UsersContext = createContext({
  users: [
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
  setUsers: () => {},
});

export default UsersContext;
