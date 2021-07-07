import "./CreateGroup.css";

import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { createGroup } from "../../redux/actions/groupActions";
import { useDispatch } from 'react-redux';

import { Link } from "react-router-dom";
import { useState } from "react";

function CreateGroup() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fieldInput, setFieldInput] = useState({
    name: "",
    description: "",
  });

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
    });
  }
  
  function addGroup() {
    let name = form.getFieldValue("name");
    let description = form.getFieldValue("description");
    let avatarURL = form.getFieldValue("logo");
    if (name === undefined) return;
    let newGroup = {
      name: name,
      description: description,
      avatarURL: avatarURL,
    };
    dispatch(createGroup(newGroup));
    form.resetFields();
  }

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
          <Form
            className="form"
            form={form}
            layout="vertical"
            size="large"
            onChange={handleChange}
          >
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
            <Button
              className="button"
              type="primary"
              disabled={fieldInput.name === "" || fieldInput.description === ""}
            >
              Submit
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default CreateGroup;
