import './AddReview.css';

import {
  Avatar,
  Button,
  Col,
  Divider,
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
  const [rateValue0, setRateValue0] = useState(0);
  const [rateValue1, setRateValue1] = useState(0);
  const [rateValue2, setRateValue2] = useState(0);
  const [rateValue3, setRateValue3] = useState(0);
  const [rateValue4, setRateValue4] = useState(0);

  // const customCriteria = category.custom_criteria;
  const customCriteria = ['Fun', 'Softness', 'Noise Level', 'Cleanliness'];

  useEffect(() => {
    if (!reviewLoadedRef.current) {
      dispatch(getReviews());
      if (existingReview) {
        setRateValue(existingReview.rating);
      }
      reviewLoadedRef.current = true;
    }
  }, [dispatch, existingReview]);

  useEffect(() => {
    let total = [rateValue0, rateValue1, rateValue2, rateValue3, rateValue4].reduce((a, b) => a + b, 0);
    let avg = total / customCriteria.length;
    setRateValue(avg);
  }, [customCriteria.length, rateValue0, rateValue1, rateValue2, rateValue3, rateValue4]);

  const { Title } = Typography;

  const place = places.find((element) => element.place_id === currentPlaceID);
  const category = categories.find(
    (element) => element.category_id === place.category_id
  );

  function handleRateChangeCustom0(value) {
    setRateValue0(value);
  }

  function handleRateChangeCustom1(value) {
    setRateValue1(value);
  }

  function handleRateChangeCustom2(value) {
    setRateValue2(value);
  }

  function handleRateChangeCustom3(value) {
    setRateValue3(value);
  }

  function handleRateChangeCustom4(value) {
    setRateValue4(value);
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
    let customRate;
    if (customCriteria.length < 2) {
      return (
        <Rate
          style={{ fontSize: '15px + 1vw' }}
          onChange={handleRateChange}
          value={rateValue}
        />
      );
    } else {
     if (customCriteria.length === 2) {
        customRate = [
        <li className="criteriaList">
          <span className="criteriaName">{customCriteria[0] + ":"}</span>
            <span>&ensp;</span>
            <Rate
              style={{ fontSize: '25px'}}
              onChange={handleRateChangeCustom0}
              value={rateValue0}
            />
        </li>,
        <li className="criteriaList">
        <span className="criteriaName">{customCriteria[1] + ":"}</span>
          <span>&ensp;</span>
          <Rate
            style={{ fontSize: '25px'}}
            onChange={handleRateChangeCustom1}
            value={rateValue1}
          />
        </li>        
      ];
    } else if (customCriteria.length === 3) {
      customRate = [
      <li className="criteriaList">
        <span className="criteriaName">{customCriteria[0] + ":"}</span>
          <span>&ensp;</span>
          <Rate
            style={{ fontSize: '25px'}}
            onChange={handleRateChangeCustom0}
            value={rateValue0}
          />
      </li>,
      <li className="criteriaList">
      <span className="criteriaName">{customCriteria[1] + ":"}</span>
        <span>&ensp;</span>
        <Rate
          style={{ fontSize: '25px'}}
          onChange={handleRateChangeCustom1}
          value={rateValue1}
        />
      </li>,
            <li className="criteriaList">
            <span className="criteriaName">{customCriteria[2] + ":"}</span>
              <span>&ensp;</span>
              <Rate
                style={{ fontSize: '25px'}}
                onChange={handleRateChangeCustom2}
                value={rateValue2}
              />
      </li>         
    ];
  } else if (customCriteria.length === 4) {
    customRate = [
    <li className="criteriaList">
      <span className="criteriaName">{customCriteria[0] + ":"}</span>
        <span>&ensp;</span>
        <Rate
          style={{ fontSize: '25px'}}
          onChange={handleRateChangeCustom0}
          value={rateValue0}
        />
    </li>,
    <li className="criteriaList">
    <span className="criteriaName">{customCriteria[1] + ":"}</span>
      <span>&ensp;</span>
      <Rate
        style={{ fontSize: '25px'}}
        onChange={handleRateChangeCustom1}
        value={rateValue1}
      />
    </li>,
          <li className="criteriaList">
          <span className="criteriaName">{customCriteria[2] + ":"}</span>
            <span>&ensp;</span>
            <Rate
              style={{ fontSize: '25px'}}
              onChange={handleRateChangeCustom2}
              value={rateValue2}
            />
    </li>,
      <li className="criteriaList">
      <span className="criteriaName">{customCriteria[3] + ":"}</span>
        <span>&ensp;</span>
        <Rate
          style={{ fontSize: '25px'}}
          onChange={handleRateChangeCustom3}
          value={rateValue3}
        />
    </li>           
  ];
  } else {
    customRate = [
      <li className="criteriaList">
        <span className="criteriaName">{customCriteria[0] + ":"}</span>
          <span>&ensp;</span>
          <Rate
            style={{ fontSize: '25px'}}
            onChange={handleRateChangeCustom0}
            value={rateValue0}
          />
      </li>,
      <li className="criteriaList">
      <span className="criteriaName">{customCriteria[1] + ":"}</span>
        <span>&ensp;</span>
        <Rate
          style={{ fontSize: '25px'}}
          onChange={handleRateChangeCustom1}
          value={rateValue1}
        />
      </li>,
            <li className="criteriaList">
            <span className="criteriaName">{customCriteria[2] + ":"}</span>
              <span>&ensp;</span>
              <Rate
                style={{ fontSize: '25px'}}
                onChange={handleRateChangeCustom2}
                value={rateValue2}
              />
      </li>,
        <li className="criteriaList">
        <span className="criteriaName">{customCriteria[3] + ":"}</span>
          <span>&ensp;</span>
          <Rate
            style={{ fontSize: '25px'}}
            onChange={handleRateChangeCustom3}
            value={rateValue3}
          />
      </li>,
        <li className="criteriaList">
          <span className="criteriaName">{customCriteria[4] + ":"}</span>
          <span>&ensp;</span>
          <Rate
            style={{ fontSize: '25px'}}
            onChange={handleRateChangeCustom4}
            value={rateValue4}
          />
      </li>        
      ];
  }
      return (
        <div>
          <Row justify="start">
              <Col>
                <span className="overall">
                  <Rate
                    style={{ fontSize: '40px' }}
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
          <Col span={5}>
            <img
              src={place.ImageURL}
              className="placeImg"
              alt="place"
            />
          </Col>
        </div>
        <Col className="column2" span={5}>
          <div className="placeNameRate">
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {category.emoji}
            </Avatar>{' '}
            {category.name_singular}
          </div>
        </Col>
        <Col span={1}>
        </Col>
        <Col className="column3" span={8}>
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
