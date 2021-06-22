import "./GroupList.css";

import CurrentGroupIDContext from "../../context/CurrentGroupIDContext";
import Group from "../Group/Group";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from 'react-redux';

function GroupList() {
  const groups = useSelector(state => state.groups);

  const [, setCurrentGroupID] = useContext(CurrentGroupIDContext);

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
