import './RatingCriterion.css';

import { Col, Rate, Row } from 'antd';

function RatingCriterion(props) {
  return (
    <Row wrap={false} flex='0 0' className='criterion-row'>
      <Col span={12} className='crit-name'>
        {props.name + ': '}
      </Col>
      <Col span={12} className='crit-rating'>
        <Rate value={props.score} allowHalf disabled={true} />
      </Col>
    </Row>
  );
}

export default RatingCriterion;
