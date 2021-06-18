import "./Group.css";

import { Avatar, Button, Card, Col, Row, Tooltip } from "antd";
import {
  QuestionCircleFilled,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";

function Group(props) {
  return (
    <Card style={{ margin: 16 }} onClick={props.onClick}>
      <Row justify="space-around" align="middle">
        <Col className="group" flex="100px">
          <Avatar src={props.group.avatarURL} size={64} />
        </Col>
        <Col flex="auto">
          <div className="group-name">{props.group.name}</div>
          <div className="group-descrip">{props.group.description}</div>
        </Col>
        <Col flex="auto">
          <Row justify="end" align="middle">
            <Col className="join-button">
              <Button
                type="primary"
                icon={<QuestionCircleFilled size="large" />}
                size="medium"
              >
                Join Group
              </Button>
            </Col>
            <Col className="reviews-members" flex="100px">
              <Tooltip title={props.group.numReviews + " reviews"}>
                <StarFilled size="large" />
                &nbsp;
                {props.group.numReviews}
              </Tooltip>
              &nbsp; &nbsp;
              <Tooltip title={props.group.numMembers + " members"}>
                <UserOutlined size="large" />
                &nbsp;
                {props.group.numMembers}
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Group;
