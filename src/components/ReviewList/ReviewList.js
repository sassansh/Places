import './ReviewList.css'
import Review from '../Review/Review'

function ReviewList() {
    let reviewsData = [
        { reviewer: "Johnny Li", rating: 3.5},
        { reviewer: "Sassan Shokoohi", rating: 2.5},
        { reviewer: "Laura Rodgers", rating: 1},
        { reviewer: "Amir Jafarvand", rating: 5}
    ];

    let reviews = reviewsData.map((reviewData) =>
      <Review review={reviewData} />
    );

    return (
      <div>
        <h1>{reviewsData.length + " Reviews"}</h1>
        <ul>{reviews}</ul>
      </div>
    );
}

export default ReviewList;
