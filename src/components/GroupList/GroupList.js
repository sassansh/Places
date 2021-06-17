import "./GroupList.css";

import Group from "../Group/Group";

function GroupList(props) {
  let groupsData = props.groupsData;
  let groups = groupsData.map((groupData) => (
    <Group group={groupData} key={groupData.groupID} />
  ));

  return (
    <div>
      <ul>{groups}</ul>
    </div>
  );
}

export default GroupList;
