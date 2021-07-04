import "./CategoryList.css";

import Category from "../Category/Category";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCategories } from "../../redux/actions/categoryActions";

function CategoryList() {
  const categories = useSelector((state) => state.categories.allCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
