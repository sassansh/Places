import "./GroupView.css";

import { Avatar, Col, Divider, Row, Typography } from "antd";

import CategoryList from "../CategoryList/CategoryList";
import CurrentGroupIDContext from "../../context/CurrentGroupIDContext";
import UsersContext from "../../context/UsersContext";
import { useContext } from "react";
import { useSelector } from 'react-redux';

function GroupView() {
  const { Title } = Typography;
  const groups = useSelector(state => state.groups);
  const [users] = useContext(UsersContext);
  const [currentGroupID] = useContext(CurrentGroupIDContext);
  let currentGroup = groups.find((group) => group.group_id === currentGroupID);
  let title = currentGroup.name;
  let avatarURL = currentGroup.avatarURL;
  let numMembers = 0;
  users.forEach((user) => {
    if (user.groups.includes(currentGroupID)) {
      numMembers++;
    }
  });
  const categoriesData = [
    {
      categoryEmoji: "🏖️",
      categoryName: "Beaches",
      places: [
        { placeName: "Jericho Beach", placeRating: 5 },
        { placeName: "Sunset Beach", placeRating: 3 },
        { placeName: "Locarno Beach", placeRating: 4.5 },
        { placeName: "Kitsilano Beach", placeRating: 2.5 },
      ],
    },
    {
      categoryEmoji: "🍔",
      categoryName: "Restaurants",
      places: [
        { placeName: "Blue Water Cafe", placeRating: 2 },
        { placeName: "Tasty Indina Bistro", placeRating: 3.5 },
        { placeName: "The Moose", placeRating: 4.5 },
        { placeName: "Roxy Burger", placeRating: 2.5 },
        { placeName: "McDonalds", placeRating: 1 },
        { placeName: "Viet House", placeRating: 4.5 },
        { placeName: "Congee Noodle House", placeRating: 5 },
        { placeName: "Italian Kitchen", placeRating: 1.5 },
      ],
    },
  ];
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={12}>
          <Title level={2}>
            <Avatar size="large" src={avatarURL} /> {title}
          </Title>
        </Col>
        <Col lg={12} className="numOfMembers">
          <Title level={2}>👤 {numMembers} Members</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <CategoryList categoriesData={categoriesData} />
    </div>
  );
}

export default GroupView;
