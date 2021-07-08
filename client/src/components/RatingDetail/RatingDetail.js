import "./RatingDetail.css"

import RatingCriterion from "../RatingCriterion/RatingCriterion";

function RatingDetail(props) {
  const criteria = props.criteria.map(
    (criterion) => (
        <RatingCriterion name={criterion.name}
          outOf={criterion.outOf}
          score={criterion.score}
        />
    )
  );

  return (
    <div>
      <ul>{criteria}</ul>
    </div>
  );
}

export default RatingDetail;
