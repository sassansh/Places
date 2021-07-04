import "./CategoryList.css";

import Category from "../Category/Category";
//import { useSelector } from "react-redux";

function CategoryList() {
  //const categories = useSelector(state=> state.categories.allCategories);
  const categories = fetch("http://localhost:5000/api/categories/")

  let categoryItems = categories.map((category) => (
    <Category key={category.category_id} category={category} />
  ));

  return (
    <div>
      {categories &&
        <ul>
          {categories.map((category) => (
            <Category key={category.category_id} category={category} />
          ))
          }
        </ul>
      }
      <ul>{categoryItems}</ul>
    </div>
  );
}

export default CategoryList;
