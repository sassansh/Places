import './RatingDetail.css';

import { Card, Col, Divider, Row, Typography } from 'antd';

import RatingCriterion from '../RatingCriterion/RatingCriterion';

function RatingDetail(props) {
  const { Title } = Typography;
  const ratingString =
    props.score !== undefined
      ? Number(props.score.toFixed(2)).toString() + '/' + props.outOf
      : '?';

  const criteria = props.criteria.map((criterion, index) => (
    <div key={criterion.name}>
      <RatingCriterion
        name={criterion.name}
        numeric={props.numeric}
        outOf={criterion.outOf}
        score={criterion.score}
      />
      {index < props.criteria.length - 1 && (
        <Divider style={{ marginTop: 3, marginBottom: 3, borderWidth: 1 }} />
      )}
    </div>
  ));

  return (
    <Card className="rating-detail">
      <Row gutter={[35, 35]} wrap={false}>
        <Col>
          {props.name && (
            <Title className="crit-title" level={3}>
              {props.name}
            </Title>
          )}
          <Title className="crit-title" level={3}>
            Total score: {ratingString}
          </Title>
        </Col>
      </Row>
      {criteria}
    </Card>
  );
}

export default RatingDetail;
