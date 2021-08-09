import { Card, Divider } from 'antd';

import RatingCriterion from '../RatingCriterion/RatingCriterion';

function RatingDetail(props) {
  const criteriaData = props.criteria.map(
    (criterion, index) =>
      props.reviewsData.map((review) => review.rating[index]).reduce((p, c) => p + c, 0) /
      props.reviewsData.length
  );

  const criteria = props.criteria.map((criterion, index) => (
    <div key={criterion}>
      <RatingCriterion name={criterion} score={criteriaData[index]} />
      {index < props.criteria.length - 1 && (
        <Divider style={{ marginTop: 3, marginBottom: 3, borderWidth: 1 }} />
      )}
    </div>
  ));

  return <Card className='rating-detail'>{criteria}</Card>;
}

export default RatingDetail;
