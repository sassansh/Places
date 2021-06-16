import "./CategoryList.css";
import Category from "../Category/Category";
import { useContext } from "react";
import CategoriesContext from "../../context/CategoriesContext";

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
