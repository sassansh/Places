import "./App.less";
import "antd/dist/antd.less";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";

import AddPlace from "./components/AddPlace/AddPlace";
import AddReview from "./components/AddReview/AddReview";
import CategoryView from "./components/CategoryView/CategoryView";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import GroupListView from "./components/GroupListView/GroupListView";
import GroupView from "./components/GroupView/GroupView";
import { Layout } from "antd";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import PlaceView from "./components/PlaceView/PlaceView";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
import store from "./redux/store";

const { Content, Footer, Sider } = Layout;

function App() {
  const NavBarWithRouter = withRouter(NavBar);

  return (
    <Provider store={store}>
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
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={GroupView} />
                <PrivateRoute
                  exact
                  path="/creategroup"
                  component={CreateGroup}
                />
                <PrivateRoute
                  exact
                  path="/categoryview"
                  component={CategoryView}
                />
                <PrivateRoute exact path="/addplace" component={AddPlace} />
                <PrivateRoute exact path="/placeview" component={PlaceView} />
                <PrivateRoute exact path="/addreview" component={AddReview} />
                <PrivateRoute
                  exact
                  path="/grouplistview"
                  component={GroupListView}
                />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Places App ©2021 Created by Team Green 🌱
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
