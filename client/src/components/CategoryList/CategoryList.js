import './CategoryList.css';

import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Category from '../Category/Category';
import { getCategories } from '../../redux/actions/categoryActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { useEffect } from 'react';

function CategoryList() {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.categories.allCategories);
  const places = useSelector((state) => state.places.allPlaces);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);

  categories = categories.map((category) => ({
    ...category,
    numPlaces: places.filter(
      (place) => place.category_id === category.category_id && place.group_id === currentGroupID
    ).length
  }));

  const categoryItems = categories.map((category) => (
    <Category key={category.category_id} category={category} />
  ));

  useEffect(() => {
    dispatch(getCategories(currentGroupID));
    dispatch(getPlaces());
  }, [dispatch, currentGroupID]);

  return (
    <Row>
      <Col span={24}>{categoryItems}</Col>
    </Row>
  );
}

export default CategoryList;
