import "./Category.css";

import { Avatar, Card } from "antd";

import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Category({ category }) {
  const currentGroupID = useSelector(state => state.groups.currentGroupID);
  const places = useSelector(state => state.places.allPlaces);
  let numPlaces = 0;
  places.forEach(place => {
    if (place.group_id === currentGroupID && place.category_id === category.category_id) {
      numPlaces++;
    }
  });
  return (
    <Link to="/categoryview">
      <Card style={{ margin: 16 }}>
        <span className="category">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {category.emoji}
          </Avatar>
          <span className="category-name">{category.name}</span>
        </span>

        <span className="num-of-places">{numPlaces} Places</span>
      </Card>
    </Link>
  );
}

export default Category;
