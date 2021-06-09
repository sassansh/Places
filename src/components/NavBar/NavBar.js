import "./NavBar.css";
import { Menu } from "antd";
import { ShopOutlined, TeamOutlined, BarsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar(props) {
  const path = props.location.pathname;
  const [tab, setTab] = useState("categoryView");

  function updateTab(e) {
    setTab(e.key);
  }
  useEffect(() => {
    if (path === "/") {
      setTab("groupView");
    }
    if (path === "/categoryview") {
      setTab("categoryView");
    }
    if (path === "/placeview") {
      setTab("placeView");
    }
  }, [path]);
  return (
    <Menu onClick={updateTab} theme="dark" mode="inline" selectedKeys={[tab]}>
      <Menu.Item key="groupView" icon={<TeamOutlined />}>
        <Link to="/">Group View</Link>
      </Menu.Item>
      <Menu.Item key="categoryView" icon={<BarsOutlined />}>
        <Link to="/categoryview">Category View</Link>
      </Menu.Item>
      <Menu.Item key="placeView" icon={<ShopOutlined />}>
        <Link to="/placeview">Place View</Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
