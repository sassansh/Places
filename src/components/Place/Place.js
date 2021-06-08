import "./Place.css";
import { Card, Avatar, Rate } from "antd";

function Place(props) {
  let placeData = props.placeData;
  return (
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
  );
}

export default Place;
