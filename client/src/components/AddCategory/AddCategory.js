// TODO: this is extremely not done. please don't mistake it for a done thing.


import './AddCategory.css';

import { Button, Col, Divider, Form, Input, Row, Typography, Slider, Space, Select, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCategory } from '../../redux/actions/categoryActions';


function AddCategory(props) {
  const { Option } = Select;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.groups.currentGroupID);
  const [fieldInput, setFieldInput] = useState({
    name: '',
  });
  const [isCustomCriteria, setIsCustomCriteria] = useState(false);

  function handleChange() {
    setFieldInput({
      name: form.getFieldValue('name'),
    });
    setIsCustomCriteria(form.getFieldValue('customCriteriaSwitch'));
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
    console.log(newCategory);
    //dispatch(addCategory(newCategory, props.history));
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
      {isCustomCriteria? "Custom Criteria Enabled" : ""}
      <Row justify="center">
        <Col lg={12} md={12} sm={12}>
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
            <Form.Item name="name_singular" label="Name (singular)">
              <Input placeholder="Name (singular)" />
            </Form.Item>
            <Form.Item name="emoji" label="Emoji">
              <Input placeholder="📍" />
            </Form.Item>
            <Form.Item label="Use Custom Criteria?" name="customCriteriaSwitch">
              <Switch />
            </Form.Item>
            <Form.List name="criteria" rules={[
              {
                validator: async (_, criteria) => {
                  if (!criteria || criteria.length > 5 || criteria.length == 0) {
                    return Promise.reject(new Error('Must be between 1 and 5 criteria'));
                  }
                },
              },
            ]}>
             {(fields, { add, remove }, { errors }) => (
               <>
                 {fields.map(({ key, name, fieldKey, ...restField }) => (
                   <Row gutter={[7,7]} align="middle">
                     <Col span={2}>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{paddingTop:"18px"}} />
                     </Col>
                     <Col span={11}>
                       <Form.Item
                         {...restField}
                         name={[name, 'criterion']}
                         label="Criterion"
                         fieldKey={[fieldKey, 'criterion']}
                         rules={[{ required: true, message: 'Missing criterion name' }]}
                       >
                         <Input placeholder="Coolness" />
                       </Form.Item>
                      </Col>
                      <Col span={11}>
                       <Form.Item
                         {...restField}
                         name={[name, 'weight']}
                         label="Weight"
                         fieldKey={[fieldKey, 'weight']}
                       >
                         <Slider
                           min={1}
                           max={10}
                           defaultValue={5}
                         />
                       </Form.Item>
                      </Col>
                    </Row>
                 ))}
                 <Form.Item>
                   <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                     Add criterion
                   </Button>
                   <Form.ErrorList errors={errors} />
                 </Form.Item>
               </>
             )}
           </Form.List>
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

export default AddCategory;
