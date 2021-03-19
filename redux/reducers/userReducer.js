const defaultState = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
}; 

function setUserReducer(state = defaultState, action) {
    return {
        ...state,
        type: action.payload
    }
}
  
export { setUserReducer };
  