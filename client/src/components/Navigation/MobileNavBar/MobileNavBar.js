import "./MobileNavBar.css";

import { Button, Drawer } from "antd";

import { MenuOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo.png";
import { useState } from "react";

const MobileNavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
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
    </nav>
  );
};
export default MobileNavBar;
