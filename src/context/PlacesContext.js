import { createContext } from "react";

const PlacesContext = createContext({
  places: [
    {
      place_id: 1,
      name: "Ambleside Beach",
      address: "Ambleside Beach, Argyle Ave, West Vancouver, BC V7V 1A4",
      group_id: 1,
      category_id: 1,
      ImageURL: "https://bit.ly/35sQcH1",
    },
    {
      place_id: 2,
      name: "Earls Kitchen & Bar - Yaletown",
      address: "1095 Mainland St, Vancouver, BC V6B 5P9",
      group_id: 2,
      category_id: 2,
      ImageURL: "https://bit.ly/2SxGSyU",
    },
  ],
  setPlaces: () => {},
});

export default PlacesContext;
