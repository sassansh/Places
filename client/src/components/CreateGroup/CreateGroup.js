import "./CreateGroup.css";

import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import GroupsContext from "../../context/GroupsContext";
import CurrentGroupIDContext from "../../context/CurrentGroupIDContext";
import { useContext } from "react";
import { Link } from "wouter";

function CreateGroup() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [groups] = useContext(GroupsContext);
  const [currentGroupID, setCurrentGroupID] = useContext(CurrentGroupIDContext);
  function addGroup() {
    let group_id = groups.length + 1;
    let name = form.getFieldValue("name");
    let description = form.getFieldValue("description");
    let avatarURL = form.getFieldValue("logo");
    if (name === undefined) return;
    let newGroup = {
      group_id: group_id,
      name: name,
      description: description,
      avatarURL: avatarURL,
      numReviews: 0,
      numMembers: 0,
    };
    console.log(currentGroupID);
    groups.push(newGroup);
    setCurrentGroupID(group_id);
    form.resetFields();
  };
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
          <Form className="form" form={form} layout="vertical" size="large">
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input placeholder="Description" />
            </Form.Item>
            <Form.Item name="logo" label="Logo">
              <Input placeholder="http://" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Link to="/" onClick={addGroup}>
          <Button className="button" type="primary">
            Submit
          </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default CreateGroup;