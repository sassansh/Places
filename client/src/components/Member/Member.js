import "./Member.css";

import { Avatar, Card, Button, Row, Col, Popconfirm } from "antd";
import { UserDeleteOutlined } from "@ant-design/icons";

function Member(props) {
  return (
    <Card style={{ margin: 16 }}>
      <Row align="middle" justify="end">
        <Col span={12}>
          <Row align="middle">
            <Col flex="70px">
              <Avatar src={props.user.avatarURL} size={64} />
            </Col>
            <Col flex="auto">
              <div className="user-name">{props.user.name}</div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end" gutter={[16, 0]}>
            <Col>
              <Popconfirm
                title={"Do you really want to remove " + props.user.name + " from group?"}
                okText="Yes"
                cancelText="No"
              >
                <Button
                type="primary"
                danger
                icon={<UserDeleteOutlined size="large" />}
                size="medium"
              >
                Remove From Group
              </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Member;
