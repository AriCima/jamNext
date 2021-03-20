// src: https://medium.com/@lemmusm/nextjs-con-firebase-790adfe988b2;

import firebase from '@firebase/app';
import '@firebase/firestore';


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASSURE_ID
};
const fb = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()




export default fb;



// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyDGELyX74RjvtVTk_YOlK7lzCrYRIyBbVw",
//     authDomain: "jamnext-14cda.firebaseapp.com",
//     projectId: "jamnext-14cda",
//     storageBucket: "jamnext-14cda.appspot.com",
//     messagingSenderId: "955232690820",
//     appId: "1:955232690820:web:f9802a31e503e864d518d1",
//     measurementId: "G-FYMTEJV4NJ"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>