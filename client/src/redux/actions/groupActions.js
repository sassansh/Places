import axios from "axios";

export const getGroups = () => async (dispatch) => {
  try {
    const groupsResponse = await axios.get("/api/groups");
    const groups = groupsResponse.data;
    dispatch(setGroups(groups));
  } catch (err) {
    console.log(err);
  }
};

export const createGroup = (newGroup, history) => async (dispatch) => {
  try {
    const newGroupResponse = await axios.post("/api/groups", newGroup);
    const groups = newGroupResponse.data;
    dispatch(setGroups(groups));
    dispatch(setCurrentGroup(groups[groups.length - 1].group_id));
    history.push("/groupview");
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentGroup = (groupID) => {
  return {
    type: "SET_CURRENT_GROUP",
    payload: groupID,
  };
};

export const setGroups = (groups) => {
  return {
    type: "SET_GROUPS",
    payload: groups,
  };
};
