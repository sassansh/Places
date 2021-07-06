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

export const createGroup = (newGroup) => async (dispatch) => {
  try {
    await axios.post("/api/groups", newGroup);
    dispatch(setCurrentGroup(newGroup.group_id));
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
