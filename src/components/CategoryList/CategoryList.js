import "./CategoryList.css";
import Category from "../Category/Category";
import { useContext } from "react";
import CategoriesContext from "../../context/CategoriesContext";

function CategoryList() {
  const [categories, setCategories] = useContext(CategoriesContext);
  let categoryItems = categories.map((categoryData) => (
    <Category key={categoryData.categoryName} category={categoryData} />
  ));
  return (
    <div>
      <ul>{categoryItems}</ul>
    </div>
  );
}

export default CategoryList;
