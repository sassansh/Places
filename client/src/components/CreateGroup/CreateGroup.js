import './CreateGroup.css';

import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';

import { createGroup } from '../../redux/actions/groupActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function CreateGroup(props) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [logoData, setLogoData] = useState('');
  const [fieldInput, setFieldInput] = useState({
    name: '',
    description: '',
  });
  const [logoButtonName, setlogoButtonName] = useState('🖼️ Select File');

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description'),
    });
  }

  const logoHandler = (e) => {
    const imageSelected = e.target.files.length > 0;
    if (imageSelected) {
      let fileName = e.target.files[0].name;
      if (fileName.length > 20) {
        fileName =
          fileName.substring(0, 10) +
          '...' +
          fileName.substring(fileName.length - 10);
      }
      setlogoButtonName('🖼️ ' + fileName);
      setLogoData(e.target.files[0]);
    } else {
      setlogoButtonName('🖼️ Select File');
      setLogoData('');
    }
  };

  function addGroup() {
    let name = form.getFieldValue('name');
    let description = form.getFieldValue('description');
    const newGroup = new FormData();
    newGroup.append('name', name);
    newGroup.append('description', description);
    newGroup.append('logo', logoData);
    if (name === undefined) return;
    dispatch(createGroup(newGroup, props.history));
    form.resetFields();
  }

  return (
    <Col className="container">
      <Row justify="center">
        <Col lg={24} md={24}>
          <Title level={2}>Create Group</Title>
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
            <Form.Item name="description" label="Description">
              <Input placeholder="Description" />
            </Form.Item>
          </Form>
          Logo
          <br />
          <br />
          <input
            className="logouploadinput"
            type="file"
            id="logoupload"
            onChange={logoHandler}
          />
          <label className="logouploadlabel" htmlFor="logoupload">
            {logoButtonName}
          </label>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button
            onClick={addGroup}
            className="button"
            type="primary"
            size="large"
            disabled={
              fieldInput.name === '' ||
              fieldInput.description === '' ||
              logoData === ''
            }
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default CreateGroup;
