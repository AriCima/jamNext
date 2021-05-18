const defaultState = {
    createdAt: '',
    jamCode: '',
    jamDesc: '',
    jamDetails: {},
    jamId: '',
    jamName: '',
}; 

function setJamReducer(state = defaultState, action) {
    switch(action.type){
        case 'JAM_DESC':
            return {
                ...state,
                jamDesc: action.payload
            }
        default:
            return state;
    }
}
  
export { setJamReducer };
  