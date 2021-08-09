import './FavouritesView.css';

import { Card, Col, Divider, Row, Tooltip, Typography } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { deleteFavouritePlace, getFavourites } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../redux/actions/categoryActions';
import { useEffect } from 'react';

const { Title } = Typography;

function FavouritesView() {
  const myFavourites = useSelector((state) => state.users.favourite_places);
  const places = useSelector((state) => state.places.allPlaces);
  const groups = useSelector((state) => state.groups.allGroups);
  const categories = useSelector((state) => state.categories.allCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getFavourites());
  }, [dispatch]);

  function handleFavourite(place_id) {
    dispatch(deleteFavouritePlace(place_id));
  }

  function getPlace(place_id) {
    try {
      const placeName = places.find((place) => place.place_id === place_id).name;
      return placeName;
    } catch (e) {
      console.error(e);
    }
  }

  function getGroupName(place_id) {
    try {
      const group_id = places.find((place) => place.place_id === place_id).group_id;
      const groupName = groups.find((group) => group.group_id === group_id).name;
      return ' 👤 ' + groupName;
    } catch (e) {
      console.error(e);
    }
  }

  function getCategoryName(place_id) {
    try {
      const category_id = places.find((place) => place.place_id === place_id).category_id;
      const targetCategory = categories.find((category) => category.category_id === category_id);
      let categoryEmoji = '';
      let categoryName = '';
      if (targetCategory) {
        categoryEmoji = targetCategory.emoji;
        categoryName = targetCategory.name_singular;
      }
      return ' ' + categoryEmoji + ' ' + categoryName + ' ';
    } catch (e) {
      console.error(e);
    }
  }

  const myFavouriteItems = myFavourites.map((favourite) => (
    <li key={favourite} className='favourite'>
      <Card size='small'>
        <Row>
          <Col span={12}>
            <span className='place'>{getPlace(favourite)}</span>
          </Col>
          <Col className='rating' span={12}>
            <Tooltip title='Remove favourite'>
              <HeartFilled
                onClick={() => handleFavourite(favourite)}
                style={{ color: 'red', fontSize: '150%' }}
              />
            </Tooltip>
          </Col>
        </Row>
        <span className='meta'>{getCategoryName(favourite) + getGroupName(favourite)}</span>
      </Card>
    </li>
  ));
  return (
    <div className='container'>
      <Row justify='left'>
        <Col>
          <Title level={2}>
            <HeartOutlined /> Favourites
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5
        }}
      />
      {myFavourites.length >= 1 ? (
        <Row justify='center'>
          <Col className='column3' lg={9} md={9} sm={24}>
            <ul>{myFavouriteItems}</ul>
          </Col>
        </Row>
      ) : (
        <Row justify='center'>
          <Col lg={10} md={12} sm={18} xs={24}>
            <Card className='noFavourites' size='medium'>
              You do not have any favourited places.
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default FavouritesView;
