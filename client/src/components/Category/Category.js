import "./Category.css";

import { Avatar, Card } from "antd";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory } from "../../redux/actions/categoryActions";

function Category({ category }) {
  const dispatch = useDispatch();
  // const currentGroupID = useSelector(state => state.groups.currentGroupID);
  // const places = useSelector(state => state.places.allPlaces);
  // let numPlaces = 0;
  // places.forEach(place => {
  //   if (place.group_id === currentGroupID && place.category_id === category.category_id) {
  //     numPlaces++;
  //   }
  // });
  return (
    <Link to="/categoryview" onClick={() => {
      dispatch(setCurrentCategory(category.category_id));
    }}>
      <Card style={{ margin: 16 }}>
        <span className="category">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {category.emoji}
          </Avatar>
          <span className="category-name">{category.name}</span>
        </span>

        <span className="num-of-places">{category.numPlaces} Places</span>
      </Card>
    </Link>
  );
}

export default Category;
