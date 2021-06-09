import "./GroupView.css";
import { Row, Col, Typography, Divider, Avatar } from "antd";

function GroupView() {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={10}>
          <Title level={2}>
          <Avatar size="large" src="https://mspoweruser.com/wp-content/uploads/2017/09/azure-1.png" />
          {" "}
            Azure Group
          </Title>
        </Col>
        <Col lg={4}></Col>
        <Col lg={10}>
          <Title level={2}>👤 13 Members</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
    </div>
  );
}

export default GroupView;