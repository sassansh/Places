import {
  Col,
  Divider,
  Row,
  Typography,
} from "antd";

function SubmittedReview() {
  const { Title } = Typography;

  return (
    <div className="container">
      <Row
        style={{
          textAlign: "center"
        }}
      >
        <Col lg={24}>
          <Title level={2}>Thank you!</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row
        style={{
          textAlign: "center"
        }}
      >
        <Col lg={24}>
          <Title level={4}>Your review was submitted.</Title>
        </Col>
      </Row>
    </div>
  );
}

export default SubmittedReview;
