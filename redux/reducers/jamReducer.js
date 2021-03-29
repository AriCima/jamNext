const defaultState = {
    createdAt: '',
    jamCode: '',
    jamDesc: '',
    jamDetails: {},
    jamId: '',
    jamName: '',
}; 

function setJamReducer(state = defaultState, action) {
    return {
        ...state,
        type: action.payload
    }
}
  
export { setJamReducer };
  