import './PlaceView.css';

import { Avatar, Col, Divider, Image, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from '../ReviewList/ReviewList';
import { getCategories } from '../../redux/actions/categoryActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { useEffect } from 'react';

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
  let averageScoreString = averageScore
    ? Number(averageScore.toFixed(2)).toString()
    : '?';

  return (
    <div className="container">
      <Row
        style={{
          marginLeft: '20px',
        }}
      >
        <Col lg={12}>
          <Title level={2}>
            {currentPlace.name}{' '}
            <Avatar
              style={{ color: '#ffffff', backgroundColor: '#512da8' }}
              shape="square"
              size={64}
            >
              {averageScoreString}
            </Avatar>
          </Title>
        </Col>
        <Col lg={12} className="category-of-place">
          <Title level={2}>
            {currentCategory.name_singular + ' ' + currentCategory.emoji}
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <Row
        style={{
          marginRight: '0px',
        }}
      >
        <Col
          lg={10}
          style={{
            marginTop: '20px',
          }}
        >
          <Image
            width={500}
            src={currentPlace.ImageURL}
            style={{
              borderRadius: '15px',
            }}
          />
        </Col>
        <Col lg={4}></Col>
        <Col lg={10}>
          <ReviewList reviewsData={reviewsData} />
        </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
