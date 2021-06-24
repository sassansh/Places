import "./Place.css";

import { Avatar, Card, Rate } from "antd";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPlace } from "../../redux/actions/placeActions"

function Place({ placeData, rank }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews)
    .filter((review) => review.place_id == placeData.place_id);
  // let numRaters = 0;
  // let allRatings = 0;
  const rating = reviews
        .map((review) => review.rating)
        .reduce((p, c) => p + c, 0) / reviews.length;
        
  return (
    <Link to="/placeview" onClick={() => dispatch(setPlace(placeData.place_id))} >
      <Card style={{ margin: 16 }}>
        <span className="place">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {rank}
          </Avatar>
          <span className="place-name">{placeData.name}</span>
        </span>

        <span className="place-rating">
          <Rate disabled allowHalf defaultValue={rating} />
          <span className="num-of-reviews">{reviews.length}</span>
        </span>
      </Card>
    </Link>
  );
}

export default Place;
