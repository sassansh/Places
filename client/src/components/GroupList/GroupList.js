import "./GroupList.css";

import CurrentGroupIDContext from "../../context/CurrentGroupIDContext";
import Group from "../Group/Group";
import GroupsContext from "../../context/GroupsContext";
import { Link } from "wouter";
import { useContext } from "react";

function GroupList() {
  const [groups] = useContext(GroupsContext);
  const [currentGroupID, setCurrentGroupID] = useContext(CurrentGroupIDContext);

  let groupsData = groups;
  let grouplist = groupsData.map((groupData) => (
    <Link
      to="/"
      onClick={() => {
        setCurrentGroupID(groupData.group_id);
      }}
      key={groupData.group_id}
    >
      <Group group={groupData} key={groupData.group_id} />
    </Link>
  ));

  return (
    <div>
      <ul>{grouplist}</ul>
    </div>
  );
}

export default GroupList;
