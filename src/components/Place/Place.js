import "./Place.css";

import { Avatar, Card, Rate } from "antd";

import { Link } from "wouter";

function Place({ placeData }) {
  return (
    <Link to="/placeview">
      <Card style={{ margin: 16 }}>
        <span className="place">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {placeData.rank}
          </Avatar>
          <span className="place-name">{placeData.name}</span>
        </span>

        <span className="place-rating">
          <Rate disabled allowHalf defaultValue={placeData.rating} />
          <span className="num-of-reviews">{placeData.numRaters}</span>
        </span>
      </Card>
    </Link>
  );
}

export default Place;
