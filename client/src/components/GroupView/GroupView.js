import './GroupView.css';

import { Avatar, Button, Col, Divider, Row, Typography } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

import CategoryList from '../CategoryList/CategoryList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GroupView() {
  const { Title } = Typography;
  const groups = useSelector((state) => state.groups.allGroups);
  const users = useSelector((state) => state.users.allUsers);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const currentGroup = groups.find(
    (group) => group.group_id === currentGroupID
  );
  const title = currentGroup.name;
  const avatarURL = currentGroup.avatarURL;
  let numMembers = 0;
  users.forEach((user) => {
    if (user.groups.includes(currentGroupID)) {
      numMembers++;
    }
  });
  return (
    <Col className='container'>
      <Row justify='center'>
        <Col lg={17} md={17} sm={18} xs={24}>
          <Row>
            <Title level={2}>
              <Avatar size='large' src={avatarURL} /> {title}
            </Title>
            <Col lg={6} md={6} sm={24} xs={24}>
              <Row justify='center'>
                <Link to='/managegroup'>
                  <Button type='primary' size='small' className='button'>
                    Manage Group
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={7} md={7} sm={10} className='numOfMembers'>
          <Title level={2}>
            <UserOutlined size='large' /> {numMembers} Members
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          borderWidth: 5
        }}
      />
      <Link to='/addCategory' className='addCategoryLink'>
        <Button type='primary' icon={<PlusOutlined />} size='large'>
          Add Category
        </Button>
      </Link>
      <CategoryList />
    </Col>
  );
}

export default GroupView;
