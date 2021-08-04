import './CreateGroup.css';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography
} from 'antd';

import { createGroup } from '../../redux/actions/groupActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const { Option } = Select;

function CreateGroup (props) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [logoData, setLogoData] = useState('');
  const [fieldInput, setFieldInput] = useState({
    name: '',
    description: ''
  });
  const [logoButtonName, setlogoButtonName] = useState('🖼️ Select File');
  const [defaultCategories, setDefaultCategories] = useState([]);

  function handleChange () {
    setFieldInput({
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description')
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

  function handleCategories (value) {
    setDefaultCategories(value);
  }

  function addGroup () {
    const name = form.getFieldValue('name');
    const description = form.getFieldValue('description');
    const newGroup = new FormData();
    newGroup.append('name', name);
    newGroup.append('description', description);
    newGroup.append('logo', logoData);
    newGroup.append('defaultCategories', defaultCategories);
    if (name === undefined) return;
    dispatch(createGroup(newGroup, props.history));
  }

  return (
    <Col className='container'>
      <Row justify='center'>
        <Col lg={24} md={24}>
          <Title level={2}>Create Group</Title>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5
        }}
      />
      <Row justify='center'>
        <Col xl={12} lg={16} md={16} sm={18} xs={24}>
          <Form
            className='form'
            form={form}
            layout='vertical'
            size='large'
            onChange={handleChange}
          >
            <Form.Item name='name' label='Name'>
              <Input placeholder='Name' />
            </Form.Item>
            <Form.Item name='description' label='Description'>
              <Input placeholder='Description' />
            </Form.Item>
          </Form>
          Logo
          <br />
          <br />
          <input
            className='logouploadinput'
            type='file'
            id='logoupload'
            onChange={logoHandler}
          />
          <label className='logouploadlabel' htmlFor='logoupload'>
            {logoButtonName}
          </label>
          <br />
          <br />
          <br />
          <Form.Item
            name='default-categories'
            label='Categories'
            rules={[
              {
                type: 'array'
              }
            ]}
          >
            <Select
              mode='multiple'
              placeholder='Please select categories to be created in your group'
              onChange={handleCategories}
            >
              <Option value='beaches'>🏖️ Beaches</Option>
              <Option value='restaurants'>🍔 Restaurants</Option>
              <Option value='nightclubs'>🎶 Nightclubs</Option>
              <Option value='parks'>🏞️ Parks</Option>
              <Option value='breweries'>🍻 Breweries</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <Button
            onClick={addGroup}
            className='button'
            type='primary'
            size='large'
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
