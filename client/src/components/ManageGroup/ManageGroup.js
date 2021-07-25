import './ManageGroup.css';

import { Col, Divider, Row, Typography } from 'antd';

import MemberList from '../MemberList/MemberList';
import { UserOutlined } from '@ant-design/icons';

function ManageGroup(props) {
  const { Title } = Typography;
  return (
    <div className="container">
      <Row
        style={{
          marginLeft: '20px',
        }}
      >
        <Col span={24}>
          <Title level={2}>
            <UserOutlined size="large" /> Members
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <MemberList history={props.history} />
    </div>
  );
}

export default ManageGroup;
