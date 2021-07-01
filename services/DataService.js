import firebase from '../firebase.config';
import Board from '../pages/jam/[jamId]/board';

const saveUserInfoInFirestore = (userId, userInfo) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('users')
    .doc(userId)
    .set({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    })
    .then(
      console.log('User information succesfully saved !'),
    )
    .catch((error) => {
      const errorCode = error.code;
      console.log('User NOT added: ', errorCode);
    });
});

const checkIfEmialExists = (email) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then((res) => {
      const docExists = !res.empty;
      resolve(docExists);
    });
})
  .catch((error) => {
    const errorCode = error.code;
    // console.log('Usuario No Existe : ', errorCode);
  });

const getUserInfo = (userId) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        resolve(doc.data());
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
});

const updateCompanyInfo = (data) => new Promise(() => {
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
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
});

const createJam = (data) => {
  console.log('data: ', data);
  return new Promise((resolve, reject) => {
    firebase.firestore().collection('jams').add(data)
      .then((doc) => {
        console.log('doc del create: ', doc);
        resolve({ id: doc.id });
      })
      .catch((error) => {
        console.error('Error creating Jam: ', error);
      });
  });
};

const addJamToUser = (userId, jamId, data) => new Promise((resolve, reject) => {
  firebase.firestore().collection('users').doc(userId)
    .collection(userJams)
    .doc(jamId)
    .add(data)
    .then((doc) => {
      console.log('doc del create: ', doc);
    })
    .catch((error) => {
      console.error('Error creating Jam: ', error);
    });
});

const getUserJamsDB = (userId, field, comparation) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .where(field, comparation, userId)
    .get()
    .then((result) => {
      const jams = [];
      result.forEach((doc) => {
        const j = doc.data();
        j.jamId = doc.id;
        jams.push(j);
      });
      resolve(jams);
    });
});
const getUserJams = async (userId) => {
  const JamsAdmin = getUserJamsDB(userId, 'adminId', '==');
  const JamsUsers = getUserJamsDB(userId, 'jamUsers', 'array-contains');
  return await Promise.all([JamsAdmin, JamsUsers]).then(([resultJamsAdmin, resultJamsUsers]) => {
    const jams = [...resultJamsAdmin, ...resultJamsUsers];
    return jams;
  });
};

const getJamInfoById = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams')
    .doc(jamId)
    .get()
    .then((result) => {
      const jamInfo = result.data();
      const jamId = result.id;
      jamInfo.jamId = jamId;
      resolve(jamInfo);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
    });
});

const getBoardInfo = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams').doc(jamId).collection('board')
    .get()
    .then((querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const board = doc.data();
        board.id = doc.id;
        res.push(board);
      });
      resolve(res);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
    });
});

const getSettingsInfo = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams').doc(jamId).collection('settings')
    .get()
    .then((querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const board = doc.data();
        board.id = doc.id;
        res.push(board);
      });
      resolve(res);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
    });
});

const saveBoardMessage = (jamId, messageInfo) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('board')
    .add(messageInfo)
    .then(
      console.log('Message saved correctly'),
    )

    .catch((error) => {
      const errorCode = error.code;
      console.log('Message could not be sent: ', errorCode);
    });
});

const DataService = {
  addJamToUser,
  checkIfEmialExists,
  createJam,
  getBoardInfo,
  getJamInfoById,
  getSettingsInfo,
  getUserInfo,
  getUserJams,
  saveBoardMessage,
  saveUserInfoInFirestore,
  updateCompanyInfo,
};

export default DataService;
