function setUserInfo(userInfo) {
    return {
        type: 'USER_INFO',
        payload: userInfo
    };
}

function setUserJams(jamsList) {
    return {
        type: 'USER_JAMS',
        payload: jamsList
    };
}


export { setUserInfo, setUserJams };
