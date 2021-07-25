import './RequestView.css';

import { Col, Divider, Row, Typography } from 'antd';

import { BellOutlined } from '@ant-design/icons';
import RequestList from '../RequestList/RequestList';

function RequestView() {
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
            <BellOutlined size="large" /> Requests
          </Title>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: '0',
          borderWidth: 5,
        }}
      />
      <RequestList />
    </div>
  );
}

export default RequestView;
