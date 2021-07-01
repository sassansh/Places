import "./GroupList.css";

import { useDispatch, useSelector } from "react-redux";

import Group from "../Group/Group";
import { Link } from "react-router-dom";
import { setGroup } from "../../redux/actions/groupActions";

function GroupList() {
  const groups = useSelector((state) => state.groups.allGroups);
  const dispatch = useDispatch();

  let groupsData = groups;
  let grouplist = groupsData.map((groupData) => (
    <Link
      to="/groupview"
      onClick={() => {
        dispatch(setGroup(groupData.group_id));
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
