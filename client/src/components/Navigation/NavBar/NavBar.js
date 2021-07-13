import "./NavBar.css";

import {
  AppstoreAddOutlined,
  BarsOutlined,
  BellOutlined,
  FileAddOutlined,
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
    if (path === "/") {
      setTab("groupListView");
    }
    if (path === "/creategroup") {
      setTab("createGroup");
    }
    if (path === "/groupview") {
      setTab("groupView");
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
    if (path === "/requestview") {
      setTab("requestView");
    }
  }, [path]);

  return (
    <Menu onClick={updateTab} theme="dark" mode="inline" selectedKeys={[tab]}>
      <Menu.Item key="groupListView" icon={<TeamOutlined />}>
        <Link to="/">Group List</Link>
      </Menu.Item>
      <Menu.Item key="createGroup" icon={<UsergroupAddOutlined />}>
        <Link to="/creategroup">Create Group</Link>
      </Menu.Item>
      <Menu.Item key="groupView" icon={<TeamOutlined />}>
        <Link to="/groupview">Group View</Link>
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
      <Menu.Item key="requestView" icon={<BellOutlined />}>
        <Link to="/requestview">Requests</Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
