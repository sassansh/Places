import "./ReviewList.css";
import { Row, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Review from "../Review/Review";
import { useSelector, useDispatch } from "react-redux";
import { setPlace } from "../../redux/actions/placeActions";

function ReviewList(props) {
  const dispatch = useDispatch();
  let reviewsData = props.reviewsData;
  let currentUser = useSelector(state => state.users.currentUserID);
  //let currentPlaceID = useSelector(state => state.place.currentPlaceID);

  reviewsData = reviewsData
    .filter((review) => review.user_id === currentUser)
    .concat(
      reviewsData
        .filter((review) => review.user_id != currentUser)
    );

  let currentUserHasReview = !(reviewsData.find((review) => review.user_id === currentUser));

  let reviews = reviewsData.map((reviewData) => (
    <Review key={reviewData.review_id} review={reviewData} />
  ));

  let reviewTitleText = reviewsData.length === 1? " Review" : " Reviews";
  return (
    <div>
      <Row>
        <h1>{reviewsData.length + reviewTitleText}</h1>
      </Row>
      <Row>
        {currentUserHasReview &&
          <Link to="/addReview" onClick={() => {}} className="add-review-button">
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Add Review
            </Button>
          </Link>
        }
      </Row>
      <ul>{reviews}</ul>
    </div>
  );
}

export default ReviewList;
