import "./RatingTile.css";
import { Typography, Row, Col } from "antd";

function RatingTile(props) {
  const ratingString = props.score !== undefined ? Number(props.score.toFixed(2)).toString() + "/" + props.outOf : "?";
  const { Title } = Typography;

  return (
      <Row gutter={[35,35]}>
        <Col>
          <Title level={3} italic type="success">Total score: {ratingString}</Title>
        </Col>
      </Row>
  );
}

export default RatingTile;
