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
    console.log('userId: ', userId);
    return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    resolve(doc.data())
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

})};


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

const updateCompanyInfo = (data) => {
    return new Promise(() => {
        firebase.firestore()
        .collection('companies')
        .add({
            address: data.address,
            country: data.country,
            mobile: data.mobile,
            name: data.name,
            nif: data.nif,
            phone: data.phone,
            zipCode: data.zipCode,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    })
}

const DataService = {
    checkIfEmialExists,
    getJamInfoById,
    getUserInfo,
    saveUserInfoInFirestore,
    updateCompanyInfo,
}

export default DataService;