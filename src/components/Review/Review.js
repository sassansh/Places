import "./Review.css";
import { Card, Rate, Col, Row } from "antd";

function Review(props) {
  return (
    <li>
      <Card className="review" size="small" isScore={props.review.isScore}>
        <Row>
          <Col lg={12} className="reviewer">
            <h2>{props.review.reviewer}</h2>
          </Col>
          <Col lg={12} className="rating">
            <Rate
              allowHalf
              defaultValue={props.review.rating}
              disabled={true}
            />
          </Col>
        </Row>
      </Card>
    </li>
  );
}

export default Review;
