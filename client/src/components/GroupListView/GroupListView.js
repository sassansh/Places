import "./GroupListView.css";

import { Button, Col, Divider, Row, Typography } from "antd";

import GroupList from "../GroupList/GroupList";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";

function GroupListView() {
  const { Title } = Typography;
  return (
    <Col className="container">
      <Row justify="space-around">
        <Col lg={12} md={12} sm={12} xs={12}>
          <Title level={2}>
            <TeamOutlined size="large" /> Groups
          </Title>
        </Col>
        <Col lg={12} md={12} sm={12} className="joinGroup">
          <Link to="/creategroup">
            <Button type="primary" icon={<TeamOutlined />} size="large">
              Create Group
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5,
        }}
      />
      <GroupList />
    </Col>
  );
}

export default GroupListView;
