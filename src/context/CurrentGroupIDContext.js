import { createContext } from "react";

const CurrentGroupIDContext = createContext({
  CurrentGroupID: 1,
  setCurrentGroupID: () => {},
});

export default CurrentGroupIDContext;
