import "./RatingCriterion.css"

import { Rate, Row, Col } from "antd";

function RatingCriterion(props) {
  return(
      <Row>
        <Col lg={12} className="crit-name">
          {props.name + ": "}
        </Col>
        <Col lg={12} className="crit-rating">
        <Rate
          value={props.score}
          count={props.outOf}
          disabled={true}
        />
        </Col>
      </Row>
  );
}

export default RatingCriterion;
