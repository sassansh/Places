import "./NavBar.css";

import {
  BarsOutlined,
  FileAddOutlined,
  ShopOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { Link } from "wouter";
import { Menu } from "antd";
import { useState } from "react";

function NavBar(props) {
  const [tab, setTab] = useState("groupView");

  function updateTab(e) {
    setTab(e.key);
  }

  return (
    <Menu onClick={updateTab} theme="dark" mode="inline" selectedKeys={[tab]}>
      <Menu.Item key="groupView" icon={<TeamOutlined />}>
        <Link to="/">Group View</Link>
      </Menu.Item>
      <Menu.Item key="createGroup" icon={<UsergroupAddOutlined />}>
        <Link to="/creategroup">Create Group</Link>
      </Menu.Item>
      <Menu.Item key="categoryView" icon={<BarsOutlined />}>
        <Link to="/categoryview">Category View</Link>
      </Menu.Item>
      <Menu.Item key="placeView" icon={<ShopOutlined />}>
        <Link to="/placeview">Place View</Link>
      </Menu.Item>
      <Menu.Item key="addReview" icon={<FileAddOutlined />}>
        <Link to="/addreview">Add Review</Link>
      </Menu.Item>
      <Menu.Item key="groupListView" icon={<TeamOutlined />}>
        <Link to="/grouplistview">Group List</Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
