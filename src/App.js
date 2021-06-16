import "./App.less";
import "antd/dist/antd.less";

import { Route, Router, Switch } from "wouter";

import AddReview from "./components/AddReview/AddReview";
import CategoriesContext from "./context/CategoriesContext";
import CategoryView from "./components/CategoryView/CategoryView";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import CurrentCategoryIDContext from "./context/CurrentCategoryIDContext";
import CurrentGroupIDContext from "./context/CurrentGroupIDContext";
import CurrentPlaceIDContext from "./context/CurrentCategoryPlaceContext";
import CurrentUserIDContext from "./context/CurrentUserIDContext";
import GroupListView from "./components/GroupListView/GroupListView";
import GroupView from "./components/GroupView/GroupView";
import GroupsContext from "./context/GroupsContext";
import { Layout } from "antd";
import NavBar from "./components/NavBar/NavBar";
import PlaceView from "./components/PlaceView/PlaceView";
import PlacesContext from "./context/PlacesContext";
import ReviewsContext from "./context/ReviewsContext";
import UsersContext from "./context/UsersContext";
import { useState } from "react";

const { Content, Footer, Sider } = Layout;

function App() {
  const currentUserID = useState(1);
  const currentGroupID = useState(1);
  const currentCategoryID = useState(1);
  const currentPlaceID = useState(1);

  const users = useState([
    {
      user_id: 1,
      name: "Sassan Shokoohi",
      email: "sassan_shokoohi@me.com",
      password: "1234",
      avatarURL: "https://bit.ly/3q8x5LR",
      groups: [1],
    },
    {
      user_id: 2,
      name: "Johnny Li",
      email: "johnny@ualberta.ca",
      password: "5678",
      avatarURL: "https://bit.ly/3cL0K8m",
      groups: [1, 2],
    },
  ]);
  const groups = useState([
    {
      group_id: 1,
      name: "Optimistic Yankees",
      description: "Only yankees allowed.",
      avatarURL: "https://bit.ly/3cL15Ia",
    },
    {
      group_id: 2,
      name: "Brave Flyers",
      description: "Dow't join unless you're brave!",
      avatarURL: "https://bit.ly/3gvB4yU",
    },
  ]);
  const categories = useState([
    { category_id: 1, name: "Beaches", emoji: "🏖️" },
    { category_id: 2, name: "Restaurants", emoji: "🍔" },
  ]);
  const places = useState([
    {
      place_id: 1,
      name: "Ambleside Beach",
      address: "Ambleside Beach, Argyle Ave, West Vancouver, BC V7V 1A4",
      group_id: 1,
      category_id: 1,
      ImageURL: "https://bit.ly/35sQcH1",
    },
    {
      place_id: 2,
      name: "Earls Kitchen & Bar - Yaletown",
      address: "1095 Mainland St, Vancouver, BC V6B 5P9",
      group_id: 2,
      category_id: 2,
      ImageURL: "https://bit.ly/2SxGSyU",
    },
  ]);
  const reviews = useState([
    {
      review_id: 1,
      user_id: 1,
      place_id: 1,
      rating: 3,
    },
    {
      review_id: 2,
      user_id: 2,
      place_id: 2,
      rating: 4,
    },
  ]);

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
              <CurrentUserIDContext.Provider value={currentUserID}>
                <CurrentGroupIDContext.Provider value={currentGroupID}>
                  <CurrentCategoryIDContext.Provider value={currentCategoryID}>
                    <CurrentPlaceIDContext.Provider value={currentPlaceID}>
                      <UsersContext.Provider value={users}>
                        <GroupsContext.Provider value={groups}>
                          <CategoriesContext.Provider value={categories}>
                            <PlacesContext.Provider value={places}>
                              <ReviewsContext.Provider value={reviews}>
                                <Route exact path="/" component={GroupView} />
                                <Route
                                  exact
                                  path="/creategroup"
                                  component={CreateGroup}
                                />
                                <Route
                                  exact
                                  path="/categoryview"
                                  component={CategoryView}
                                />
                                <Route
                                  exact
                                  path="/placeview"
                                  component={PlaceView}
                                />
                                <Route
                                  exact
                                  path="/addreview"
                                  component={AddReview}
                                />
                                <Route
                                  exact
                                  path="/grouplistview"
                                  component={GroupListView}
                                />
                              </ReviewsContext.Provider>
                            </PlacesContext.Provider>
                          </CategoriesContext.Provider>
                        </GroupsContext.Provider>
                      </UsersContext.Provider>
                    </CurrentPlaceIDContext.Provider>
                  </CurrentCategoryIDContext.Provider>
                </CurrentGroupIDContext.Provider>
              </CurrentUserIDContext.Provider>
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
