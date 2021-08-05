import './ReviewList.css';

import { Button, Col, Row } from 'antd';

import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import Review from '../Review/Review';
import { useSelector } from 'react-redux';

function ReviewList(props) {
  let reviewsData = props.reviewsData;
  const currentUser = useSelector((state) => state.users.user.user_id);

  reviewsData = reviewsData
    .filter((review) => review.user_id === currentUser)
    .concat(reviewsData.filter((review) => review.user_id !== currentUser));

  const currentUserHasReview = !reviewsData.find(
    (review) => review.user_id === currentUser
  );

  const reviews = reviewsData.map((reviewData) => (
    <Review key={reviewData.review_id} review={reviewData} />
  ));

  const reviewTitleText = reviewsData.length === 1 ? ' Review' : ' Reviews';
  return (
    <Col span={24}>
      <Row>
        <h1>{reviewsData.length + reviewTitleText}</h1>
      </Row>
      <Row>
        {currentUserHasReview && (
          <Link to='/addReview' className='add-review-button'>
            <Button type='primary' icon={<PlusOutlined />} size='large'>
              Add Review
            </Button>
          </Link>
        )}
      </Row>
      <ul style={{ padding: '0px' }}>{reviews}</ul>
    </Col>
  );
}

export default ReviewList;
