import './NavBar.css';

import {
  BarsOutlined,
  BellOutlined,
  ContactsOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { setCurrentCategory } from '../../../redux/actions/categoryActions';
import { setCurrentGroup } from '../../../redux/actions/groupActions';
import { setCurrentPlace } from '../../../redux/actions/placeActions';

function NavBar(props) {
  const path = props.location.pathname;
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groups.allGroups);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  let currentGroup = groups.find((group) => group.group_id === currentGroupID);

  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  let currentCategory = categories.find(
    (category) => category.category_id === currentCategoryID
  );

  const places = useSelector((state) => state.places.allPlaces);
  const currentPlaceID = useSelector((state) => state.places.currentPlaceID);
  let currentPlace = places.find((place) => place.place_id === currentPlaceID);

  console.log(currentGroupID);

  function updateTab(e) {
    setTab(e.key);
  }
  useEffect(() => {
    if (path === '/' || path === '/creategroup') {
      setTab('groupListView');
      dispatch(setCurrentGroup(''));
      dispatch(setCurrentCategory(''));
      dispatch(setCurrentPlace(''));
    } else if (path === '/groupview') {
      setTab('groupView');
      dispatch(setCurrentCategory(''));
      dispatch(setCurrentPlace(''));
    } else if (path === '/categoryview' || path === '/addPlace') {
      setTab('categoryView');
      dispatch(setCurrentPlace(''));
    } else if (path === '/placeview' || path === '/addReview') {
      setTab('placeView');
    } else if (path === '/requestview') {
      setTab('requestView');
    } else {
      setTab('');
    }
  }, [path, dispatch]);

  return (
    <Menu onClick={updateTab} theme="dark" mode="inline" selectedKeys={[tab]}>
      <Menu.Item key="groupListView" icon={<TeamOutlined />}>
        <Link to="/">Groups</Link>
      </Menu.Item>
      {currentGroupID && (
        <Menu.Item key="groupView" icon={<ContactsOutlined />}>
          <Link to="/groupview">{currentGroup.name}</Link>
        </Menu.Item>
      )}
      {currentCategoryID && (
        <Menu.Item key="categoryView" icon={<BarsOutlined />}>
          <Link to="/categoryview">{currentCategory.name}</Link>
        </Menu.Item>
      )}
      {currentPlaceID && (
        <Menu.Item key="placeView" icon={<ShopOutlined />}>
          <Link to="/placeview">{currentPlace.name}</Link>
        </Menu.Item>
      )}
      <Menu.Item key="requestView" icon={<BellOutlined />}>
        <Link to="/requestview">Requests</Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
