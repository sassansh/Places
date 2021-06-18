import { createContext } from "react";

const CurrentUserIDContext = createContext({
  CurrentUserID: 1,
  setCurrentUserID: () => {},
});

export default CurrentUserIDContext;
