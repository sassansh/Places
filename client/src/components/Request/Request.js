import "./Request.css";

import { Avatar, Card, Button, Row, Col } from "antd";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";

function Request(props) {
  return (
    <Card style={{ margin: 16 }}>
      <Row align="middle" justify="space-around">
        <Col>
          <Avatar src={props.user.avatarURL} size={64} />
          {props.user.name}
        </Col>
        <Col>
          {" wants to join "}
        </Col>
        <Col>
          {props.group.name}
          <Avatar src={props.group.avatarURL} size={64} />
        </Col>
        <Col>
          <Button
            icon={<CheckOutlined size="large" />}
            size="medium"
          >
            Accept
          </Button>
          <Button
            icon={<StopOutlined size="large" />}
            size="medium"
          >
            Reject
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default Request;
