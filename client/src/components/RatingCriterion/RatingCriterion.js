import "./RatingCriterion.css"

import { Rate, Row, Col } from "antd";

function RatingCriterion(props) {
  return(
    <div>
      <Row justify="space-between" style={{background: "blue"}}>
        <Col>
          {props.name + ": "}
        </Col>
        <Col>
          <Rate
            character="█"
            value={props.score}
            count={props.outOf}
            disabled={true}
          />
        </Col>
      </Row>

    </div>
  );
}

export default RatingCriterion;
