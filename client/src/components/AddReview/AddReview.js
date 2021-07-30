import './AddReview.css';

import {
  Avatar,
  Button,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Typography,
} from 'antd';
import {
  addReview,
  editReview,
  getReviews,
} from '../../redux/actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

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

  const [rateValue, setRateValue] = useState(0);

  useEffect(() => {
    if (!reviewLoadedRef.current) {
      dispatch(getReviews());
      if (existingReview) {
        setRateValue(existingReview.rating);
      }
      reviewLoadedRef.current = true;
    }
  }, [dispatch, existingReview]);

  const { Title } = Typography;

  const place = places.find((element) => element.place_id === currentPlaceID);
  const category = categories.find(
    (element) => element.category_id === place.category_id
  );
  // const customCriteria = category.custom_criteria;
  const customCriteria = ['Fun', 'Softness', 'Noise Level'];
  let customRatings = [1, 3, 3, 0, 0];

  function handleRateChangeCustom() {
    let total = 0;
    for (let i = 0; i < customRatings.length; i++) {
        total += customRatings[i];
    }
    let avg = total / customCriteria.length;
    setRateValue(avg);
  }

  function handleRateChange(value) {
    setRateValue(value);
  }

  function handleSubmitReview(value) {
    let newReview = {};
    if (existingReview) {
      newReview = {
        ...existingReview,
        rating: rateValue,
      };
      dispatch(editReview(newReview, props.history));
    } else {
      newReview = {
        place_id: currentPlaceID,
        rating: rateValue,
      };
      dispatch(addReview(newReview, props.history));
    }
  }

  function getRate() {
    if (customCriteria.length === 0) {
      return (
        <Rate
          style={{ fontSize: '15px + 1vw' }}
          tooltips={desc}
          onChange={handleRateChange}
          value={rateValue}
        />
      );
    } else {
      let customRate = customCriteria.map((criteria) => 
        <li className="criteriaList">
          <span className="criteriaName">{criteria + ":"}</span>
            <span>&ensp;</span>
            <Rate
              style={{ fontSize: '25px'}}
              tooltips={desc}
              onChange={handleRateChangeCustom}
              disabled={false}
            />
        </li>
      );
      return (
        <div>
          <Row justify="start">
              <Col>
                <span className="overall">
                  <Rate
                    style={{ fontSize: '40px' }}
                    tooltips={desc}
                    value={rateValue}
                    disabled={true}
                  />
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
    <div className="container">
      <Row justify="left">
        <Col>
          <Title level={2}>
            {existingReview ? 'Edit Review' : 'Add Review'}
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <Row justify="center">
        <div className="column1">
          <Col span={3}>
            <img
              src={place.ImageURL}
              className="placeImg"
              alt="place image"
            />
          </Col>
        </div>
        <Col className="column2" span={3}>
          <div className="placeNameRate">
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {category.emoji}
            </Avatar>{' '}
            {category.name_singular}
          </div>
        </Col>
        <Col span={2}>
        </Col>
        <Col className="column3" span={5}>
          <br />
          <span className="ratingText">Overall Rating</span>
          <br />
          {getRate()}
          <br />
          <span className="submit">
            <Button
              className="button"
              type="primary"
              onClick={handleSubmitReview}
              size="large"
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
