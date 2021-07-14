import './NavBar.css';

import {
  BarsOutlined,
  BellOutlined,
  ContactsOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function NavBar(props) {
  const path = props.location.pathname;
  const [tab, setTab] = useState('');

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
    if (path === '/') {
      setTab('groupListView');
    } else if (path === '/groupview') {
      setTab('groupView');
    } else if (path === '/categoryview') {
      setTab('categoryView');
    } else if (path === '/placeview') {
      setTab('placeView');
    } else if (path === '/requestview') {
      setTab('requestView');
    } else {
      setTab('');
    }
  }, [path]);

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
