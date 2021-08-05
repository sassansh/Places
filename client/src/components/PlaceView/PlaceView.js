import './PlaceView.css';

import { Col, Divider, Rate, Row, Tooltip, Typography } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import {
  addFavouritePlace,
  deleteFavouritePlace,
  getFavourites
} from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import ReviewList from '../ReviewList/ReviewList';
import { getPlaces } from '../../redux/actions/placeActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { useEffect } from 'react';

const { Title } = Typography;

function PlaceView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getReviews());
    dispatch(getFavourites());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );
  const places = useSelector((state) => state.places.allPlaces);
  const myFavourites = useSelector((state) => state.users.favourite_places);
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  const currentPlace = places.find(
    (place) => place.place_id === currentPlaceID
  );
  const reviewsData = useSelector((state) => state.reviews.allReviews).filter(
    (review) => review.place_id === currentPlaceID
  );

  const averageScore =
    reviewsData
      .map((reviewData) => reviewData.rating)
      .reduce((p, c) => p + c, 0) / reviewsData.length;
  const averageScoreString = averageScore
    ? Number(averageScore.toFixed(2)).toString()
    : '?';

  function addFavourite() {
    dispatch(addFavouritePlace(currentPlaceID));
  }

  function removeFavourite() {
    dispatch(deleteFavouritePlace(currentPlaceID));
  }

  return (
    <div className='container'>
      <Row
        style={{
          marginLeft: '20px',
          marginBottom: '10px'
        }}
      >
        <Col span={24}>
          <Row justify='center'>
            <Col lg={12} md={12} sm={12}>
              <Title level={2}>
                {currentPlace.name}{' '}
                {myFavourites.includes(currentPlaceID) ? (
                  <Tooltip title='Remove favourite'>
                    <HeartFilled
                      onClick={removeFavourite}
                      style={{ color: 'red' }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title='Favourite place'>
                    <HeartOutlined
                      onClick={addFavourite}
                      style={{ color: 'red' }}
                    />
                  </Tooltip>
                )}
              </Title>
            </Col>
            <Col lg={0} md={0} sm={0} xs={24} />
            <Col lg={12} md={12} sm={12} className='categoryName'>
              <Title level={3}>
                {currentCategory.name_singular + ' ' + currentCategory.emoji}
              </Title>
            </Col>
          </Row>
          <Row className='placeviewaddress'>
            <span>📍 {currentPlace.address}</span>
          </Row>
          <Row className='overallRating'>
            <span>
              <Rate allowHalf defaultValue={averageScore} disabled />
              {averageScoreString} out of 5
            </span>
          </Row>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5
        }}
      />
      <Row type='flex' justify='center' gutter={[24, 24]} align='middle'>
        <Col xxl={8} lg={12} md={24} xs={24}>
          <img
            src={currentPlace.ImageURL}
            style={{
              marginTop: '20px',
              objectFit: 'cover',
              height: '300px',
              width: '100%'
            }}
            alt={currentPlace.name}
          />
        </Col>
        <Col lg={0} xxl={2} />
        <Col xxl={8} lg={12} md={24} xs={24}>
          <ReviewList reviewsData={reviewsData} />
        </Col>
      </Row>
    </div>
  );
}

export default PlaceView;
