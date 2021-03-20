import firebase from '../firebase.config';

const saveUserInfoInFirestore = (userId, userInfo) => {
    return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('users')
            .doc(userId)
            .set({ 
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email
            })
            .then(
                console.log("User information succesfully saved !")
            )
            .catch((error) => {
                const errorCode = error.code;
                console.log('User NOT added: ', errorCode);
            });
    });
};

const checkIfEmialExists = (email) => {
    return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then((res) => {
                const docExists = !res.empty;
                resolve(docExists)
            })
    })
        .catch((error) => {
            const errorCode = error.code;
            // console.log('Usuario No Existe : ', errorCode);
        });
};

const DataService = {
    saveUserInfoInFirestore,
    checkIfEmialExists
}

export default DataService;