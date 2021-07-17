import './AddPlace.css';

import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { addPlace } from '../../redux/actions/placeActions';
import { useState } from 'react';

function AddPlace(props) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const [fieldInput, setFieldInput] = useState({
    name: '',
  });

  const currentCategory = () => {
    return categories.find(
      (category) => category.category_id === currentCategoryID
    );
  };

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue('name'),
    });
  }

  function handleAddPlace() {
    let name = form.getFieldValue('name');
    let imgURL = form.getFieldValue('imgURL');
    let address = form.getFieldValue('address');
    if (name === undefined) return;
    let newPlace = {
      name: name,
      address: address,
      group_id: currentGroupID,
      category_id: currentCategoryID,
      ImageURL: imgURL,
    };
    dispatch(addPlace(newPlace, props.history));
    form.resetFields();
  }
  return (
    <Col className="container">
      <Row justify="center">
        <Col lg={12} md={12} sm={12}>
          <Title level={2}>Add {currentCategory().name_singular}</Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24}></Col>
        <Col lg={12} md={12} sm={12} className="currentCategory">
          <h2>
            {currentCategory().emoji} {currentCategory().name}
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
            onClick={handleAddPlace}
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
