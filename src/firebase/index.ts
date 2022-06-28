//import firebase from 'firebase/auth/dist/'
import 'firebase/auth'
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

const app = initializeApp(
    {
        apiKey: "AIzaSyBPvvtIF30ZNveXGts1BO9R494b12D5U78",
        authDomain: "work-schedule-dev-843c3.firebaseapp.com",
        projectId: "work-schedule-dev-843c3",
        storageBucket: "work-schedule-dev-843c3.appspot.com",
        messagingSenderId: "627355497267",
        appId: "1:627355497267:web:527701972c721fc9820446"
      }
);

export const auth = getAuth(app)
export default app