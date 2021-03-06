import './Request.css';

import { Avatar, Button, Card, Col, Row } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import {
  userAcceptRequestToJoinGroup,
  userRejectRequestToJoinGroup
} from '../../redux/actions/userActions';

import { useDispatch } from 'react-redux';

function Request(props) {
  const dispatch = useDispatch();

  function handleAccept() {
    dispatch(userAcceptRequestToJoinGroup(props.user.user_id, props.group.group_id));
  }

  function handleReject() {
    dispatch(userRejectRequestToJoinGroup(props.user.user_id, props.group.group_id));
  }
  return (
    <Card style={{ margin: 16 }}>
      <Row justify='start' align='middle' gutter={[16, 16]} wrap>
        <Col lg={8} md={12} sm={24}>
          <Row gutter={[16, 16]} align='middle' justify='start' wrap={false}>
            <Col lg={{ flex: '70px' }} md={{ flex: '70px' }}>
              <Avatar src={props.user.avatarURL} size={64} />
            </Col>
            <Col flex='auto'>
              <div className='request-user-name'>{props.user.name}</div>
              <div className='wants-to-join'>{' wants to join '}</div>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Row gutter={[16, 16]} align='middle' justify='start' wrap={false}>
            <Col lg={{ flex: '70px' }} md={{ flex: '70px' }}>
              <Avatar src={props.group.avatarURL} size={64} />
            </Col>
            <Col flex='auto' justify='start'>
              <div className='request-group-name'>{props.group.name}</div>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Row align='middle' justify='center' gutter={[16, 16]} wrap={false}>
            <Col>
              <Button
                type='primary'
                icon={<CheckOutlined size='large' />}
                size='medium'
                onClick={handleAccept}
              >
                Accept
              </Button>
            </Col>
            <Col>
              <Button
                type='primary'
                danger
                icon={<StopOutlined size='large' />}
                size='medium'
                onClick={handleReject}
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
