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

function setUserLenguage(userLenguage) {
  return {
    type: 'USER_LENGUAJE',
    payload: userLenguage,
  };
}

export {
  setUserInfo, setUserJams, resetUserInfo, setUserLenguage
};
