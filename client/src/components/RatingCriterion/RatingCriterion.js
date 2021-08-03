import './RatingCriterion.css';

import { Col, Rate, Row } from 'antd';

function RatingCriterion(props) {
  return (
    <Row wrap={false} flex="0 0" className="criterion-row">
      <Col span={12} className="crit-name">
        {props.name + ': '}
      </Col>
      {props.numeric ? (
        <Col span={12} className="crit-name">
          {props.score + '/' + props.outOf}
        </Col>
      ) : (
        <Col span={12} className="crit-rating">
          <Rate
            value={props.score}
            count={props.outOf}
            allowHalf
            character={'⬤'}
            disabled={true}
            style={{ color: '#00c', minWidth: '100%' }}
          />
        </Col>
      )}
    </Row>
  );
}

export default RatingCriterion;
