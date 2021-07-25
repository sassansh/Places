import './App.less';
import 'antd/dist/antd.less';

import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
  withRouter,
} from 'react-router-dom';
import { logoutUser, setCurrentUser } from './redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import AddPlace from './components/AddPlace/AddPlace';
import AddReview from './components/AddReview/AddReview';
import CategoryView from './components/CategoryView/CategoryView';
import CreateGroup from './components/CreateGroup/CreateGroup';
import GroupListView from './components/GroupListView/GroupListView';
import GroupView from './components/GroupView/GroupView';
import { Layout } from 'antd';
import Login from './components/Login/Login';
import ManageGroup from './components/ManageGroup/ManageGroup';
import MobileNavBar from './components/Navigation/MobileNavBar/MobileNavBar';
import NavBar from './components/Navigation/NavBar/NavBar';
import PlaceView from './components/PlaceView/PlaceView';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';
import RequestView from './components/RequestView/RequestView';
import SideBar from './components/Navigation/SideBar/SideBar';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';

const { Content, Footer } = Layout;

function App() {
  const NavBarWithRouter = withRouter(NavBar);
  const RegisterWithRouter = withRouter(Register);
  const CreateGroupWithRouter = withRouter(CreateGroup);
  const ManageGroupWithRouter = withRouter(ManageGroup);
  const AddPlaceWithRouter = withRouter(AddPlace);
  const AddReviewWithRouter = withRouter(AddReview);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const dispatch = useDispatch();

  // Private route inspired by: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const user = jwt_decode(token);
      // Set user
      dispatch(setCurrentUser(user));
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (user.exp < currentTime) {
        // Logout user
        dispatch(logoutUser());
        // Redirect to login
        <Redirect to={{ pathname: '/login' }} />;
      }
    }
  }, [dispatch]);

  return (
    <Router basename="/">
      {isAuthenticated && <MobileNavBar menu={<NavBarWithRouter />} />}
      <Layout style={{ marginTop: '62px' }}>
        {isAuthenticated && <SideBar menu={<NavBarWithRouter />} />}
        <Layout
          className="site-layout"
          style={!isAuthenticated ? { marginLeft: '0px' } : {}}
        >
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={RegisterWithRouter} />
            <Switch>
              <PrivateRoute exact path="/" component={GroupListView} />
              <PrivateRoute exact path="/groupview" component={GroupView} />
              <PrivateRoute
                exact
                path="/creategroup"
                component={CreateGroupWithRouter}
              />
              <PrivateRoute
                exact
                path="/categoryview"
                component={CategoryView}
              />
              <PrivateRoute
                exact
                path="/addplace"
                component={AddPlaceWithRouter}
              />
              <PrivateRoute exact path="/placeview" component={PlaceView} />
              <PrivateRoute
                exact
                path="/addreview"
                component={AddReviewWithRouter}
              />
              <PrivateRoute exact path="/requestview" component={RequestView} />
              <PrivateRoute exact path="/managegroup" component={ManageGroupWithRouter} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Places App ©2021 Created by Team Green 🌱
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
