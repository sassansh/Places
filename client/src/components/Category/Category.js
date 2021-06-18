import "./Category.css";

import { Avatar, Card } from "antd";

import { Link } from "wouter";

function Category({ category }) {
  return (
    <Link to="/categoryview">
      <Card style={{ margin: 16 }}>
        <span className="category">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {category.emoji}
          </Avatar>
          <span className="category-name">{category.name}</span>
        </span>

        <span className="num-of-places">8 Places</span>
      </Card>
    </Link>
  );
}

export default Category;
