import './AddReview.css';

import { Avatar, Button, Col, Divider, Rate, Row, Typography } from 'antd';
import {
  addReview,
  editReview,
  getReviews
} from '../../redux/actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import RoundedRate from '../RoundedRate/RoundedRate';

const { Title } = Typography;

function AddReview(props) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews);
  const currentUserID = useSelector((state) => state.users.user.user_id);
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  const places = useSelector((state) => state.places.allPlaces);
  const categories = useSelector((state) => state.categories.allCategories);
  const reviewLoadedRef = useRef(false);
  const existingReview = reviews.find(
    (review) =>
      review.user_id === currentUserID && review.place_id === currentPlaceID
  );
  const place = places.find((element) => element.place_id === currentPlaceID);
  const category = categories.find(
    (element) => element.category_id === place.category_id
  );
  const customCriteria = category.custom_criteria;
  const [rateValues, setRateValues] = useState(
    [...Array(customCriteria.length)].map(() => 0)
  );

  useEffect(() => {
    if (!reviewLoadedRef.current) {
      dispatch(getReviews());
      if (existingReview) {
        setRateValues(existingReview.rating);
      }
      reviewLoadedRef.current = true;
    }
  }, [dispatch, existingReview]);

  function handleSubmitReview() {
    let newReview = {};
    if (existingReview) {
      newReview = {
        ...existingReview,
        rating: rateValues
      };
      dispatch(editReview(newReview, props.history));
    } else {
      newReview = {
        place_id: currentPlaceID,
        rating: rateValues
      };
      dispatch(addReview(newReview, props.history));
    }
  }

  function getRate() {
    if (customCriteria.length < 2) {
      return (
        <span>
          <Rate
            style={{ fontSize: '40px' }}
            onChange={(value) => setRateValues([value])}
            value={rateValues[0]}
          />
        </span>
      );
    } else {
      let customRate = customCriteria.map((criterion, index) => {
        return (
          <li key={'criterion' + index}>
            <span>{customCriteria[index] + ':'}</span>
            <span>&ensp;</span>
            <Rate
              style={{ fontSize: '25px' }}
              onChange={(value) => {
                setRateValues([
                  ...rateValues.slice(0, index),
                  value,
                  ...rateValues.slice(index + 1)
                ]);
              }}
              value={rateValues[index]}
            />
          </li>
        );
      });
      return (
        <div>
          <span>
            <RoundedRate
              style={{ fontSize: '40px' }}
              value={
                rateValues.reduce((p, c) => p + c, 0) / customCriteria.length
              }
              disabled
            />
          </span>
          <ul>{customRate}</ul>
        </div>
      );
    }
  }

  getRate();

  return (
    <div className='container'>
      <Row justify='left'>
        <Col>
          <Title level={2}>
            {existingReview ? 'Edit Review' : 'Add Review'}
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5
        }}
      />
      <Row className='addReviewName'>
        <Col>
          <div>
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {category.emoji}
            </Avatar>{' '}
            {category.name_singular}
          </div>
        </Col>
      </Row>
      <Row type='flex' justify='center' gutter={[24, 24]} align='center'>
        <Col xxl={8} lg={10} md={12} xs={24}>
          <img
            src={place.ImageURL}
            style={{
              marginTop: '20px',
              objectFit: 'cover',
              height: '300px',
              width: '100%'
            }}
            alt='place'
          />
        </Col>
        <Col xxl={12} lg={10} md={12} sm={13} align='center'>
          <Title level={4}>Overall Rating</Title>
          {getRate()}
          <div>
            <Button type='primary' onClick={handleSubmitReview} size='large'>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddReview;
