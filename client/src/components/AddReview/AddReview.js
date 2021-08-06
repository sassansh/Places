import './AddReview.css';

import { Avatar, Button, Col, Divider, Rate, Row, Typography } from 'antd';
import {
  addReview,
  editReview,
  getReviews
} from '../../redux/actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';
import RoundedRate from '../RoundedRate/RoundedRate';
import { useEffect, useRef, useState } from 'react';

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

  const [rateValues, setRateValues] = useState([...Array(customCriteria.length)].map(() => 0));

  useEffect(() => {
    if (!reviewLoadedRef.current) {
        dispatch(getReviews());
        if (existingReview) {
            setRateValues(existingReview.rating);
        }
        reviewLoadedRef.current = true;
    }
  }, [dispatch, existingReview]);

  const { Title } = Typography;

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
          <span className='overall'>
            <Rate
              style={{ fontSize: '40px' }}
              onChange={(value) => setRateValues([value])}
              value={rateValues[0]}
              allowHalf
            />
          </span>
        );
      } else {
        let customRate = customCriteria.map((criterion, index) => {
            return (
                <li className='criteriaList' key={'criterion' + index}>
                <span className='criteriaName'>{customCriteria[index] + ':'}</span>
                <span>&ensp;</span>
                <Rate
                  style={{ fontSize: '25px' }}
                  onChange={(value) => {
                    setRateValues([...rateValues.slice(0, index), value, ...rateValues.slice(index+1)]);
                    console.log(rateValues);
                  }}
                  value={rateValues[index]}
                  allowHalf
                />
              </li>
            );
        });
        return (
            <div>
              <Row justify='start'>
                <Col>
                  <span className='overall'>
                    <RoundedRate style={{ fontSize: '40px' }} value={rateValues.reduce((p, c) => p + c, 0) / customCriteria.length} disabled allowHalf />
                  </span>
                  <ul>{customRate}</ul>
                </Col>
              </Row>
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
      <Row justify='center'>
        <div className='column1'>
          <Col span={5}>
            <img src={place.ImageURL} className='placeImg' alt='place' />
          </Col>
        </div>
        <Col className='column2' span={5}>
          <div className='placeNameRate'>
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {category.emoji}
            </Avatar>{' '}
            {category.name_singular}
          </div>
        </Col>
        <Col span={1} />
        <Col className='column3' span={8}>
          <br />
          <span className='ratingText'>Overall Rating</span>
          <br />
          {getRate()}
          <br />
          <span className='submit'>
            <Button
              className='button'
              type='primary'
              onClick={handleSubmitReview}
              size='large'
            >
              Submit
            </Button>
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default AddReview;
