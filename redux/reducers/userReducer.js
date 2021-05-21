const defaultState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userJams: []
}; 

function setUserReducer(state = defaultState, action) {
    switch(action.type){
        case 'USER_INFO':
            return {
                ...state,
                ...action.payload
            }
        case 'USER_JAMS':
            return {
                ...state,
                userJams: action.payload
            }

        default:
            return state;
    }   
}
  
export { setUserReducer };
  