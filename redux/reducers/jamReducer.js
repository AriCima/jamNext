const defaultState = {
  createdAt: '',
  jamCode: '',
  jamDesc: '',
  jamDetails: {},
  jamId: '',
  jamName: '',
  activeSection: 'overview',
  editedJammers: {},
};

function setJamReducer(state = defaultState, action) {
  switch (action.type) {
    case 'JAM_INFO':
      return {
        ...state,
        ...action.payload,
      };
    case 'ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.payload,
      };
    case 'EDITED_JAMMERS':
      return {
        ...state,
        editedJammers: action.payload,
      };
    default:
      return state;
  }
}

export { setJamReducer };
