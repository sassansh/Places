import "./App.less";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { Layout } from "antd";
import NavBar from "./components/NavBar/NavBar";
import GroupView from "./components/GroupView/GroupView";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import CategoryView from "./components/CategoryView/CategoryView";
import PlaceView from "./components/PlaceView/PlaceView";
import AddReview from "./components/AddReview/AddReview";
import "antd/dist/antd.less";

const { Content, Footer, Sider } = Layout;

function App() {
  const NavBarWithRouter = withRouter(NavBar);

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
          <NavBarWithRouter />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Switch>
              <Route exact path="/">
                <GroupView />
              </Route>
              <Route exact path="/creategroup">
                <CreateGroup />
              </Route>
              <Route exact path="/categoryview">
                <CategoryView />
              </Route>
              <Route exact path="/placeview">
                <PlaceView />
              </Route>
              <Route exact path="/addreview">
                <AddReview />
              </Route>
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
