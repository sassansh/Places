export const createUser =  newUser => {
    return {
       type: 'CREATE_USER',
       payload: newUser
}; };

export const setUser = userID => {
    return {
       type: 'SET_USER',
       payload: userID
}; };