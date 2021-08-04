import './CategoryView.css';

import { Button, Col, Divider, Row, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Filters from '../Filters/Filters';
import PlaceList from '../PlaceList/PlaceList';
import { PlusOutlined } from '@ant-design/icons';
import { setCurrentCategory } from '../../redux/actions/categoryActions';
import { useState } from 'react';

function CategoryView () {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedCriteria, setCheckedCriteria] = useState([]);
  const { Title } = Typography;
  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );
  const categoryType =
    currentCategory === undefined
      ? ''
      : currentCategory.name + ' ' + currentCategory.emoji;
  const btnCategory =
    currentCategory === undefined ? '' : currentCategory.name_singular;

  return currentCategory === undefined
    ? (
      <Redirect to='/groupview' />
      )
    : (
      <Col className='container'>
        <Row justify='center'>
          <Col lg={12} md={12} sm={12}>
            <Title level={2}>{categoryType}</Title>
          </Col>
          <Col lg={0} md={0} sm={0} xs={24} />
          <Col lg={12} md={12} sm={12} className='addPlaceButton'>
            <Link
              to='/addPlace'
              onClick={() => {
                dispatch(setCurrentCategory(currentCategoryID));
              }}
            >
              <Button type='primary' icon={<PlusOutlined />} size='large'>
                Add {btnCategory}
              </Button>
            </Link>
          </Col>
        </Row>
        <Divider
          style={{
            borderWidth: 5
          }}
        />
        <Filters
          setSearchQuery={setSearchQuery}
          checkedCriteria={checkedCriteria}
          setCheckedCriteria={setCheckedCriteria}
        />
        <PlaceList
          searchQuery={searchQuery}
          checkedCriteria={checkedCriteria}
          customCriteria={currentCategory.custom_criteria}
        />
      </Col>
      );
}

export default CategoryView;
