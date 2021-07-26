// TODO: this is extremely not done. please don't mistake it for a done thing.


import './AddCategory.css';

import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { addCategory } from '../../redux/actions/categoryActions';
import { useState } from 'react';

function AddPlace(props) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.groups.currentGroupID);
  const [fieldInput, setFieldInput] = useState({
    name: '',
  });

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue('name'),
    });
  }

  function handleAddCategory() {
    let name = form.getFieldValue('name_plural');
    let name_singular = form.getFieldValue('name_singular');
    let emoji = form.getFieldValue('emoji');
    let criteria_weights= form.getFieldValue('criteria_weights');
    let criteria_names = form.getFieldValue(criteria_names);
    if (name === undefined) return;
    let newCategory = {
      name: name,
      name_singluar: name_singular,
      emoji: emoji,
      criteria_weights: criteria_weights,
      criteria_names: criteria_names,
      group_id: currentGroup,
    };
    dispatch(addCategory(newCategory, props.history));
    form.resetFields();
  }
  return (
    <Col className="container">
      <Row justify="center">
        <Col lg={12} md={12} sm={12}>
          <Title level={2}>Add Cateogry</Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24}></Col>
        <Col lg={12} md={12} sm={12} className="currentCategory">
          <h2>
             {currentGroup.name}
          </h2>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5,
        }}
      />
      <Row justify="center">
        <Col lg={8} md={10} sm={10}>
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
            <Form.Item name="imgURL" label="Image URL">
              <Input placeholder="http://" />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="Address" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button
            onClick={handleAddCategory}
            className="button"
            type="primary"
            size="large"
            disabled={fieldInput.name === ''}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default AddPlace;
