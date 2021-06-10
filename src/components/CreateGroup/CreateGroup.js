import "./CreateGroup.css";
import { Row, Col, Typography, Divider, Button, Form, Input } from "antd";

function CreateGroup() {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: "20px",
        }}
      >
        <Col lg={24}>
          <Title level={2}>Create Group</Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "0",
          borderWidth: 5,
        }}
      />
      <Row justify="center">
        <Col lg={8}>
          <Form className="form" layout="vertical" size="large">
            <Form.Item label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Description">
              <Input placeholder="Description" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button className="button" type="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CreateGroup;
