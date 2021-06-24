export const addReview =  newReview => {
    return {
       type: 'ADD_REVIEW',
       payload: newReview
    }; 
};

export const editReview =  (newReview, index) => {
    return {
       type: 'EDIT_REVIEW',
       payload: { newReview: newReview, index: index},
    }; 
};