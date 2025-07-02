import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAUhaBcAmrygAa_rVJ8Uvc8x3ZNEHzLJ6w",
    authDomain: "tarefa4-683e6.firebaseapp.com",
    projectId: "tarefa4-683e6",
    storageBucket: "tarefa4-683e6.firebasestorage.app",
    messagingSenderId: "382780052628",
    appId: "1:382780052628:web:56b5200ec909b0dbea1081"
  };

 
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore()
export const auth = firebase.auth()