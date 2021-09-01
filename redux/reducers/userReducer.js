const defaultState = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  userJams: [],
  company: [],
  lenguage: 'en',
};

function setUserReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_INFO':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_USER_INFO':
      return {
        ...state,
        ...defaultState,
      };
    case 'USER_JAMS':
      return {
        ...state,
        userJams: action.payload,
      };
    case 'USER_LENGUAJE':
      return {
        ...state,
        lenguage: action.payload,
      };
    default:
      return state;
  }
}

export { setUserReducer };
