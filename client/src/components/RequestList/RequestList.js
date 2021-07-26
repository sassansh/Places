import './RequestList.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Request from '../Request/Request';
import { getUsers } from '../../redux/actions/userActions';
import { getGroups } from '../../redux/actions/groupActions';

function RequestList() {
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
            processedRequestData = processedRequestData.concat(
              {
                user: user,
                group: group,
                key: user.user_id + group.group_id
              }
            );
          }
        });
      });
    }
  });

  let requestList = processedRequestData.map((request) => (
    <Request user={request.user} group={request.group} key={request.key}/>
  ));

  return (
    <div>
      <ul>{requestList}</ul>
    </div>
  );
}

export default RequestList;
