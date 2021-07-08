import "./PlaceView.css";

import { Avatar, Col, Divider, Image, Row, Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

import { getPlaces } from "../../redux/actions/placeActions";
import { getCategories } from "../../redux/actions/categoryActions";
import { getReviews } from "../../redux/actions/reviewActions";
import ReviewList from "../ReviewList/ReviewList";
import RatingDetail from "../RatingDetail/RatingDetail";
import RatingTile from "../RatingTile/RatingTile";

function PlaceView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getCategories());
    dispatch(getReviews());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );

  const places = useSelector((state) => state.places.allPlaces);
  const currentPlaceID = useSelector(state => state.places.currentPlaceID);
  const currentPlace = places.find(
    (place) => place.place_id === currentPlaceID
  );

  let reviewsData = useSelector((state => state.reviews.allReviews)).filter(
    (review) => review.place_id === currentPlaceID
  );

  const { Title } = Typography;

  let averageScore =
    reviewsData
      .map((reviewData) => reviewData.rating)
      .reduce((p, c) => p + c, 0) / reviewsData.length;

  // let criterion1 = "Beauty ";
  // let criterion2 = "Fun ";
  // let criterion3 = "Convenience ";
  // let criterion4 = "Quiet ";
  // let criterion5 = "Sand ";

  let ratingCriteria = [
      {
        name: "Beauty",
        outOf: 10,
        score: 8
      },
      {
        name: "Fun",
        outOf: 10,
        score: 8
      },
      {
        name: "Convenience",
        outOf: 10,
        score: 8
      },
      {
        name: "Quiet",
        outOf: 10,
        score: 8
      },
      {
        name: "Sand",
        outOf: 10,
        score: 0
      }
  ];

  // <Row justify="space-between">
  //   <Col>
  //     <Title level={4}>
  //       {criterion1}
  //       <RatingTile score={8} outOf={10} / >
  //     </Title>
  //   </Col>
  //   <Col>
  //     <Title level={4}>
  //       {criterion2}
  //       <RatingTile score={8} outOf={10} / >
  //     </Title>
  //   </Col>
  //   <Col>
  //     <Title level={4}>
  //     {criterion3} <RatingTile score={8} outOf={10} / >
  //     </Title>
  //   </Col>
  //   <Col>
  //     <Title level={4}>
  //     {criterion4} <RatingTile score={8} outOf={10} / >
  //     </Title>
  //   </Col>
  //   <Col>
  //     <Title level={4}>
  //     {criterion5} <RatingTile score={0} outOf={10} / >
  //     </Title>
  //   </Col>
  // </Row>

  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
          marginBottom: "10px"
        }}
      >
        <Col lg={12}>
          <Row>
            <Title level={2}>
              {currentPlace.name}{" "}
              <RatingTile score={32} outOf={50} isMainRating={true} / >
            </Title>
          </Row>
        </Col>
        <Col lg={12} className="category-of-place">
          <Title level={2}>{currentCategory.name_singular + " " + currentCategory.emoji}</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row
        style={{
          marginRight: "0px",
        }}
      >
        <Col
          lg={10}
          style={{
            marginTop: "20px",
          }}
        >
          <Image
            width={500}
            src={currentPlace.ImageURL}
            style={{
              borderRadius: "15px",
            }}
          />
        </Col>
        <Col lg={4}></Col>
        <Col lg={10}>
          <RatingDetail criteria={ratingCriteria} />
          <ReviewList reviewsData={reviewsData} />
        </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
