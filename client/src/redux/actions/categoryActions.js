import axios from "axios";

export const getCategories = () => async(dispatch)  => {
  try {
    const categoriesResponse = await axios.get("/api/categories");
    const categories = categoriesResponse.data;
    dispatch(setCategories(categories));
  } catch (err) {
    console.log(err);
  }
};

export const setCategories = (categories) => {
  return {
    type: "SET_CATEGORIES",
    payload: categories,
  };
};

export const setCurrentCategory = categoryID => {
    return {
       type: 'SET_CURRENT_CATEGORY',
       payload: categoryID
}; };
