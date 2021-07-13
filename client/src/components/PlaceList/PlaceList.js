import "./PlaceList.css";

import { Col, Row } from "antd";

import Place from "../Place/Place";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getPlaces } from "../../redux/actions/placeActions";
import { getReviews } from "../../redux/actions/reviewActions";

function PlaceList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getReviews());
  }, [dispatch]);

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
      numReviews: reviews
      .filter((review) => review.place_id === place.place_id)
      .length,
      avgRating:  reviews
        .filter((review) => review.place_id === place.place_id)
        .map((review) => review.rating)
        .reduce((p, c) => p + c, 0) / reviews.filter((review) => review.place_id === place.place_id).length}))
    .sort((place1, place2) => (place2.avgRating? place2.avgRating : 0) - (place1.avgRating? place1.avgRating : 0));

  const ratings = new Set(currentPlaces.map((place) => place.avgRating));
  const ratingsSorted = Array.from(ratings).sort((rating1, rating2) => rating2 - rating1);
  currentPlaces = currentPlaces
    .map(place => ({ ...place, rank: ratingsSorted.indexOf(place.avgRating) + 1}));

  currentPlaces = currentPlaces
    .map(place => ({...place, rank: place.rank === 0? "?" : place.rank}));

  const placeList = currentPlaces.map(
    (placeData) => (
      <Place key={placeData.place_id} placeData={placeData} />
    )
  );
  return (
    <Row>
    <Col span={24}>{placeList}</Col>
  </Row>
  );
}

export default PlaceList;
