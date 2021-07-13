import "./MobileNavBar.css";

import { Button, Drawer, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo.png";
import { logoutUser } from "../../../redux/actions/userActions";
import { useState } from "react";

const MobileNavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  const userAvatarURL = useSelector((state) => state.users.user.avatarURL);
  const userName = useSelector((state) => state.users.user.name);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  const profileMenu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        {userName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout} key="1" icon={<LogoutOutlined />}>
        <Link to="/login">Log Out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Menu"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        drawerStyle={{
          backgroundColor: "#041527",
        }}
      >
        {menu}
      </Drawer>
      <span className="logo">
        <a href="/">
          <img src={logo} className="logo" alt="logo" />
        </a>
        Places
      </span>
      <Dropdown overlay={profileMenu} trigger={["click"]}>
        <span className="profilepic">
          <img src={userAvatarURL} className="profilepic" alt="profile pic" />
        </span>
      </Dropdown>
    </nav>
  );
};
export default MobileNavBar;
