import "./CategoryList.css";

import Category from "../Category/Category";
import { useSelector } from "react-redux";

function CategoryList() {
  const categories = useSelector(state=> state.categories.allCategories);

  let categoryItems = categories.map((category) => (
    <Category key={category.category_id} category={category} />
  ));

  return (
    <div>
      <ul>{categoryItems}</ul>
    </div>
  );
}

export default CategoryList;
