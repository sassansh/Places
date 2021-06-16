import "./CategoryList.css";

import CategoriesContext from "../../context/CategoriesContext";
import Category from "../Category/Category";
import { useContext } from "react";

function CategoryList() {
  const [categories] = useContext(CategoriesContext);

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
