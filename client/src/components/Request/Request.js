import "./Request.css";

import { Avatar, Card, Button } from "antd";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";

function Request(props) {
  return (
    <Card style={{ margin: 16 }}>
      <Avatar src={props.user.avatarURL} size={64} />
      {props.user.name + " wants to join " + props.group.name}
      <Avatar src={props.group.avatarURL} size={64} />
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
    </Card>
  );
}

export default Request;
