function setJamInfo(jamInfo) {
    return {
        type: 'JAM_INFO',
        payload: jamInfo
    };
}

function setActiveSection(section) {
    return {
        type: 'ACTIVE_SECTION',
        payload: section
    };
}

export { setJamInfo, setActiveSection };
