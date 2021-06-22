export const createGroup = newGroup => {
    return {
       type: 'CREATE_GROUP',
       payload: newGroup
}; };

export const setGroup = groupID => {
    return {
       type: 'SET_GROUP',
       payload: groupID
}; };