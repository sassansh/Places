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
import MobileNavBar from "./components/Navigation/MobileNavBar/MobileNavBar";
import NavBar from "./components/Navigation/NavBar/NavBar";
import PlaceView from "./components/PlaceView/PlaceView";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import RequestView from "./components/RequestView/RequestView";
import SideBar from "./components/Navigation/SideBar/SideBar";
import { setCurrentUser } from "./redux/actions/userActions";
import { useEffect } from "react";

const { Content, Footer } = Layout;

function App() {
  const NavBarWithRouter = withRouter(NavBar);
  const RegisterWithRouter = withRouter(Register);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const dispatch = useDispatch();

  // Private route inspired by: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

  useEffect(() => {
    if (localStorage.AuthenticatedUser) {
      const storedUserID = JSON.parse(localStorage.AuthenticatedUser);
      dispatch(setCurrentUser(storedUserID));
    }
  }, [dispatch]);

  return (
    <Router basename="/">
      {isAuthenticated && <MobileNavBar menu={<NavBarWithRouter />} />}
      <Layout style={{ marginTop: "60px" }}>
        {isAuthenticated && <SideBar menu={<NavBarWithRouter />} />}
        <Layout className="site-layout">
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterWithRouter} />
            <Switch>
              <PrivateRoute exact path="/" component={GroupListView} />
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
              <PrivateRoute exact path="/requestview" component={RequestView} />
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
