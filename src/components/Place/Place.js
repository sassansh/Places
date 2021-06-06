import "./Place.css";
import { Card, Avatar, Rate } from "antd";

function Place() {
  return (
    <Card style={{ margin: 16 }}>
      <span className="place">
        <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
          1
        </Avatar>
        <span className="place-name">Earls Ambleside</span>
      </span>

      <span className="place-rating">
        <Rate disabled allowHalf defaultValue={4.5} />
        <span className="num-of-reviews">451 Reviews</span>
      </span>
    </Card>
  );
}

export default Place;
