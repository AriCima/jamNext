const defaultState = {
    createdAt: '',
    jamCode: '',
    jamDesc: '',
    jamDetails: {},
    jamId: '',
    jamName: '',
    activeSection: 'overview',
}; 

function setJamReducer(state = defaultState, action) {
    switch(action.type){
        case 'JAM_INFO':
            return {
                ...state,
                ...action.payload
            }
        case 'ACTIVE_SECTION':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }   
};
  
export { setJamReducer };
  