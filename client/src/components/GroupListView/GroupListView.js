import "./GroupListView.css";

import { Button, Col, Divider, Row, Typography } from "antd";

import GroupList from "../GroupList/GroupList";
import { Link } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";

function GroupListView() {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col span={12}>
          <Title level={2}>
            <TeamOutlined size="large" /> Groups
          </Title>
        </Col>
        <Col span={12} className="joinGroup">
          <Link to="/creategroup">
            <Button type="primary" icon={<TeamOutlined />} size="large">
              Create Group
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <GroupList />
    </div>
  );
}

export default GroupListView;
