import "./GroupView.css";

import { Avatar, Col, Divider, Row, Typography } from "antd";

import CategoryList from "../CategoryList/CategoryList";
import { useSelector } from 'react-redux';

function GroupView() {
  const { Title } = Typography;
  const groups = useSelector(state => state.groups.allGroups);
  const users = useSelector(state => state.users.allUsers);
  const currentGroupID = useSelector(state => state.groups.currentGroupID);
  let currentGroup = groups.find((group) => group.group_id === currentGroupID);
  let title = currentGroup.name;
  let avatarURL = currentGroup.avatarURL;
  let numMembers = 0;
  users.forEach((user) => {
    if (user.groups.includes(currentGroupID)) {
      numMembers++;
    }
  });
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
      <CategoryList/>
    </div>
  );
}

export default GroupView;
