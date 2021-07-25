import "./MemberList.css";

import Member from "../Member/Member";

import { useSelector } from "react-redux";

function MemberList(props) {
  const users = useSelector((state) => state.users.allUsers);
  const currentGroupID = useSelector((state) => state.groups.currentGroupID);
  const currentGroupMembers = users.filter((user) => user.groups.includes(currentGroupID));  

  let memberList = currentGroupMembers.map((member) => (
    <Member key={member.user_id} user={member} group={member.group} history={props.history} />
  ));

  return (
    <div>
      <ul>{memberList}</ul>
    </div>
  );
}

export default MemberList;
