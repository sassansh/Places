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

export const createGroup = (newGroup) => {
  return {
    type: "CREATE_GROUP",
    payload: newGroup,
  };
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
