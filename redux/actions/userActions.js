function setUserInfo(userInfo) {
    return {
        type: 'USER_INFO',
        payload: userInfo
    };
}

export { setUserInfo };
