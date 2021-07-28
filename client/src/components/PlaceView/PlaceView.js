import './PlaceView.css';

import { Avatar, Col, Divider, Image, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from '../ReviewList/ReviewList';
import RatingDetail from "../RatingDetail/RatingDetail";
import { getCategories } from '../../redux/actions/categoryActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { useEffect } from 'react';
// >>>>>>> main

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
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  const currentPlace = places.find(
    (place) => place.place_id === currentPlaceID
  );

  let reviewsData = useSelector((state) => state.reviews.allReviews).filter(
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
        outOf: 6,
        score: 1
      },
      {
        name: "Fun",
        outOf: 3,
        score: 2
      },
      {
        name: "Convenience",
        outOf: 7,
        score: 3
      },
      {
        name: "Quiet",
        outOf: 5,
        score: 4
      },
      {
        name: "Sand",
        outOf: 5,
        score: 5
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
    <div>
      <Row
        style={{
          marginLeft: "20px",
          marginBottom: "10px"
        }}
      >
        <Col span={24}>
          <Row>
            <Title level={2}>
              {currentPlace.name}{" "}
            </Title>
          </Row>
          <Row>
            <Title level={4}>
              {currentCategory.name_singular + ' ' + currentCategory.emoji}
            </Title>
          </Row>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <Row gutter={[16,16]} align="middle">
        <Col
          lg={12}
        >
          <Image
            className="image"
            src={currentPlace.ImageURL}
          />
        </Col>
        <Col lg={12}>
          <RatingDetail criteria={ratingCriteria} score={15} outOf={25} />
        </Col>
      </Row>
      <Row justify="center">
        <ReviewList reviewsData={reviewsData} />
      </Row>
    </div>
  );
}

export default PlaceView;
