import "./Group.css";

import { Avatar, Button, Card, Col, Row, Tooltip } from "antd";
import {
  QuestionCircleFilled,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";

function Group(props) {
  const users = useSelector(state=>state.users.allUsers);
  const reviews = useSelector(state=> state.reviews.allReviews);
  const places = useSelector(state=> state.places.allPlaces);
  let numMembers = 0;
  users.forEach((user) => {
    if (user.groups.includes(props.group.group_id)) {
      numMembers++;
    }
  });
  let numReviews = 0;
  reviews.forEach((review) => {
    let place_id = review.place_id;
    places.forEach((place) => {
      if (
        place_id === place.place_id &&
        props.group.group_id === place.group_id
      ) {
        numReviews++;
      }
    });
  });
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
              <Tooltip title={numReviews + " reviews"}>
                <StarFilled size="large" />
                &nbsp;
                {numReviews}
              </Tooltip>
              &nbsp; &nbsp;
              <Tooltip title={numMembers + " members"}>
                <UserOutlined size="large" />
                &nbsp;
                {numMembers}
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Group;
