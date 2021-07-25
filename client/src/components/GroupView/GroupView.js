import './GroupView.css';

import { Avatar, Button, Col, Divider, Row, Typography } from 'antd';

import CategoryList from '../CategoryList/CategoryList';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

function GroupView() {
  const { Title } = Typography;
  const groups = useSelector((state) => state.groups.allGroups);
  const users = useSelector((state) => state.users.allUsers);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
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
    <Col className="container">
      <Row justify="center">
        <Col lg={12} md={12} sm={14}>
          <Title level={2}>
            <Avatar size="large" src={avatarURL} /> {title}
            <Link to="/managegroup">
              <Button type="primary" size="medium" className="button">
                Manage Group
              </Button>
            </Link>
          </Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24}></Col>
        <Col lg={12} md={12} sm={10} className="numOfMembers">
          <Title level={2}>
            <UserOutlined size="large" /> {numMembers} Members
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5,
        }}
      />
      <CategoryList />
    </Col>
  );
}

export default GroupView;
