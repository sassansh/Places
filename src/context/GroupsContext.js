import { createContext } from "react";

const GroupsContext = createContext({
  groups: [
    {
      group_id: 1,
      name: "Optimistic Yankees",
      description: "Only yankees allowed.",
      avatarURL: "https://bit.ly/3cL15Ia",
    },
    {
      group_id: 2,
      name: "Brave Flyers",
      description: "Dow't join unless you're brave!",
      avatarURL: "https://bit.ly/3gvB4yU",
    },
  ],
  setGroups: () => {},
});

export default GroupsContext;
