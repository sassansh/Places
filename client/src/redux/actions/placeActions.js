export const addPlace = newPlace => {
    return {
       type: 'ADD_PLACE',
       payload: newPlace
}; };

export const setPlace = placeID => {
    return {
       type: 'SET_PLACE',
       payload: placeID
}; };