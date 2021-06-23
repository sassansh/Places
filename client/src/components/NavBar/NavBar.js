import "./NavBar.css";

import {
  AppstoreAddOutlined,
  BarsOutlined,
  FileAddOutlined,
  LoginOutlined,
  ShopOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Menu } from "antd";

function NavBar(props) {
  const path = props.location.pathname;
  const [tab, setTab] = useState("");

  function updateTab(e) {
    setTab(e.key);
  }
  useEffect(() => {
    if (path === "/login") {
      setTab("login");
    }
    if (path === "/") {
      setTab("groupView");
    }
    if (path === "/creategroup") {
      setTab("createGroup");
    }
    if (path === "/categoryview") {
      setTab("categoryView");
    }
    if (path === "/addplace") {
      setTab("addPlace");
    }
    if (path === "/placeview") {
      setTab("placeView");
    }
    if (path === "/addreview") {
      setTab("addReview");
    }
    if (path === "/grouplistview") {
      setTab("groupListView");
    }
  }, [path]);

  return (
    <Menu onClick={updateTab} theme="dark" mode="inline" selectedKeys={[tab]}>
      <Menu.Item key="login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="groupView" icon={<TeamOutlined />}>
        <Link to="/">Group View</Link>
      </Menu.Item>
      <Menu.Item key="createGroup" icon={<UsergroupAddOutlined />}>
        <Link to="/creategroup">Create Group</Link>
      </Menu.Item>
      <Menu.Item key="categoryView" icon={<BarsOutlined />}>
        <Link to="/categoryview">Category View</Link>
      </Menu.Item>
      <Menu.Item key="addPlace" icon={<AppstoreAddOutlined />}>
        <Link to="/addplace">Add Place</Link>
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
