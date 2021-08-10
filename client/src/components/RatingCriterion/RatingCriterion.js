import './RatingCriterion.css';

import { Col, Row } from 'antd';

import RoundedRate from '../RoundedRate/RoundedRate';

function RatingCriterion(props) {
  return (
    <Row wrap={false} flex='0 0' className='criterion-row'>
      <Col span={12} className='crit-name'>
        {props.name + ': '}
      </Col>
      <Col span={12} className='crit-rating'>
        <RoundedRate value={props.score} allowHalf disabled />
      </Col>
    </Row>
  );
}

export default RatingCriterion;
