import './Review.css';

import { Button, Card, Col, Rate, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { setCurrentPlace } from '../../redux/actions/placeActions';

function Review(props) {
  let dispatch = useDispatch();
  let review = props.review;
  let users = useSelector((state) => state.users.allUsers);
  let reviewer = users.find(
    (element) => element.user_id === review.user_id
  ).name;
  let isCurrentUser =
    review.user_id === useSelector((state) => state.users.user.user_id);
  let currentPlaceID = useSelector((state) => state.places.currentPlaceID);

  return (
    <li>
      <Card className="review" size="small">
        <Row>
          <Col lg={12} className="reviewer">
            {reviewer}
          </Col>
          <Col lg={12} className="rating">
            <Rate allowHalf defaultValue={review.rating[0]} disabled={true} />
          </Col>
        </Row>
        {isCurrentUser && (
          <Row justify="end" className="edit-review">
            <Link
              to="/addReview"
              onClick={() => {
                dispatch(setCurrentPlace(currentPlaceID));
              }}
            >
              <Button type="primary" icon={<EditOutlined />} size="large">
                Edit Review
              </Button>
            </Link>
          </Row>
        )}
      </Card>
    </li>
  );
}

export default Review;
