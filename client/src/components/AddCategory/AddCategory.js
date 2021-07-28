import './AddCategory.css';

import { Button, Col, Divider, Form, Input, Row, Typography, Switch, InputNumber, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import GraphemeSplitter from "grapheme-splitter";
import 'emoji-mart/css/emoji-mart.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCategory } from '../../redux/actions/categoryActions';

function AddCategory(props) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const splitter = new GraphemeSplitter();
  const currentGroup = useSelector((state) => state.groups.currentGroupID);
  const [isCustomCriteria, setIsCustomCriteria] = useState(false);
  const [numberOfCriteria, setNumberOfCriteria] = useState(1);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const defaultCriteria = ["Coolness", "Flavour", "Space", "Quality", "Trendiness"];

  function handleChange() {
    console.log("changed");
    let emojiField = form.getFieldValue('emoji');
    if (emojiField) {
      let graphemes = splitter.splitGraphemes(emojiField);
      let lastEmoji = "";
      graphemes.forEach((item) => {
        if (item.match(/\p{Emoji_Presentation}/gu)) {
          lastEmoji = item;
        }
      });
      form.setFieldsValue({emoji: lastEmoji});
    }
  }

  function handleAddCategory() {
    let name = form.getFieldValue('name_plural');
    let name_singular = form.getFieldValue('name_singular');
    let emoji = form.getFieldValue('emoji');
    let criteria= form.getFieldValue('criteria');
    let newCategory = {
      name: name,
      name_singluar: name_singular,
      emoji: emoji,
      criteria: criteria
    };
    console.log(newCategory);
    if (false) {
      dispatch(addCategory(newCategory, props.history));
    }
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
            <Form.Item name="name_singular" label="Name for one place">
              <Input placeholder="Beach" />
            </Form.Item>
            <Form.Item name="name_plural" label="Name for multiple places">
              <Input placeholder="Beaches" />
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
            <Form.Item label="Use custom criteria?" name="customCriteriaSwitch" valuePropName="checked">
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

export default AddCategory;
