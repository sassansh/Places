import "./CategoryList.css";
import Category from "../Category/Category";

function CategoryList(props) {
  let categoriesData = props.categoriesData;

  let categories = categoriesData.map((categoryData) => (
    <li>
      <Category key={categoryData.categoryName} category={categoryData} />
    </li>
  ));
  return (
    <div>
      <ul>{categories}</ul>
    </div>
  );
}

export default CategoryList;
