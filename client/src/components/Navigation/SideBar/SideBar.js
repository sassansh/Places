import "./SideBar.css";

import { Layout } from "antd";

const SideBar = ({ menu }) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="dark"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  );
};
export default SideBar;
