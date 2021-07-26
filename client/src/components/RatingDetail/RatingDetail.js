import "./RatingDetail.css"

import { Card, Typography, Row, Col } from "antd";
import RatingCriterion from "../RatingCriterion/RatingCriterion";
import RatingTile from "../RatingTile/RatingTile";

function RatingDetail(props) {
  const { Title } = Typography;
  const ratingString = props.score !== undefined ? Number(props.score.toFixed(2)).toString() + "/" + props.outOf : "?";

  const criteria = props.criteria.map(
    (criterion) => (
        <RatingCriterion name={criterion.name}
          outOf={criterion.outOf}
          score={criterion.score}
        />
    )
  );

  return (
    <Card className="rating-detail" size="small">
      <Row gutter={[35,35]}>
        <Col>
          <Title className="crit-title" level={3}>Total score: {ratingString}</Title>
        </Col>
      </Row>
      {criteria}
    </Card>
  );
}

export default RatingDetail;
