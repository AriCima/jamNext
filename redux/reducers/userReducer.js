const defaultState = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  userJams: [],
  company: [],
  userRole: '',
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
    case 'USER_ROLE':
      return {
        ...state,
        userRole: action.payload,
      };

    default:
      return state;
  }
}

export { setUserReducer };
