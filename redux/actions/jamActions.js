function setJamInfo(jamInfo) {
  return {
    type: 'JAM_INFO',
    payload: jamInfo,
  };
}

function setEditedJammers(jammers) {
  return {
    type: 'EDITED_JAMMERS',
    payload: jammers,
  };
}

function setActiveSection(section) {
  return {
    type: 'ACTIVE_SECTION',
    payload: section,
  };
}

export { setJamInfo, setActiveSection, setEditedJammers };
