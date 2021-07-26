import './Member.css';

import { Avatar, Button, Card, Col, Popconfirm, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { UserDeleteOutlined } from '@ant-design/icons';
import { removeUser } from '../../redux/actions/userActions';

function Member(props) {
  const dispatch = useDispatch();
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const currentUserID = useSelector((state) => state.users.user.user_id);
  const user_id = props.user.user_id;
  const username = user_id === currentUserID ? 'yourself' : props.user.name;

  function removeUserFromGroup() {
    dispatch(
      removeUser({ currentUserID, user_id, currentGroupID }, props.history)
    );
  }
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
                title={
                  'Do you really want to remove ' + username + ' from group?'
                }
                okText="Yes"
                cancelText="No"
                onConfirm={removeUserFromGroup}
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
