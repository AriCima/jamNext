const defaultState = {
  createdAt: '',
  jamCode: '',
  jamDesc: '',
  jamDetails: {},
  jamId: '',
  jamName: '',
  activeSection: 'overview',
  tenantsList: {},
  roomsInfo: [],
  adminId: '',
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
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
    case 'TENANTS_LIST':
      return {
        ...state,
        tenantsList: action.payload,
      };
    case 'ROOMS_INFO':
      return {
        ...state,
        roomsInfo: action.payload,
      };
    default:
      return state;
  }
}

export { setJamReducer };
