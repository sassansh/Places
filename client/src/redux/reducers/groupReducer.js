const initialGroups = [];

const groupReducer = (groups = initialGroups, action) => {
    switch (action.type) {
      case "ADD_GROUP":
        return {
          ...groups
        };
      default:
        return groups;
    }
  };

export default groupReducer;