import './ReviewList.css'
import Review from '../Review/Review'

function ReviewList() {
    let reviews = [
        { reviewer: "Johnny Li", rating: 3.5},
        { reviewer: "Sassan Shokoohi", rating: 2.5},
        { reviewer: "Laura Rodgers", rating: 4},
        { reviewer: "Amir Jafarvand", rating: 5}
    ];

    return (
        <div>
            <Review reviews={reviews} />
        </div>
    );
}

export default ReviewList;