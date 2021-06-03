import "./App.css";
import { useState } from "react";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import { Layout, Avatar, Menu, Breadcrumb, Button } from "antd";
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";

// Layout inspired by: https://www.youtube.com/watch?v=QkPJV9DonZ0

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: "right" }} src="./dp.png" />
          <Title style={{ color: "white" }} level={3}>
            Places App
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
              <Menu.Item key="Dashboard">Category View</Menu.Item>
              
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Category View</Breadcrumb.Item>
              </Breadcrumb>
              <CategoryView />
              <PlaceView />
            </Content>
            <Footer style={{ textAlign: "center" }}>© 2021 Places App</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
