import "./Group.css";
import { Card, Avatar } from "antd";
import {
  UserOutlined,
  StarOutlined
} from "@ant-design/icons";
import { Link } from "wouter";

function Group(props) {
  return (
    <Link to="/GroupView">
      <Card style={{ margin: 16 }}>
        <span className="group">
          <Avatar src={props.group.avatarURL} size={64} />
          <span className="group-name">{props.group.name}</span>
          <span className="group-descrip">{props.group.description}</span>
        </span>

        <span className="num-reviews">
          <StarOutlined size="large"/>
          &nbsp;
          {props.group.numReviews}
        </span>
        <span className="num-members">
          <UserOutlined size="large"/>
          &nbsp;
          {props.group.numMembers}
        </span>
      </Card>
    </Link>
  );
}

export default Group;
