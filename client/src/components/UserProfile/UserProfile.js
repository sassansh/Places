import './UserProfile.css';

import { Card, Col, Divider, Rate, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { getCategories } from '../../redux/actions/categoryActions';
import { useEffect } from 'react';

function UserProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { Title } = Typography;
  const user = useSelector((state) => state.users.user);
  const users = useSelector((state) => state.users.allUsers);
  const userData = users.find((item) => item.user_id === user.user_id);
  const reviews = useSelector((state) => state.reviews.allReviews);
  const places = useSelector((state) => state.places.allPlaces);
  const groups = useSelector((state) => state.groups.allGroups);
  const categories = useSelector((state) => state.categories.allCategories);

  let numGroups = 0;
  let numPlaces = 0;

  function getPlace(place_id) {
    try {
      numPlaces++;
      const placeName = places.find(
        (place) => place.place_id === place_id
      ).name;
      return placeName;
    } catch (e) {
      numPlaces--;
      console.error(e);
    }
  }

  function getRating(rating) {
    let overallRating = 0;
    if (rating.length < 2) {
      overallRating = rating[0];
    } else {
      const total = rating.reduce((a, b) => a + b, 0);
      overallRating = total / rating.length;
    }
    return <Rate value={overallRating} disabled />;
  }

  function getGroup(group_id) {
    const targetGroup = groups.find((group) => group.group_id === group_id);
    try {
      numGroups++;
      return (
        <Card size='small'>
          <span className='group'>
            <Avatar size={64} src={targetGroup.avatarURL} />
            &emsp;{targetGroup.name}
          </span>
        </Card>
      );
    } catch (e) {
      numGroups--;
      console.error(e);
    }
  }

  function getGroupName(place_id) {
    try {
      const group_id = places.find(
        (place) => place.place_id === place_id
      ).group_id;
      const groupName = groups.find(
        (group) => group.group_id === group_id
      ).name;
      return ' 👤 ' + groupName;
    } catch (e) {
      console.error(e);
    }
  }

  function getCategoryName(place_id) {
    try {
      const category_id = places.find(
        (place) => place.place_id === place_id
      ).category_id;
      const targetCategory = categories.find(
        (category) => category.category_id === category_id
      );
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

  const myGroups = userData.groups;
  const myGroupsItems = myGroups.map((group_id) => (
    <li key={group_id} className='group'>
      {getGroup(group_id)}
    </li>
  ));

  const myReviews = reviews.filter((review) => review.user_id === user.user_id);
  const myReviewsItems = myReviews.map((review) => (
    <li key={review.review_id} className='review'>
      <Card size='small'>
        <Row>
          <Col span={12}>
            <span className='place'>{getPlace(review.place_id)}</span>
          </Col>
          <Col className='rating' span={12}>
            {getRating(review.rating)}
          </Col>
        </Row>
        <span className='meta'>
          {getCategoryName(review.place_id) + getGroupName(review.place_id)}
        </span>
      </Card>
    </li>
  ));

  return (
    <div className='container'>
      <Row justify='left'>
        <Col>
          <Title level={2}>
            <UserOutlined /> User Profile
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5
        }}
      />
      <Row justify='center'>
        <Col className='column1' lg={6} md={6} sm={24}>
          <div className='profile'>
            <img
              className='profilePic'
              src={userData.avatarURL}
              alt='profileImg'
            />
            <div className='name'>{userData.name}</div>
          </div>
          <br />
          <div className='detailsHeading'>Details</div>
          <Divider
            style={{
              marginTop: '0',
              borderWidth: 4
            }}
          />
          <div className='details'>Member of {numGroups} Groups</div>
          <div className='details'>Reviewed {numPlaces} Places</div>
        </Col>
        <Col className='column2' lg={9} md={9} sm={24}>
          <div className='heading'>My Groups</div>
          <ul className='group'>{myGroupsItems}</ul>
        </Col>
        <Col className='column3' lg={9} md={9} sm={24}>
          <div className='heading'>My Reviews</div>
          <ul>{myReviewsItems}</ul>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
