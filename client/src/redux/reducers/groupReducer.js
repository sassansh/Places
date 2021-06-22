const initialGroups = [
  {
    group_id: 1,
    name: "UBC Real Eaters",
    description: "Groups of students at UBC that like to eat",
    avatarURL:
      "https://live.staticflickr.com/8027/29016431894_2f218cea36_b.jpg",
  },
  {
    group_id: 2,
    name: "Brews Sisters",
    description: "The Real Lives of Alewives",
    avatarURL:
      "https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2015/08/beerAllergy-1165339040-770x553-1-745x490.jpg",
  },
  {
    group_id: 3,
    name: "Nature Fam",
    description: "go play outside!!!",
    avatarURL:
      "https://t3.ftcdn.net/jpg/01/70/15/08/240_F_170150827_KWCkNDhPVSmCq48BoxuVwvuANWv5JSjT.jpg",
  },
  {
    group_id: 4,
    name: "La Cuisine du Père Noël",
    description: "Food snob hub for the UBC Fronch Club",
    avatarURL:
      "https://i0.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2016/09/iStock-119483507.jpg?resize=1024%2C683&ssl=1",
  },
  {
    group_id: 5,
    name: "Park-er Posse",
    description: "picnic basket optional",
    avatarURL:
      "https://hookedonhouses.net/wp-content/uploads/2015/09/Full-House-credits-in-front-of-Alamo-Square-Victorians.jpg",
  },
];

const groupReducer = (groups = initialGroups, action) => {
    switch (action.type) {
      case "CREATE_GROUP":
        const newGroups = [...groups]
        newGroups.push(action.payload)
        return newGroups
        ;
      default:
        return groups;
    }
  };

export default groupReducer;