import "./GroupList.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Group from "../Group/Group";
import { Link } from "react-router-dom";
import { getGroups, setCurrentGroup } from "../../redux/actions/groupActions";
import { getReviews } from "../../redux/actions/reviewActions";
import { getPlaces } from "../../redux/actions/placeActions";
import { getUsers } from "../../redux/actions/userActions";

function GroupList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getUsers());
    dispatch(getGroups());
    dispatch(getPlaces());
  }, [dispatch]);

  const groups = useSelector((state) => state.groups.allGroups);
  let groupsData = groups;
  let grouplist = groupsData.map((groupData) => (
    <Link
      to="/groupview"
      onClick={() => {
        dispatch(setCurrentGroup(groupData.group_id));
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
