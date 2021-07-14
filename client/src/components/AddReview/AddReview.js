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
import { addReview, editReview, getReviews } from "../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function AddReview() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews);
  const currentUserID = useSelector((state) => state.users.user.user_id);
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  const places = useSelector((state) => state.places.allPlaces);
  const categories = useSelector((state) => state.categories.allCategories);

  const reviewLoadedRef = useRef(false);
  const existingReview = reviews.find((review) => (review.user_id === currentUserID) && (review.place_id === currentPlaceID));

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
      dispatch(editReview(newReview));
    } else {
      newReview = {
        user_id: currentUserID,
        place_id: currentPlaceID,
        rating: rateValue,
      };
      dispatch(addReview(newReview));
    }
  }

  return (
    <div className="container">
      <Row justify="center">
        <Col lg={12} md={12} sm={14}>
          <Title level={2}>
            {existingReview ?
            "Edit Review" :
            "Add Review"}</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row justify="center">
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
          <div className="placeNameRate">
            <b>{place.name}</b>
            <br />
            <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {category.emoji}
            </Avatar>{" "}
            {category.name_singular}
          </div>
        </Col>
        <Col lg={13} md={11} sm={24} xs={24} style={{ textAlign: "center" }}>
          <span className="ratingText">Select Overall Rating</span>
          <br />
          <Rate
            style={{ fontSize: "30px + 3.5vw" }}
            tooltips={desc}
            onChange={handleRateChange}
            value={rateValue}
          />
          <br />
          <Link to="/placeView">
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
