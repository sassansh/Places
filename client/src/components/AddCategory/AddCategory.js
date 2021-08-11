import './AddCategory.css';
import 'emoji-mart/css/emoji-mart.css';

import { Button, Col, Divider, Form, Input, Modal, Row, Switch, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import GraphemeSplitter from 'grapheme-splitter';
import { Picker } from 'emoji-mart';
import { addCategory } from '../../redux/actions/categoryActions';
import isEmpty from 'is-empty';
import { useState } from 'react';

const { Title } = Typography;

function AddCategory(props) {
  const [form] = Form.useForm();
  const splitter = new GraphemeSplitter();
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.groups.currentGroupID);
  const [isCustomCriteria, setIsCustomCriteria] = useState(false);
  const [numberOfCriteria, setNumberOfCriteria] = useState(2);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const defaultCriteria = ['Coolness', 'Quality', 'Flavour', 'Comfort', 'Size'];

  function handleChange() {
    const emojiField = form.getFieldValue('emoji');
    if (emojiField) {
      const graphemes = splitter.splitGraphemes(emojiField);
      let lastEmoji = '';
      graphemes.forEach((item) => {
        if (item.match(/\p{Emoji_Presentation}/gu)) {
          lastEmoji = item;
        }
      });
      form.setFieldsValue({ emoji: lastEmoji });
    }
    if (
      isEmpty(form.getFieldValue('name_plural')) ||
      isEmpty(form.getFieldValue('name_singular')) ||
      isEmpty(form.getFieldValue('emoji'))
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }

  function handleAddCategory() {
    const name = form.getFieldValue('name_plural');
    const name_singular = form.getFieldValue('name_singular');
    const emoji = form.getFieldValue('emoji');
    const criteria = form.getFieldValue('criteria');
    const use_custom_criteria = form.getFieldValue('use_custom_criteria');
    const rawCriteria = [];
    criteria.forEach((element) => rawCriteria.push(element.criterion));

    const newCategory = {
      name: name,
      name_singular: name_singular,
      emoji: emoji,
      group_id: currentGroup,
      custom_criteria: use_custom_criteria ? rawCriteria : []
    };

    dispatch(addCategory(newCategory, props.history));
  }

  return (
    <Col className='container'>
      <Row justify='center'>
        <Col lg={12} md={12} sm={12}>
          <Title level={2}>Add Category</Title>
        </Col>
        <Col lg={0} md={0} sm={0} xs={24} />
        <Col lg={12} md={12} sm={12} className='currentCategory'>
          <h2>{currentGroup.name}</h2>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5
        }}
      />
      <Row justify='center'>
        <Col lg={12} md={12} sm={12}>
          <Form
            className='form'
            form={form}
            layout='vertical'
            size='large'
            onChange={handleChange}
            initialValues={{
              criteria: [{ criterion: defaultCriteria[0] }, { criterion: defaultCriteria[1] }]
            }}
          >
            <Form.Item name='name_singular' label='Name for one place'>
              <Input placeholder='Beach' />
            </Form.Item>
            <Form.Item name='name_plural' label='Name for multiple places'>
              <Input placeholder='Beaches' />
            </Form.Item>
            <Form.Item label='Emoji'>
              <Form.Item name='emoji'>
                <Input
                  size='large'
                  suffix={<SmileOutlined onClick={() => setEmojiPickerVisible(true)} />}
                />
              </Form.Item>
              <Modal
                visible={emojiPickerVisible}
                footer={null}
                onOk={() => {}}
                onCancel={() => {
                  setEmojiPickerVisible(false);
                }}
              >
                <Picker
                  title='Select emoji'
                  emoji='pin'
                  onSelect={(emoji) => {
                    form.setFieldsValue({ emoji: emoji.native });
                    setEmojiPickerVisible(false);
                    handleChange();
                  }}
                />
              </Modal>
            </Form.Item>
            <Form.Item
              label='Use custom criteria?'
              name='use_custom_criteria'
              valuePropName='checked'
            >
              <Switch
                value={isCustomCriteria}
                onChange={(value) => {
                  setIsCustomCriteria(value);
                }}
              />
            </Form.Item>
            {isCustomCriteria && (
              <Form.List name='criteria'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row gutter={[7, 7]} align='middle' key={key}>
                        <Col span={2}>
                          {name > 1 && (
                            <MinusCircleOutlined
                              onClick={() => {
                                setNumberOfCriteria(numberOfCriteria - 1);
                                remove(name);
                              }}
                              style={{ paddingTop: '18px' }}
                            />
                          )}
                        </Col>
                        <Col span={22}>
                          <Form.Item
                            {...restField}
                            name={[name, 'criterion']}
                            label='Criterion'
                            fieldKey={[fieldKey, 'criterion']}
                          >
                            <Input placeholder={defaultCriteria[name % 6]} />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    {numberOfCriteria < 5 && (
                      <Form.Item>
                        <Button
                          type='dashed'
                          onClick={() => {
                            setNumberOfCriteria(numberOfCriteria + 1);
                            add({
                              criterion: defaultCriteria[numberOfCriteria % 5]
                            });
                          }}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add criterion
                        </Button>
                      </Form.Item>
                    )}
                  </>
                )}
              </Form.List>
            )}
          </Form>
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <Button
            onClick={handleAddCategory}
            className='button'
            type='primary'
            size='large'
            disabled={disableSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default AddCategory;
