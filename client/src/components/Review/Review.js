import './Review.css';

import { Button, Card, Col, Rate, Row, Avatar} from 'antd';
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

  let criteria = ["Beauty", "Fun", "Convenience", "Quiet", "Sand"];

  let scoreBlocks = review.rating.map((critRating) =>
    <Col>
      <Avatar
        style={{ color: '#ffffff', backgroundColor: '#512da8' }}
        shape="square"
        size={64}
      >
        {critRating}
      </Avatar>
    </Col>
  );
  return (
    <Card>
    <Row>
      <Col md={7} sm={24} className="reviewer">
        <Row>
          {reviewer}
        </Row>
        {isCurrentUser && (
          <Row className="edit-review">
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
      </Col>
      <Col md={15} sm={24} className="rating">
        <Row wrap={false} gutter={[16,16]}>
          {scoreBlocks}
        </Row>
      </Col>
      </Row>
    </Card>
  );
}

//<Rate allowHalf defaultValue={review.rating} disabled={true} />

export default Review;
