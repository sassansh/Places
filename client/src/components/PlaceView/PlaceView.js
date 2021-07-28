import './PlaceView.css';

import { Avatar, Col, Divider, Row, Typography } from 'antd';
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
          marginBottom: "10px"
        }}
      >
        <Col span={24}>
          <Row>
            <Title level={2}>
              {currentPlace.name}{" "}
                <Avatar
                  style={{ color: '#ffffff', backgroundColor: '#512da8' }}
                  shape="square"
                  size={64}
                >
                  {averageScoreString}
                </Avatar>
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
           <Row type="flex" justify="center" gutter={[36,36]} align="middle">
             <Col
               lg={11}
               sm={22}
               xs={22}
             >
               <img src={currentPlace.ImageURL}
               style={{
                 marginTop: '20px',
                 objectFit: "cover",
                 height: "300px",
                 width: "100%",
                 alt: ""
               }}
               />
             </Col>
             <Col lg={11} sm={22} xs={22}>
               <ReviewList reviewsData={reviewsData} />
             </Col>
           </Row>
         </div>
       );
     }

     export default PlaceView;
