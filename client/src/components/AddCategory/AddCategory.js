// TODO: this is extremely not done. please don't mistake it for a done thing.


import './AddCategory.css';

import { Button, Col, Divider, Form, Input, Row, Typography, Slider, Space, Select, Switch, InputNumber, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import { GraphemeSplitter } from 'grapheme-splitter';
import 'emoji-mart/css/emoji-mart.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCategory } from '../../redux/actions/categoryActions';


function AddCategory(props) {
  const { Option } = Select;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.groups.currentGroupID);
  // const [fieldInput, setFieldInput] = useState({
  //   name: '',
  // });
  const [isCustomCriteria, setIsCustomCriteria] = useState(false);
  const [numberOfCriteria, setNumberOfCriteria] = useState(1);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const defaultCriteria = ["Coolness", "Flavour", "Space", "Quality", "Fun"];

  function handleChange() {
    console.log("changed");
    let emojiField = form.getFieldValue('emoji');
    if (emojiField) {
      let emoji = emojiField.match(/\p{Emoji_Presentation}/gu);
      if (emoji) {
        form.setFieldsValue({emoji: emoji[0]});
      } else {
        form.setFieldsValue({emoji: ""});
      }
    }

    // setFieldInput({
    //   name: form.getFieldValue('name'),
    // });
  }

  function handleAddCategory() {
    let name = form.getFieldValue('name');
    let name_singular = form.getFieldValue('name_singular');
    let emoji = form.getFieldValue('emoji');
    let criteria= form.getFieldValue('criteria');
    //if (name === undefined) return;
    let newCategory = {
      name: name,
      name_singluar: name_singular,
      emoji: emoji,
      criteria: criteria
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
      <Row justify="center">
        <Col lg={12} md={12} sm={12}>
          <Form
            className="form"
            form={form}
            layout="vertical"
            size="large"
            onChange={handleChange}
            initialValues={{ criteria: [{criterion: defaultCriteria[0], weight: 5}] }}
          >
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="name_singular" label="Name (singular)">
              <Input placeholder="Name (singular)" />
            </Form.Item>
            <Form.Item label="Emoji">
              <Form.Item name="emoji">
                <Input
                  size="large"
                  suffix={<SmileOutlined onClick={() => setEmojiPickerVisible(true)}/>}
                />
              </Form.Item>
              <Modal visible={emojiPickerVisible} footer={null} onOk={()=>{}} onCancel={()=>{setEmojiPickerVisible(false)}}>
                <Picker title='Select emoji' emoji='pin' onSelect={emoji => {
                  form.setFieldsValue({emoji: emoji.native});
                  setEmojiPickerVisible(false);
                }} />
              </Modal>
            </Form.Item>
            <Form.Item label="Use Custom Criteria?" name="customCriteriaSwitch" valuePropName="checked">
              <Switch defaultChecked={false} onChange={(value) => {setIsCustomCriteria(value)}} />
            </Form.Item>
            {isCustomCriteria &&
            <Form.List name="criteria">
             {(fields, { add, remove }) => (
               <>
                 {fields.map(({ key, name, fieldKey, ...restField }) => (
                   <Row gutter={[7,7]} align="middle" key={key} >
                     <Col span={2}>
                      {(name > 0) && <MinusCircleOutlined
                        onClick={() => {
                          setNumberOfCriteria(numberOfCriteria - 1);
                          remove(name);
                        }}
                        style={{paddingTop:"18px"}}
                      />}
                      {console.log("name: " + name)}
                      {console.log("fieldKey: " + fieldKey)}
                      {console.log("key: "+ key)}
                     </Col>
                     <Col span={11}>
                       <Form.Item
                         {...restField}
                         name={[name, 'criterion']}
                         label="Criterion"
                         fieldKey={[fieldKey, 'criterion']}
                       >
                         <Input placeholder="Coolness" />
                       </Form.Item>
                      </Col>
                      <Col span={11}>
                       <Form.Item
                         {...restField}
                         name={[name, 'weight']}
                         label="Weight (1-10)"
                         fieldKey={[fieldKey, 'weight']}
                       >
                          <InputNumber min={1} max={10} formatter={value => Math.round(value)} />
                       </Form.Item>
                      </Col>
                    </Row>
                 ))}
                 {(numberOfCriteria < 5) && <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        setNumberOfCriteria(numberOfCriteria + 1);
                        add({ criterion: defaultCriteria[numberOfCriteria%5], weight: 5 });
                      }}
                      block icon={<PlusOutlined />}
                    >
                     Add criterion
                   </Button>
                 </Form.Item>}
               </>
             )}
           </Form.List>}
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
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

//disabled={fieldInput.name === ''} (in button)

<Slider min={1} max={10}/>
export default AddCategory;
