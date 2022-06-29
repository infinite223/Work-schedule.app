import 'firebase/auth'
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

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
export const db = getFirestore(app);