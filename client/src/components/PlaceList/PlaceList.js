import "./PlaceList.css";

import Place from "../Place/Place";
import { useSelector } from "react-redux";

function PlaceList() {
  const places = useSelector((state) => state.places.allPlaces);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  let currentPlaces = places.filter(
    (place) =>
      place.category_id === currentCategoryID &&
      place.group_id === currentGroupID
  );

  let placeList = currentPlaces.map(
    (placeData) => (
      <Place key={placeData.place_id} placeData={placeData} rank = {currentPlaces.indexOf(placeData) + 1} />
    )
  );
  return (
    <div>
      <ul>{placeList}</ul>
    </div>
  );
}

export default PlaceList;
