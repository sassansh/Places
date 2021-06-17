import { createContext } from "react";

const CurrentPlaceIDContext = createContext({
  CurrentPlaceID: 1,
  setCurrentPlaceID: () => {},
});

export default CurrentPlaceIDContext;
