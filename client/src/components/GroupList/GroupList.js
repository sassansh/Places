import "./GroupList.css";

import Group from "../Group/Group";
import GroupsContext from "../../context/GroupsContext";
import { useContext } from "react";

function GroupList() {
  const [groups] = useContext(GroupsContext);
  let groupsData = groups;
  let grouplist = groupsData.map((groupData) => (
    <Group group={groupData} key={groupData.group_id} />
  ));

  return (
    <div>
      <ul>{grouplist}</ul>
    </div>
  );
}

export default GroupList;
