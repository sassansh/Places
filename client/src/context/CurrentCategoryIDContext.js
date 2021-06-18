import { createContext } from "react";

const CurrentCategoryIDContext = createContext({
  CurrentCategoryID: 1,
  setCurrentCategoryID: () => {},
});

export default CurrentCategoryIDContext;
