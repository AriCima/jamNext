// src: https://medium.com/@lemmusm/nextjs-con-firebase-790adfe988b2;

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';  

const config = {
    apiKey: "AIzaSyDGELyX74RjvtVTk_YOlK7lzCrYRIyBbVw",
    authDomain: "jamnext-14cda.firebaseapp.com",
    projectId: "jamnext-14cda",
    storageBucket: "jamnext-14cda.appspot.com",
    messagingSenderId: "955232690820",
    appId: "1:955232690820:web:f9802a31e503e864d518d1",
    measurementId: "G-FYMTEJV4NJ"
};
try {
    firebase.initializeApp(config);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }

export default firebase;