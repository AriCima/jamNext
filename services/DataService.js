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
};

const createJam = (data) => {
    console.log('data: ', data);
    return new Promise((resolve, reject) => {
        firebase.firestore().collection('jams').add(data)
        .then((doc) => {
            console.log('doc del create: ', doc);
            resolve({ id: doc.id });
        })
        .catch((error) => {
            console.error("Error creating Jam: ", error);
        });
    })
};

const addJamToUser = (userId, jamId, data) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection('users').doc(userId).
        collection(userJams)
        .doc(jamId)
        .add(data)
        .then((doc) => {
            console.log('doc del create: ', doc);
        })
        .catch((error) => {
            console.error("Error creating Jam: ", error);
        });
    })
};

const getUserJamsDB = (userId, field, comparation) => {
    return new Promise((resolve, reject) => {
        firebase.firestore()
            .collection('jams')
            .where(field, comparation, userId)
            .get()
            .then(result => {
                let jams = []
                result.forEach((doc) => {
                    const j = doc.data();
                    j.jamId = doc.id;
                    jams.push(j);
                });
                resolve(jams);
        })})
}
const getUserJams = async (userId) => {
    const JamsAdmin = getUserJamsDB(userId, 'adminId', '==')
    const JamsUsers = getUserJamsDB(userId, 'jamUsers', 'array-contains')
    return await Promise.all([JamsAdmin, JamsUsers]).then(([resultJamsAdmin, resultJamsUsers]) => {
        const jams = [...resultJamsAdmin, ...resultJamsUsers]
        return jams
    })
}

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
    addJamToUser,
    checkIfEmialExists,
    createJam,
    getJamInfoById,
    getUserInfo,
    getUserJams,
    saveUserInfoInFirestore,
    updateCompanyInfo,
};

export default DataService;