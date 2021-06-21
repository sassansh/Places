import "./AddReview.css";

import ReviewsContext from "../../context/ReviewsContext";
import CurrentUserIDContext from "../../context/CurrentUserIDContext";
import CurrentPlaceIDContext from "../../context/CurrentPlaceIDContext";
import CategoriesContext from "../../context/CategoriesContext";
import PlacesContext from "../../context/PlacesContext";
import { useState, useContext } from "react";
import { Link } from "wouter";

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

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function AddReview() {

  const [reviews] = useContext(ReviewsContext);
  const [currentUserID] = useContext(CurrentUserIDContext);
  const [currentPlaceID] = useContext(CurrentPlaceIDContext);
  const [places] = useContext(PlacesContext);
  const [categories] = useContext(CategoriesContext);

  const [rateValue, setRateValue] = useState(0);
  const { Title } = Typography;

  let place = places.find((element) => element.place_id === currentPlaceID);
  let category = categories.find((element) => element.category_id === place.category_id);

  function handleRateChange(value) {
    setRateValue(value);
  }

  function handleSubmitReview(value) {
    reviews.push({
      review_id: reviews.length + 1,
      user_id: currentUserID,
      place_id: currentPlaceID,
      rating: rateValue,
    });
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
              <Button className="button" type="primary" onClick={handleSubmitReview}>
                Submit
              </Button>
            </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AddReview;
