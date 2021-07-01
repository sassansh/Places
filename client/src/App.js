import "./App.less";
import "antd/dist/antd.less";

import {
  Route,
  HashRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import logo from "./assets/logo.png";
import { setCurrentUser } from "./redux/actions/userActions";

const { Content, Footer, Sider } = Layout;

function App() {
  const NavBarWithRouter = withRouter(NavBar);
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const dispatch = useDispatch();

  // Private route inspired by: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

  if (localStorage.currentUserID) {
    const storedUserID = localStorage.currentUserID;
    dispatch(setCurrentUser(storedUserID));
  }
  const isLoggedIn = currentUserID !== null;

  return (
    <Router basename="/">
      <Layout>
        {isLoggedIn && (
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <div className="logo">
              <img alt="logo" src={logo} width="35px" />
              Places
            </div>
            <NavBarWithRouter />
          </Sider>
        )}
        <Layout
          className="site-layout"
          style={{ marginLeft: isLoggedIn ? 200 : 0 }}
        >
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path="/grouplistview"
                component={GroupListView}
              />
              <PrivateRoute exact path="/groupview" component={GroupView} />
              <PrivateRoute exact path="/creategroup" component={CreateGroup} />
              <PrivateRoute
                exact
                path="/categoryview"
                component={CategoryView}
              />
              <PrivateRoute exact path="/addplace" component={AddPlace} />
              <PrivateRoute exact path="/placeview" component={PlaceView} />
              <PrivateRoute exact path="/addreview" component={AddReview} />
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
