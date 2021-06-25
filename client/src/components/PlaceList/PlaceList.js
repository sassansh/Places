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

  const reviews = useSelector((state) => state.reviews.allReviews)

  currentPlaces = currentPlaces
    .map(place => ({ ...place,
      avgRating:  reviews
        .filter((review) => review.place_id === place.place_id)
        .map((review) => review.rating)
        .reduce((p, c) => p + c, 0) / reviews.filter((review) => review.place_id === place.place_id).length}))
        .sort((place1, place2) => place2.avgRating - place1.avgRating);


  currentPlaces = currentPlaces
    .map(place => ({ ...place, ranking: 55}));

  let ratings = new Set(currentPlaces.map((place) => place.avgRating));
  let ratingsSorted = Array.from(ratings).sort((rating1, rating2) => rating2 - rating1);
  currentPlaces = currentPlaces
    .map(place => ({ ...place, ranking: ratingsSorted.indexOf(place.avgRating) + 1}));

  currentPlaces = currentPlaces
    .map(place => ({...place, ranking: place.ranking == 0? "?" : place.ranking}));
  //TODO: just bring in average rating as calculated here...
  let placeList = currentPlaces.map(
    (placeData) => (
      <Place key={placeData.place_id} placeData={placeData} rank = {placeData.ranking} />
    )
  );
  return (
    <div>
      <ul>{placeList}</ul>
    </div>
  );
}

export default PlaceList;
