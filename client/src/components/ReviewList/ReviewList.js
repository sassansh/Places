import "./ReviewList.css";
import Review from "../Review/Review";

function ReviewList(props) {
  let reviewsData = props.reviewsData;

  let reviews = reviewsData.map((reviewData) => (
    <Review key={reviewData.review_id} review={reviewData} />
  ));
  return (
    <div>
      <h1>{reviewsData.length + " Reviews"}</h1>
      <ul>{reviews}</ul>
    </div>
  );
}

export default ReviewList;
