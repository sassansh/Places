import './Request.css';

import { Avatar, Button, Card, Col, Row } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';

function Request(props) {
  return (
    <Card style={{ margin: 16 }}>
      <Row align="middle" justify="end">
        <Col span={8}>
          <Row align="middle">
            <Col flex="70px">
              <Avatar src={props.user.avatarURL} size={64} />
            </Col>
            <Col flex="auto">
              <div className="user-name">{props.user.name}</div>
              <div className="wants-to-join">{' wants to join '}</div>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col flex="70px">
              <Avatar src={props.group.avatarURL} size={64} />
            </Col>
            <Col flex="auto">
              <div className="group-name">{props.group.name}</div>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row justify="end" gutter={[16, 0]}>
            <Col>
              <Button
                type="primary"
                icon={<CheckOutlined size="large" />}
                size="medium"
              >
                Accept
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                icon={<StopOutlined size="large" />}
                size="medium"
              >
                Reject
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Request;
