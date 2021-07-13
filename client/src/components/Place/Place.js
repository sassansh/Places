import "./Place.css";

import { Avatar, Card, Rate, Col, Row } from "antd";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPlace } from "../../redux/actions/placeActions"

function Place({ placeData }) {
  const dispatch = useDispatch();

  return (
    <Link to="/placeview" onClick={() => dispatch(setCurrentPlace(placeData.place_id))} >
      <Card style={{ margin: 16 }}>
        <Col>
          <Row justify="space-around">
        <Col lg={18} md={17} sm={15} xs={24}>
          <Row>
        <span className="place">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {placeData.rank}
          </Avatar>
          <span className="place-name">{placeData.name}</span>
        </span>
        </Row>
        </Col>
        <Col lg={6} md={7} sm={9} xs={24}>
          <Row justify="end">
        {placeData.numReviews > 0?
          <span className="place-rating">
            <Rate disabled allowHalf defaultValue={placeData.avgRating} />
            <span className="num-of-reviews">{placeData.numReviews}</span>
          </span>
          :
          <span className="place-rating">
            <span className="num-of-reviews">No reviews yet</span>
          </span>
        }
        </Row>
        </Col>
        </Row>
        </Col>
      </Card>
    </Link>
  );
}

export default Place;
