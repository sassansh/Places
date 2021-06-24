import "./Review.css";
import { Card, Col, Rate, Row } from "antd";
import { useSelector } from "react-redux";

function Review(props) {
  let review = props.review;
  let users = useSelector(state=>state.users.allUsers);
  let reviewer = users.find(element => element.user_id === review.user_id).name;
  return (
    <li>
      <Card className="review" size="small">
        <Row>
          <Col lg={12} className="reviewer">
            {reviewer}
          </Col>
          <Col lg={12} className="rating">
            <Rate
              allowHalf
              defaultValue={review.rating}
              disabled={true}
            />
          </Col>
        </Row>
      </Card>
    </li>
  );
}

export default Review;
