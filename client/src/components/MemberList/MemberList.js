import "./MemberList.css";

import { Col, Row } from "antd";
import Member from "../Member/Member";
import { getUsers } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function MemberList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users.allUsers);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const currentGroupMembers = users.filter((user) =>
    user.groups.includes(currentGroupID)
  );

  let memberList = currentGroupMembers.map((member) => (
    <Member
      key={member.user_id}
      user={member}
      group={member.group}
      history={props.history}
    />
  ));

  return (
    <Row>
      <Col span={24}>{memberList}</Col>
    </Row>
  );
}

export default MemberList;
