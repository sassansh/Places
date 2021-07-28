import "./Member.css";

import { Avatar, Button, Card, Col, Popconfirm, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { UserDeleteOutlined } from "@ant-design/icons";
import { removeUser } from "../../redux/actions/userActions";

function Member(props) {
  const dispatch = useDispatch();
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const currentUserID = useSelector((state) => state.users.user.user_id);
  const user_id = props.user.user_id;
  const username = user_id === currentUserID ? "yourself" : props.user.name;

  function removeUserFromGroup() {
    dispatch(
      removeUser({ currentUserID, user_id, currentGroupID }, props.history)
    );
  }
  return (
    <Card style={{ margin: 16 }}>
      <Row align="middle" justify="center">
        <Col lg={10} md={10} sm={12} xs={24}>
          <Row align="middle" justify="center">
            <Col lg={2} md={2} sm={6}>
              <Avatar src={props.user.avatarURL} size={64} />
            </Col>
            <Col lg={22} md={22} sm={24} xs={24}>
              <Row justify="center" className="user-name">
                {props.user.name}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={7} md={7} sm={24} xs={24}></Col>
        <Col lg={7} md={7} sm={8} xs={24}>
          <Row justify="center">
            <Col>
              <Row justify="center">
                <Popconfirm
                  title={
                    "Do you really want to remove " + username + " from group?"
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
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Member;
