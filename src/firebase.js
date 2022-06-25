import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyC3_BorGS7a_6exAMNP_75iPaWobYSAE98",
    authDomain: "to-do-app-project-tut.firebaseapp.com",
    databaseURL: "https://to-do-app-project-tut-default-rtdb.firebaseio.com",
    projectId: "to-do-app-project-tut",
    storageBucket: "to-do-app-project-tut.appspot.com",
    messagingSenderId: "538753591499",
    appId: "1:538753591499:web:6322c995cdb0bf58cbd34e",
    measurementId: "G-P6K5KD5T0J"
});

export { firebaseConfig as firebase }