import './RequestList.css';

import { Card, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Request from '../Request/Request';
import { getGroups } from '../../redux/actions/groupActions';
import { getUsers } from '../../redux/actions/userActions';
import { useEffect } from 'react';

function RequestList () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getGroups());
  }, [dispatch]);

  const users = useSelector((state) => state.users.allUsers);
  const groups = useSelector((state) => state.groups.allGroups);
  const currentUserID = useSelector((state) => state.users.user.user_id);
  const currentUser = users.find((user) => user.user_id === currentUserID);

  let processedRequestData = [];
  groups.forEach((group) => {
    if (currentUser.groups.includes(group.group_id)) {
      users.forEach((user) => {
        user.requestGroups.forEach((requestGroup) => {
          if (group.group_id === requestGroup) {
            processedRequestData = processedRequestData.concat({
              user: user,
              group: group,
              key: user.user_id + group.group_id
            });
          }
        });
      });
    }
  });

  const requestList = processedRequestData.map((request) => (
    <Request user={request.user} group={request.group} key={request.key} />
  ));

  return (
    <div>
      {requestList.length >= 1
        ? (
          <ul>{requestList}</ul>
          )
        : (
          <Row justify='center'>
            <Col lg={10} md={12} sm={18} xs={24}>
              <Card className='noRequests' size='medium'>
                You do not have any requests.
              </Card>
            </Col>
          </Row>
          )}
    </div>
  );
}

export default RequestList;
