function setUserInfo(userInfo) {
  return {
    type: 'USER_INFO',
    payload: userInfo,
  };
}

function resetUserInfo() {
  return {
    type: 'RESET_USER_INFO',
  };
}

function setUserJams(jamsList) {
  return {
    type: 'USER_JAMS',
    payload: jamsList,
  };
}

function setUserRole(userRole) {
  return {
    type: 'USER_ROLE',
    payload: userRole,
  };
}

export {
  setUserInfo, setUserJams, resetUserInfo, setUserRole,
};
