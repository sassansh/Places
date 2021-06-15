import "./App.less";
import { Router, Route, Switch } from "wouter";
import { Layout } from "antd";
import NavBar from "./components/NavBar/NavBar";
import GroupView from "./components/GroupView/GroupView";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import AddReview from "./components/AddReview/AddReview";
import GroupListView from "./components/GroupListView/GroupListView";
import "antd/dist/antd.less";

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router basename="/">
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo">
            <img alt="logo" src="logo192.png" width="30px" />
            Places
          </div>
          <NavBar />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Switch>
              <Route exact path="/" component={GroupView} />
              <Route exact path="/creategroup" component={CreateGroup} />
              <Route exact path="/categoryview" component={CategoryView} />
              <Route exact path="/placeview" component={PlaceView} />
              <Route exact path="/addreview" component={AddReview} />
              <Route exact path="/grouplistview" component={GroupListView} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Places App ©2021 Created by Team Green 🌱
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
