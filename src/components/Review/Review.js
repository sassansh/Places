import "./Review.css";
import { Card, Rate, Col, Row } from "antd";

function Review(props) {
  return (
    <li>
      <Card className="review" size="small">
        <Row>
          <Col lg={12} className="reviewer">
            {props.review.reviewer}
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
