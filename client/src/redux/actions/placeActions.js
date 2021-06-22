export const addPlace = addPlace => {
    return {
       type: 'ADD_PLACE',
       payload: addPlace
}; };

export const setPlace = placeID => {
    return {
       type: 'SET_PLACE',
       payload: placeID
}; };