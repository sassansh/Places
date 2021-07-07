import "./Place.css";

import { Avatar, Card, Rate } from "antd";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPlace } from "../../redux/actions/placeActions"

function Place({ placeData }) {
  const dispatch = useDispatch();

  return (
    <Link to="/placeview" onClick={() => dispatch(setCurrentPlace(placeData.place_id))} >
      <Card style={{ margin: 16 }}>
        <span className="place">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {placeData.rank}
          </Avatar>
          <span className="place-name">{placeData.name}</span>
        </span>

        {placeData.numReviews > -1? //TODO: CHANGE BACK TO 0, THIS IS JUST FOR TESTING
          <span className="place-rating">
            <Rate disabled allowHalf defaultValue={placeData.avgRating} />
            <span className="num-of-reviews">{placeData.numReviews}</span>
          </span>
          :
          <span className="place-rating">
            <span className="num-of-reviews">No reviews yet</span>
          </span>
        }
      </Card>
    </Link>
  );
}

export default Place;
