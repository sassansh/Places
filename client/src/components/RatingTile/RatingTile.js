import "./RatingTile.css";
import { Avatar, Typography } from "antd";

function RatingTile(props) {
  const ratingString = props.score !== undefined ? Number(props.score.toFixed(2)).toString() + "/" + props.outOf : "?";
  return props.isMainRating? (
    <Avatar
      style={{ color: "#ffffff", backgroundColor: "#512da8"}}
      shape="square"
      size={64}
    >
      {ratingString}
    </Avatar>
  ) : (
      <Avatar
        style={{
        backgroundColor: '#87d068',
        }}
        size={48}
        shape="square"
      >
        {ratingString}
      </Avatar>
  );
}

export default RatingTile;
