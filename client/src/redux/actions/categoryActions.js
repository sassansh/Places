import axios from 'axios';
import { message } from 'antd';

export const getCategories = () => async (dispatch) => {
  try {
    const categoriesResponse = await axios.get('/api/categories');
    const categories = categoriesResponse.data;
    dispatch(setCategories(categories));
  } catch (err) {
    console.log(err);
  }
};

export const addCategory = (newCategory, history) => async (dispatch) => {
  const loading = message.loading('Creating category..', 0);
  try {
    const newCategoryResponse = await axios.post(
      '/api/categories',
      newCategory
    );
    const newCategoryFull = await newCategoryResponse.data;
    loading();
    await dispatch(getCategories());
    await dispatch(setCurrentCategory(newCategoryFull.category_id));
    history.push('/categoryview');
    message.success('New category created!');
  } catch (err) {
    loading();
    console.log(err);
  }
};

export const setCategories = (categories) => {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  };
};

export const setCurrentCategory = (categoryID) => {
  return {
    type: 'SET_CURRENT_CATEGORY',
    payload: categoryID,
  };
};
