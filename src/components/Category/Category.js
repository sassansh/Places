import "./Category.css";
import { Card, Avatar } from "antd";
import { Link } from "react-router-dom";

function Category({ category }) {
  return (
    <Link to="/categoryview">
      <Card style={{ margin: 16 }}>
        <span className="category">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {category.categoryEmoji}
          </Avatar>
          <span className="category-name">{category.categoryName}</span>
        </span>

        <span className="num-of-places">
          {category.places.length + " Places"}
        </span>
      </Card>
    </Link>
  );
}

export default Category;
