import './CategoryList.css';

import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Category from '../Category/Category';
import { getCategories } from '../../redux/actions/categoryActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { useEffect } from 'react';

function CategoryList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getPlaces());
  }, [dispatch]);

  let categories = useSelector((state) => state.categories.allCategories);
  const places = useSelector((state) => state.places.allPlaces);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);

  categories = categories.map((category) => ({
    ...category,
    numPlaces: places.filter(
      (place) =>
        place.category_id === category.category_id &&
        place.group_id === currentGroupID
    ).length,
  }));

  let categoryItems = categories.map((category) => (
    <Category key={category.category_id} category={category} />
  ));

  return (
    <Row>
      <Col span={24}>{categoryItems}</Col>
    </Row>
  );
}

export default CategoryList;
