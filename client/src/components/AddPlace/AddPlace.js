import './AddPlace.css';

import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { addPlace } from '../../redux/actions/placeActions';
import { useState } from 'react';

const { Title } = Typography;

function AddPlace(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.allCategories);
  const currentCategoryID = useSelector(
    (state) => state.categories.currentCategoryID
  );
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const [fieldInput, setFieldInput] = useState({
    name: ''
  });
  const [imageData, setimageData] = useState('');
  const [imageButtonName, setimageButtonName] = useState('🖼️ Select File');

  const imageHandler = (e) => {
    const imageSelected = e.target.files.length > 0;
    if (imageSelected) {
      let fileName = e.target.files[0].name;
      if (fileName.length > 20) {
        fileName =
          fileName.substring(0, 10) +
          '...' +
          fileName.substring(fileName.length - 10);
      }
      setimageButtonName('🖼️ ' + fileName);
      setimageData(e.target.files[0]);
    } else {
      setimageButtonName('🖼️ Select File');
      setimageData('');
    }
  };

  const currentCategory = () => {
    return categories.find(
      (category) => category.category_id === currentCategoryID
    );
  };

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue('name')
    });
  }

  function handleAddPlace() {
    const name = form.getFieldValue('name');
    const address = form.getFieldValue('address');
    if (name === undefined) return;
    const newPlace = new FormData();
    newPlace.append('name', name);
    newPlace.append('address', address);
    newPlace.append('group_id', currentGroupID);
    newPlace.append('category_id', currentCategoryID);
    newPlace.append('placeImage', imageData);
    dispatch(addPlace(newPlace, props.history));
    form.resetFields();
  }
  
  return (
    <Col className='container'>
      <Row justify='center'>
        <Col lg={12} md={12} sm={12}>
          <Title level={2}>Add {currentCategory().name_singular}</Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24} />
        <Col lg={12} md={12} sm={12} className='currentCategory'>
          <h2>
            {currentCategory().emoji} {currentCategory().name}
          </h2>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5
        }}
      />
      <Row justify='center'>
        <Col lg={8} md={10} sm={10}>
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
            <Form.Item name='address' label='Address'>
              <Input placeholder='Address' />
            </Form.Item>
            Image
            <br />
            <br />
            <input
              className='imageuploadinput'
              type='file'
              id='profilepic'
              onChange={imageHandler}
            />
            <label className='imageuploadlabel' htmlFor='profilepic'>
              {imageButtonName}
            </label>
            <br />
            <br />
            <br />
          </Form>
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <Button
            onClick={handleAddPlace}
            className='button'
            type='primary'
            size='large'
            disabled={
              fieldInput.name === '' ||
              fieldInput.address === '' ||
              imageData === ''
            }
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default AddPlace;
