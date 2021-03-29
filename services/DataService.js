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


const getUserInfo = (userId) => {
    return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('users')
            .doc(userId)
            .get()
            .then((result) => {
                console.log('result: ', result);
                resolve(result.data()); // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Usuario no existe');
            });
    });
};


const getJamInfoById = (jamId) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection('jams')
            .doc(jamId)
            .get()
            .then((result) => {
                resolve(result.data());
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
            });
    });
};

const DataService = {
    checkIfEmialExists,
    getJamInfoById,
    getUserInfo,
    saveUserInfoInFirestore,
}

export default DataService;