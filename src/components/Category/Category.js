import "./Category.css";
import { Card, Col, Row, Avatar } from "antd";
import { Link } from "react-router-dom";

function Category(props) {
  return (
    <Link to="/categoryview">
      <Card style={{ margin: 16 }}>
        <span className="category">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {props.category.categoryEmoji}
          </Avatar>
          <span className="category-name">{props.category.categoryName}</span>
        </span>

        <span className="num-of-places">
          {props.category.places.length + " Places"}
        </span>
      </Card>
    </Link>
  );
}

export default Category;
