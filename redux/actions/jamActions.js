function setJamInfo(jamInfo) {
  return {
    type: 'JAM_INFO',
    payload: jamInfo,
  };
}

function setTenantsList(jammers) {
  return {
    type: 'TENANTS_LIST',
    payload: jammers,
  };
}

function setActiveSection(section) {
  return {
    type: 'ACTIVE_SECTION',
    payload: section,
  };
}

function setRoomsInfo(rooms) {
  return {
    type: 'ROOMS_INFO',
    payload: rooms,
  };
}

export { setJamInfo, setActiveSection, setTenantsList, setRoomsInfo };
