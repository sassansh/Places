import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Group from '../Group/Group';
import { getGroups } from '../../redux/actions/groupActions';
import { getPlaces } from '../../redux/actions/placeActions';
import { getReviews } from '../../redux/actions/reviewActions';
import { getUsers } from '../../redux/actions/userActions';
import { useEffect } from 'react';

function GroupList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getUsers());
    dispatch(getGroups());
    dispatch(getPlaces());
  }, [dispatch]);

  const groups = useSelector((state) => state.groups.allGroups);
  const groupsData = groups;
  const grouplist = groupsData.map((groupData) => (
    <Group group={groupData} key={groupData.group_id} />
  ));

  return (
    <Row>
      <Col span={24}>{grouplist}</Col>
    </Row>
  );
}

export default GroupList;
