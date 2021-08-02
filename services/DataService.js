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
const addNewRoom = (jamId, roomInfo) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('rooms')
    .add(roomInfo)
    .then(console.log('room succesfully added to jam: '))
    .catch((error) => {
      const errorCode = error.code;
      console.log('Room could not be created: ', errorCode);
    });
});
const addJamToUser = (jamId, userId) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('users')
    .doc(userId)
    .collection('userJams')
    .doc(jamId)
    .set({ jamId })
    .then((res) => { console.log('jam added to user OK', res); })
    .catch((error) => {
      console.error('Error creating adding Jam to user: ', error);
    });
});
const addJammerToJam = (jamId, userId) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('jammers')
    .doc(userId)
    .set({ userId })
    .then((result) => {
      console.log('Jammers added to Jam', result);
      resolve(result);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log('ERROR Jam NOT added to user: ', errorCode);
    });
});
const createJam = (data, userId) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .add(data)
    .then((doc) => {
      const jamId = doc.id;
      if (data.jamType === 'rooms-rental') {
        const rooms = Number(data.nrOfRooms);
        for (let i = 0; i < rooms; i++) {
          const roomNr = i + 1;
          const roomInfo = {
            balcony: '',
            deposit: '',
            exterior: '',
            rent: '',
            privBath: '',
            roomNr,
            sqm: '',
            expenses: '',
          };
          addNewRoom(jamId, roomInfo);
        }
      }
      addJamToUser(jamId, userId);
      addJammerToJam(jamId, userId);
      resolve({ id: doc.id });
    })
    .catch((error) => {
      console.error('Error creating Jam: ', error);
    });
});

const getUserJamsDB = (userId, field, comparation, userJams) => new Promise(() => {
  firebase.firestore()
    .collection('jams')
    .where(field, comparation, userId)
    .orderBy('createdAt')
    .onSnapshot((result) => {
      const jams = [];
      result.forEach((doc) => {
        const j = doc.data();
        j.jamId = doc.id;
        jams.push(j);
      });
      userJams(jams);
    });
});
const getUserJams = async (userId, adminJams, userJams) => {
  const JamsAdmin = getUserJamsDB(userId, 'adminId', '==', adminJams);
  const JamsUsers = getUserJamsDB(userId, 'jammers', 'array-contains', userJams);
  return Promise.all([JamsAdmin, JamsUsers]);
};

const getJamInfoById = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams')
    .doc(jamId)
    .get()
    .then((result) => {
      const jamInfo = result.data();
      jamInfo.jamId = jamId;
      resolve(jamInfo);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar la JamInfo: ', errorCode, errorMessage);
    });
});

// < - - - - - INVITATIONS - - - - - > //
const saveInvitation = (jamId, data) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('invitations')
    .add(data)
    .then((docRef) => {
      const invitationId = docRef.id;
      console.log('Document written with ID: ', invitationId);
      resolve(invitationId);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log('Invitation could not be saved: ', errorCode);
    });
});

// < - - - - - JOIN REQUESTS  - - - - - > //
const saveJoinRequest = (jamId, jammer) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('joinRequests')
    .add(jammer)
    .then((doc) => {
      console.log('doc del create: ', doc);
    })
    .catch((error) => {
      console.error('Error creating Jam: ', error);
    });
});

// < - - - - - BOARD - - - - - > //
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

// < - - - - - JAMMERS - - - - - > //
const getJammers = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams')
    .doc(jamId)
    .collection('jammers')
    .get()
    .then((result) => {
      const jammers = [];
      result.docs.forEach((d) => {
        const j = d.data();
        j.userId = d.id;
        jammers.push(j);
      });
      resolve(jammers);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar los Jammers: ', errorCode, errorMessage);
    });
});

// < - - - - - ROOMS - - - - - > //

const getJamRooms = (jamId) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('jams')
    .doc(jamId)
    .collection('rooms')
    .get()
    .then((result) => {
      const rooms = [];
      result.docs.forEach((d) => {
        const j = d.data();
        j.roomId = d.id;
        rooms.push(j);
      });
      resolve(rooms);
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error al cargar las Rooms: ', errorCode, errorMessage);
    });
});

const getSingleRoomInfo = (jamId, roomId) => new Promise((resolve, reject) => {
  firebase.firestore().collection('jams')
    .doc(jamId)
    .collection('rooms')
    .doc(roomId)
    .get()
    .then((res) => {
      resolve(res.data());
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});


const DataService = {
  addJammerToJam,
  addJamToUser,
  checkIfEmialExists,
  createJam,
  getBoardInfo,
  getJamInfoById,
  getJammers,
  getJamRooms,
  getSettingsInfo,
  getSingleRoomInfo,
  getUserInfo,
  getUserJams,
  saveBoardMessage,
  saveInvitation,
  saveJoinRequest,
  saveUserInfoInFirestore,
  updateCompanyInfo,
};

export default DataService;
