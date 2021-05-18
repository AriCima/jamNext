const defaultState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
}; 

function setUserReducer(state = defaultState, action) {
    switch(action.type){
        case 'USER_INFO':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }   
}
  
export { setUserReducer };
  