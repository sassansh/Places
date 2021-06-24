import "./AddReview.css";

import {
  Avatar,
  Button,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { addReview, editReview } from "../../redux/actions/reviewActions";
import { useState, useEffect } from "react";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function AddReview() {
  const dispatch = useDispatch();
  const reviews = useSelector(state=>state.reviews.allReviews);
  const currentUserID = useSelector(state=>state.users.currentUserID);
  const currentPlaceID = useSelector(state=>state.places.currentPlaceID);
  const places = useSelector(state=>state.places.allPlaces);
  const categories = useSelector(state=>state.categories.allCategories);

  const [rateValue, setRateValue] = useState(0);
  const [reviewExists, setReviewExists] = useState(false);
  const [existingReview, setExistingReview] = useState({});

  function checkIfReviewExists() {
    reviews.forEach (
      (element) => {
        if (element.user_id === currentUserID && element.place_id === currentPlaceID) {
          setReviewExists(true);
          setExistingReview(element);
          setRateValue(element.rating);
          return;
        }
      }
    );
  }

  useEffect(() => {
    checkIfReviewExists();
    // eslint-disable-next-line
  },[]);

  const { Title } = Typography;

  let place = places.find((element) => element.place_id === currentPlaceID);
  let category = categories.find(
    (element) => element.category_id === place.category_id
  );

  function handleRateChange(value) {
    setRateValue(value);
  }

  function handleSubmitReview(value) {
    checkIfReviewExists();
    let index = reviews.findIndex(
      (element) => element.review_id === existingReview.review_id
    );
    let newReview = {};
    if (reviewExists) {
        newReview = {
          ...existingReview,
          rating: rateValue,
        };
        dispatch(editReview(newReview, index));
    } else {
      newReview = {
        review_id: reviews.length + 1,
        user_id: currentUserID,
        place_id: currentPlaceID,
        rating: rateValue,
      };
      dispatch(addReview(newReview));
    }
  }

  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={24}>
          <Title level={2}>Add Review</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row>
        <Col lg={4} md={5} sm={24}>
          <Image
            preview={false}
            src={place.ImageURL}
            style={{
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col
          lg={6}
          md={7}
          sm={24}
          style={{
            marginLeft: "20px",
          }}
        >
          <div className="restaurantNameRate">
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {category.emoji}
            </Avatar>{" "}
            {category.name}
          </div>
        </Col>
        <Col lg={13} md={11} sm={24} xs={24} style={{ textAlign: "center" }}>
          <span className="ratingText">Select Overall Rating</span>
          <br />
          <Rate
            style={{ fontSize: "2.5vw" }}
            tooltips={desc}
            onChange={handleRateChange}
            value={rateValue}
          />
          <br />
          <Link to="/submittedReview">
            <Button
              className="button"
              type="primary"
              onClick={handleSubmitReview}
            >
              Submit
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AddReview;
